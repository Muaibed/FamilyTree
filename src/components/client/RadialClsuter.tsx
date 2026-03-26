"use client";

import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import Fuse from "fuse.js";
import { TreeNode } from "@/types/tree";
import { TreeLayoutProps } from "./TreeViewShell";

function ancestorColor(
  node: d3.HierarchyNode<TreeNode>,
  colors: Record<string, { link: string; label: string }>,
  type: "link" | "label",
  defaultColor: string
): string {
  let n: d3.HierarchyNode<TreeNode> | null = node;
  while (n) {
    const id = n.data.attributes?.id;
    if (id && colors[id]) return colors[id][type];
    n = n.parent;
  }
  return defaultColor;
}

export default function RadialCluster({
  treeData,
  onNodeClick,
  rootDescendantsRef,
  fuseRef,
  onFocusNodeReady,
  onCenterReady,
  branchColors,
}: TreeLayoutProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const branchColorsRef = useRef(branchColors);
  const circleMapRef = useRef<Map<string, SVGCircleElement>>(new Map());
  branchColorsRef.current = branchColors;
  const width = 2000;
  const height = 2000;

  const focusNode = useCallback(
    (query: string, exactId?: string) => {
      if (!query.trim() || !svgRef.current || !zoomRef.current) return;

      const q = query.toLowerCase();
      const match = rootDescendantsRef.current.find((d) =>
        exactId
          ? d.data.attributes?.id === exactId
          : d.data.name.toLowerCase().includes(q) ||
            (d.data.attributes?.fullName ?? "").toLowerCase().includes(q)
      ) as d3.HierarchyPointNode<TreeNode> | undefined;
      if (!match) return;

      // Highlight only the matching circle directly — no selectAll scan
      const matchId = match.data.attributes?.id;
      if (matchId) {
        const circleEl = circleMapRef.current.get(matchId);
        if (circleEl) {
          d3.select(circleEl).attr("fill", "#f59e0b").attr("r", 7);
          setTimeout(() => {
            d3.select(circleEl)
              .transition()
              .duration(600)
              .attr("fill", match.children ? "#555" : "#999")
              .attr("r", 2.5);
          }, 3000);
        }
      }

      // Pan + zoom to node
      const svgX = match.y * Math.cos(match.x - Math.PI / 2);
      const svgY = match.y * Math.sin(match.x - Math.PI / 2);
      const k = 3;
      const transform = d3.zoomIdentity.translate(-k * svgX, -k * svgY).scale(k);
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call(zoomRef.current.transform, transform);
    },
    [rootDescendantsRef]
  );

  // Register the focus function so TreeViewShell can call it
  useEffect(() => {
    onFocusNodeReady(focusNode);
  }, [focusNode, onFocusNodeReady]);

  const centerView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition().duration(500)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  }, []);

  useEffect(() => {
    onCenterReady(centerView);
  }, [centerView, onCenterReady]);

  const buildColorCache = (
    nodes: d3.HierarchyNode<TreeNode>[],
    colors: Record<string, { link: string; label: string }>
  ): Map<string, { link: string; label: string }> => {
    const cache = new Map<string, { link: string; label: string }>();
    for (const node of nodes) {
      const nodeId = node.data.attributes?.id;
      if (!nodeId) continue;
      let n: d3.HierarchyNode<TreeNode> | null = node;
      while (n) {
        const id = n.data.attributes?.id;
        if (id && colors[id]) { cache.set(nodeId, colors[id]); break; }
        n = n.parent;
      }
    }
    return cache;
  };

  const applyColors = (
    svgEl: SVGSVGElement | null,
    colors: Record<string, { link: string; label: string }>,
    nodes: d3.HierarchyNode<TreeNode>[]
  ) => {
    if (!svgEl) return;
    const colorCache = buildColorCache(nodes, colors);
    const svg = d3.select(svgEl);
    svg
      .selectAll<SVGPathElement, d3.HierarchyPointLink<TreeNode>>(".tree-link")
      .attr("stroke", (d) => colorCache.get(d.target.data.attributes?.id ?? "")?.link ?? "#555");
    svg
      .selectAll<SVGTextElement, d3.HierarchyPointNode<TreeNode>>("text")
      .attr("fill", (d) => colorCache.get(d.data.attributes?.id ?? "")?.label ?? "currentColor");
  };

  useEffect(() => {
    applyColors(svgRef.current, branchColors, rootDescendantsRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchColors]);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();
    circleMapRef.current.clear();

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) / 2 - 60;
    const formattedData = treeData ?? undefined;

    const tree = d3
      .tree<TreeNode>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const holder = { name: "", children: [] };
    const root = tree(
      d3
        .hierarchy<TreeNode>(formattedData ? formattedData : holder)
        .sort((a, b) => d3.ascending(a.data.name, b.data.name))
    );

    rootDescendantsRef.current = root.descendants();

    // Build Fuse index for search (normalizing alef variants)
    const normalizeAlef = (s: string) => s.replace(/[أإآ]/g, "ا");
    fuseRef.current = new Fuse(root.descendants(), {
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

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: 100dvh; font: 10px sans-serif; touch-action: none;");

    const container = svg.append("g").style("will-change", "transform");

    container
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("class", "tree-link")
      .attr("stroke", (d) => ancestorColor(d.target, branchColorsRef.current, "link", "#555"))
      .attr(
        "d",
        d3
          .linkRadial<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

    container
      .append("g")
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 2.5)
      .attr("id", (d) => `${d.data.attributes?.id}`)
      .attr("name", (d) => `${d.data.name}`)
      .on("click", onNodeClick)
      .each(function(d) {
        const id = d.data.attributes?.id;
        if (id) circleMapRef.current.set(id, this as SVGCircleElement);
      });

    container
      .append("g")
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .join("text")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 1)
      .attr(
        "transform",
        (d) =>
          `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${
            d.x >= Math.PI ? 180 : 0
          })`
      )
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
      .style("cursor", "pointer")
      .style("pointer-events", "all")
      .style("user-select", "none")
      .style("font-size", (d) => `${23 - d.depth * 2}px`)
      .attr("text-anchor", (d) =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", (d) => ancestorColor(d, branchColorsRef.current, "label", "currentColor"))
      .attr("id", (d) => `${d.data.attributes?.id}`)
      .attr("name", (d) => `${d.data.name}`)
      .on("click", onNodeClick)
      .text((d) => d.data.name);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .filter((event) => {
        // Allow pinch-to-zoom (touch with 2 fingers) and mouse wheel/drag
        // Disable double-click zoom — on mobile double-tap selects a node
        if (event.type === "dblclick") return false;
        return !event.ctrlKey || event.type === "wheel";
      })
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;

    applyColors(svgRef.current, branchColorsRef.current, rootDescendantsRef.current);
  }, [treeData, onNodeClick, rootDescendantsRef, fuseRef]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ overflow: "visible" }}
      className="rd3t-svg"
    />
  );
}
