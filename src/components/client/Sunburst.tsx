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
  const W = 2000;
  const H = 2000;
  const radius = Math.min(W, H) / 2 - 10;

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
        .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(".sun-arc")
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
          .selectAll<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>>(".sun-arc")
          .transition()
          .duration(600)
          .attr("fill", (d) => color(d.depth))
          .attr("opacity", 1);
      }, 3000);

      // Pan to arc centroid (same formula as radial layouts)
      const m = match as unknown as d3.HierarchyRectangularNode<TreeNode>;
      const angle = (m.x0 + m.x1) / 2 - Math.PI / 2;
      const r = (m.y0 + m.y1) / 2;
      const svgX = r * Math.cos(angle);
      const svgY = r * Math.sin(angle);
      const k = 3;
      const transform = d3.zoomIdentity.translate(-k * svgX, -k * svgY).scale(k);
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call(zoomRef.current.transform, transform);
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

    const arcGen = d3
      .arc<d3.HierarchyRectangularNode<TreeNode>>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.004))
      .cornerRadius(2);

    const svg = d3
      .select(svgRef.current)
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", [-W / 2, -H / 2, W, H])
      .attr("style", "width: 100%; height: 100vh; font: 10px sans-serif;");

    const container = svg.append("g");

    // Draw arcs
    container
      .append("g")
      .selectAll("path")
      .data(partitioned.descendants().filter((d) => d.depth > 0))
      .join("path")
      .attr("class", "sun-arc")
      .attr("fill", (d) => color(d.depth))
      .attr("d", arcGen)
      .style("cursor", "pointer")
      .on("click", (event, d) => onNodeClick(event, d));

    // Labels — only on arcs wide enough to show text
    container
      .append("g")
      .attr("pointer-events", "none")
      .selectAll("text")
      .data(
        partitioned
          .descendants()
          .filter((d) => d.depth > 0 && (d.x1 - d.x0) > 0.05)
      )
      .join("text")
      .attr("transform", (d) => {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("user-select", "none")
      .style("font-size", (d) => `${Math.max(8, 20 - d.depth)}px`)
      .attr("fill", "white")
      .text((d) => d.data.name);

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
