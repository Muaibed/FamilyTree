"use client";

import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import Fuse from "fuse.js";
import { TreeNode } from "@/types/tree";
import { TreeLayoutProps } from "./TreeViewShell";

const COLORS = d3.schemeTableau10;
const color = (depth: number) => COLORS[depth % COLORS.length];

export default function Sunburst({
  treeData,
  onNodeClick,
  rootDescendantsRef,
  fuseRef,
  onFocusNodeReady,
}: TreeLayoutProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  // Exposed so the search focusNode callback can also trigger a zoom-in
  const zoomToRef = useRef<
    ((node: d3.HierarchyRectangularNode<TreeNode>) => void) | null
  >(null);

  const W = 2000;
  const H = 2000;
  const radius = Math.min(W, H) / 2;

  const focusNode = useCallback(
    (query: string, exactId?: string) => {
      if (!query.trim() || !svgRef.current || !zoomRef.current) return;
      const q = query.toLowerCase();
      const match = rootDescendantsRef.current.find((d) =>
        exactId
          ? d.data.attributes?.id === exactId
          : d.data.name.toLowerCase().includes(q) ||
            (d.data.attributes?.fullName ?? "").toLowerCase().includes(q)
      );
      if (!match) return;

      const matchId = match.data.attributes?.id ?? match.data.name;

      // Highlight matched arc, dim others
      d3.select(svgRef.current)
        .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(
          ".sun-arc"
        )
        .attr("fill", (d) =>
          (d.data.attributes?.id ?? d.data.name) === matchId
            ? "#f59e0b"
            : color(d.depth)
        )
        .attr("opacity", (d) =>
          (d.data.attributes?.id ?? d.data.name) === matchId ? 1 : 0.35
        );

      setTimeout(() => {
        if (!svgRef.current) return;
        d3.select(svgRef.current)
          .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(
            ".sun-arc"
          )
          .transition()
          .duration(600)
          .attr("fill", (d) => color(d.depth))
          .attr("opacity", 1);
      }, 3000);

      // Zoom-in to show the matched node in context (zoom to its parent so siblings are visible)
      const m = match as unknown as d3.HierarchyRectangularNode<TreeNode>;
      zoomToRef.current?.(m.parent ?? m);
    },
    [rootDescendantsRef]
  );

  useEffect(() => {
    onFocusNodeReady(focusNode);
  }, [focusNode, onFocusNodeReady]);

  useEffect(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current).selectAll("*").remove();

    const formattedData = treeData ?? undefined;
    const holder: TreeNode = { name: "", children: [] };

    const root = d3
      .hierarchy<TreeNode>(formattedData ?? holder)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name))
      .sum(() => 1);

    const partitioned = d3
      .partition<TreeNode>()
      .size([2 * Math.PI, radius])(root);

    rootDescendantsRef.current = partitioned.descendants();

    const normalizeAlef = (s: string) => s.replace(/[أإآ]/g, "ا");
    fuseRef.current = new Fuse(partitioned.descendants(), {
      keys: [
        { name: "data.name", weight: 0.5 },
        { name: "data.attributes.fullName", weight: 0.35 },
        { name: "data.attributes.kunya", weight: 0.1 },
        { name: "data.attributes.familyName", weight: 0.05 },
      ],
      threshold: 0.35,
      minMatchCharLength: 2,
      ignoreLocation: true,
      getFn: (obj, path) => {
        const val = Fuse.config.getFn(obj, path);
        if (typeof val === "string") return normalizeAlef(val);
        if (Array.isArray(val))
          return val.map((v) => (typeof v === "string" ? normalizeAlef(v) : v));
        return val;
      },
    });

    // ── Scales used by the click-to-zoom interaction ───────────────────────
    // xScale: maps an angular range [x0, x1] → [0, 2π] (the full circle)
    // yScale: maps a radial range [y0, radius] → [innerEdge, radius]
    const xScale = d3.scaleLinear().range([0, 2 * Math.PI]).clamp(true);
    const yScale = d3.scaleLinear().range([0, radius]);

    // Start at full view
    xScale.domain([0, 2 * Math.PI]);
    yScale.domain([0, radius]);

    const arcGen = d3
      .arc<d3.HierarchyRectangularNode<TreeNode>>()
      .startAngle((d) => xScale(d.x0))
      .endAngle((d) => xScale(d.x1))
      .innerRadius((d) => Math.max(0, yScale(d.y0)))
      .outerRadius((d) => Math.max(0, yScale(d.y1) - 1))
      .padAngle((d) =>
        Math.min((xScale(d.x1) - xScale(d.x0)) / 2, 0.004)
      )
      .cornerRadius(2);

    const labelTransform = (d: d3.HierarchyRectangularNode<TreeNode>) => {
      const midAngle = (xScale(d.x0) + xScale(d.x1)) / 2;
      const midRadius = (yScale(d.y0) + yScale(d.y1)) / 2;
      const deg = (midAngle * 180) / Math.PI;
      return `rotate(${deg - 90}) translate(${midRadius},0) rotate(${
        deg < 180 ? 0 : 180
      })`;
    };

    // A label is visible when its arc spans more than 0.12 radians in the current view
    const labelVisible = (d: d3.HierarchyRectangularNode<TreeNode>) =>
      xScale(d.x1) - xScale(d.x0) > 0.12;

    // ── SVG ────────────────────────────────────────────────────────────────
    const svg = d3
      .select(svgRef.current)
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", [-W / 2, -H / 2, W, H])
      .attr("style", "width: 100%; height: 100vh;");

    const container = svg.append("g");
    const svgSel = d3.select(svgRef.current);

    // ── Click-to-zoom function ─────────────────────────────────────────────
    function zoomTo(p: d3.HierarchyRectangularNode<TreeNode>) {
      xScale.domain([p.x0, p.x1]);
      // When zoomed in (depth > 0), leave a small inner gap so the center
      // "back" button remains visible; at root (depth 0) start from 0.
      yScale.domain([p.y0, radius]).range([p.depth ? 40 : 0, radius]);

      // Fade out → redraw → fade in to make the transition feel smooth
      // without the complexity of attrTween path morphing.
      svgSel
        .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(
          ".sun-arc"
        )
        .transition()
        .duration(200)
        .attr("opacity", 0)
        .on("end", function () {
          svgSel
            .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(
              ".sun-arc"
            )
            .attr("d", arcGen)
            .transition()
            .duration(400)
            .attr("opacity", 1);
        });

      svgSel
        .selectAll<SVGTextElement, d3.HierarchyRectangularNode<TreeNode>>(
          ".sun-label"
        )
        .transition()
        .duration(200)
        .attr("opacity", 0)
        .on("end", function () {
          svgSel
            .selectAll<
              SVGTextElement,
              d3.HierarchyRectangularNode<TreeNode>
            >(".sun-label")
            .attr("transform", labelTransform)
            .transition()
            .duration(400)
            .attr("opacity", (d) => (labelVisible(d) ? 1 : 0));
        });

      // Update the center circle tooltip
      svgSel
        .select<SVGTextElement>(".sun-center-label")
        .text(p.depth === 0 ? "" : p.data.name);
    }

    zoomToRef.current = zoomTo;

    // ── Arcs ──────────────────────────────────────────────────────────────
    container
      .append("g")
      .selectAll("path")
      .data(partitioned.descendants().filter((d) => d.depth > 0))
      .join("path")
      .attr("class", "sun-arc")
      .attr("fill", (d) => color(d.depth))
      .attr("d", arcGen)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        zoomTo(d);
        onNodeClick(event, d);
      });

    // ── Labels ─────────────────────────────────────────────────────────────
    container
      .append("g")
      .attr("pointer-events", "none")
      .selectAll("text")
      .data(partitioned.descendants().filter((d) => d.depth > 0))
      .join("text")
      .attr("class", "sun-label")
      .attr("transform", labelTransform)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("user-select", "none")
      .style("font-size", "11px")
      .attr("fill", "white")
      .attr("paint-order", "stroke")
      .attr("stroke", "rgba(0,0,0,0.4)")
      .attr("stroke-width", 2)
      .attr("opacity", (d) => (labelVisible(d) ? 1 : 0))
      .text((d) => d.data.name);

    // ── Center circle — click resets to full view ──────────────────────────
    const centerG = container.append("g").style("cursor", "pointer");

    centerG
      .append("circle")
      .attr("r", 38)
      .attr("fill", "#e2e8f0")
      .attr("opacity", 0.85);

    centerG
      .append("text")
      .attr("class", "sun-center-label")
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("fill", "#334155")
      .text("");

    centerG.on("click", () => zoomTo(partitioned));

    // ── D3 pan/zoom ────────────────────────────────────────────────────────
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;
  }, [treeData, onNodeClick, rootDescendantsRef, fuseRef]);

  return (
    <svg
      ref={svgRef}
      width={W}
      height={H}
      style={{ overflow: "visible" }}
      className="rd3t-svg"
    />
  );
}
