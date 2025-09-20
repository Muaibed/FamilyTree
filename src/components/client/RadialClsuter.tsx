"use client"; 

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode } from "@/types/tree";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { prepareTreeData } from "@/lib/tree";

export default function RadialCluster({
  members,
  families,
  family,
  onChange,
}: {
  members: PersonWithRelations[];
  families: FamilyWithRootPerson[] | undefined;
  family?: FamilyWithRootPerson;
  onChange: any;
}) {
  const [selectedFamily, setSelectedFamily] = useState<
      FamilyWithRootPerson | undefined
    >(family);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2000);
    

  const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        
        // Clear old renders
        d3.select(svgRef.current).selectAll("*").remove();
        
        const cx = width * 0.5; // adjust as needed to fit
        const cy = height * 0.5; // adjust as needed to fit
        const radius = Math.min(width, height) / 2 - 60;
        
        let formattedData;
        if (members && selectedFamily && selectedFamily.rootPersonId) {
            formattedData = prepareTreeData(
                members,
                selectedFamily.rootPersonId.toString(),
                selectedFamily.id,
            );
        }

    // Create tree layout
    const tree = d3.tree<TreeNode>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Build hierarchy
    const holder = { name: '', children: []}
    const root = tree(d3.hierarchy<TreeNode>(formattedData ? formattedData : holder)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
      

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

   // Links
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkRadial<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
          .angle(d => d.x)
          .radius(d => d.y));


    // Nodes
    svg.append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

    // Labels
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 1)
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .style("font-size", d => `${23 - d.depth * 2}px`)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      .text(d => d.data.name)
      .clone(true)
      .lower()
  }, [members, families, selectedFamily]);
  
  return (
    <div>
      <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible'}} className="rd3t-svg"/>
    </div>
  )
}
