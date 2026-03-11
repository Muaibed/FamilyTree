"use client";

import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import Fuse from "fuse.js";
import { TreeNode } from "@/types/tree";
import { TreeLayoutProps } from "./TreeViewShell";

const NODE_DX = 28; // vertical space per sibling row
const NODE_DY = 200; // horizontal space per level

/**
 * Horizontal (left-to-right) tidy tree — root on the left, descendants spread right.
 * Nodes are positioned by swapping d.x/d.y from d3.tree(), so:
 *   SVG x = d.y  (level depth → horizontal)
 *   SVG y = d.x  (sibling position → vertical)
 */
export default function HorizontalTree({
  treeData,
  onNodeClick,
  rootDescendantsRef,
  fuseRef,
  onFocusNodeReady,
}: TreeLayoutProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const W = 4000;
  const H = 4000;

  // Node's actual SVG position is (d.y, d.x) due to the x/y swap.
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

      d3.select(svgRef.current)
        .selectAll<SVGCircleElement, d3.HierarchyPointNode<TreeNode>>("circle")
        .attr("fill", (d) =>
          d.data.attributes?.id === match.data.attributes?.id
            ? "#f59e0b"
            : d.children
            ? "#555"
            : "#999"
        )
        .attr("r", (d) =>
          d.data.attributes?.id === match.data.attributes?.id ? 7 : 2.5
        );

      setTimeout(() => {
        if (!svgRef.current) return;
        d3.select(svgRef.current)
          .selectAll<SVGCircleElement, d3.HierarchyPointNode<TreeNode>>("circle")
          .transition()
          .duration(600)
          .attr("fill", (d) => (d.children ? "#555" : "#999"))
          .attr("r", 2.5);
      }, 3000);

      // SVG position is (d.y, d.x) due to the swap
      const k = 2.5;
      const transform = d3.zoomIdentity
        .translate(-k * match.y, -k * match.x)
        .scale(k);
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
    const tree = d3.tree<TreeNode>().nodeSize([NODE_DX, NODE_DY]);
    const holder: TreeNode = { name: "", children: [] };
    const root = tree(
      d3
        .hierarchy<TreeNode>(formattedData ?? holder)
        .sort((a, b) => d3.ascending(a.data.name, b.data.name))
    );

    rootDescendantsRef.current = root.descendants();

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

    // viewBox 
    const svg = d3
      .select(svgRef.current)
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", [-W / 2, -H / 2, W, H])
      .attr("style", "width: 100%; height: 100vh; font: 10px sans-serif;");

    const container = svg.append("g");

    // Links
    container
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    // Circles 
    container
      .append("g")
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 2.5)
      .attr("id", (d) => `${d.data.attributes?.id}`)
      .attr("name", (d) => `${d.data.name}`)
      .on("click", onNodeClick);

    // Labels
    container
      .append("g")
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -8 : 8))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("cursor", "pointer")
      .style("pointer-events", "all")
      .style("user-select", "none")
      .style("font-size", `13px`)
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("fill", "currentColor")
      .attr("id", (d) => `${d.data.attributes?.id}`)
      .attr("name", (d) => `${d.data.name}`)
      .text((d) => d.data.name)
      .on("click", onNodeClick);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.02, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;

    const initialTransform = d3.zoomIdentity.translate(-W * 0.3, 0).scale(2);
    d3.select(svgRef.current).call(zoom.transform, initialTransform);
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
