"use client"; 

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode } from "@/types/tree";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { prepareTreeData } from "@/lib/tree";
import SelectFamily from "../preDefinedData/SelectFamily";
import NoDataAlert from "../alerts/NoDataAlert";
import { Button } from "../ui/button";
import { Modal } from "./Modal";
import EditFamilyForm from "../forms/EditFamilyForm";

// const data: TreeNode = {
//   name: "root",
//   children: [
//     { name: "child1" },
//     {
//       name: "child2",
//       children: [
//         { name: "grandchild1" },
//         { name: "grandchild2" },
//       ],
//     },
//   ],
// };

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
  const [treeData, setTreeData] = useState<TreeNode | undefined>(undefined);
  const [selectedFamily, setSelectedFamily] = useState<
      FamilyWithRootPerson | undefined
    >(family);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
    

  const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        
        // Clear old renders
        d3.select(svgRef.current).selectAll("*").remove();
        
        const width = 600;
        const height = 600;
        const radius = width / 2;

        const familyFromSessionStorage = sessionStorage.getItem("selectedFamily")
        if (familyFromSessionStorage)
            setSelectedFamily(families?.find((f) => f.id === familyFromSessionStorage))
        
        if (members && selectedFamily && selectedFamily.rootPersonId) {
            console.log('ttt')
            const formattedData = prepareTreeData(
                members,
                selectedFamily.rootPersonId.toString(),
                selectedFamily.id,
            );
            setTreeData(formattedData);
        }
    
        if (members && selectedFamily && !selectedFamily.rootPersonId) {
            setTreeData(undefined);
        }
        
        // Create tree layout
        const cluster = d3.cluster<TreeNode>().size([2 * Math.PI, radius - 100]);
        
        console.log(treeData)
        // Build hierarchy
        const holder = { name: '', children: []}
        const root = d3.hierarchy<TreeNode>(treeData ? treeData : holder);
        
        const clusterRoot = cluster(root);
        
        const radialPoint = (x: number, y: number) => {
            return [
                y * Math.cos(x - Math.PI / 2),
                y * Math.sin(x - Math.PI / 2),
      ];
    };

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height].toString())
      .style("font", "10px sans-serif");

   // Links
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(clusterRoot.links())
      .join("path")
      .attr(
        "d",
        d3.linkRadial<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
          .angle(d => d.x)
          .radius(d => d.y)
      );


    // Nodes
    svg
      .append("g")
      .selectAll("circle")
      .data(clusterRoot.descendants())
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);
    //   .attr("transform", (d) => {
    //     const [x, y] = radialPoint(d.x, d.y);
    //     return `translate(${x},${y})`;
    //   })
    //   .attr("r", 4)
    //   .attr("fill", (d) => (d.children ? "#555" : "#999"));

    // Labels
    svg
      .append("g")
      .selectAll("text")
      .data(clusterRoot.descendants())
      .join("text")
    //   .attr("transform", (d) => {
    //     const [x, y] = radialPoint(d.x, d.y);
    //     return `translate(${x},${y})`;
    //   })
    //   .attr("dy", "0.31em")
    //   .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    //   .attr("text-anchor", (d) =>
    //     d.x < Math.PI === !d.children ? "start" : "end"
    //   )
    //   .attr("transform", (d) => {
    //     const [x, y] = radialPoint(d.x, d.y);
    //     return `translate(${x},${y}) rotate(${(d.x * 180) / Math.PI - 90})`;
    //   })
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke", "white");
  }, [members, families, selectedFamily]);

//     if (family && !treeData) {
//         return (
//         <div className="flex flex-col items-center align-middle">
//             <div>
//             <div className="flex items-center justify-center p-4">
//             <SelectFamily selected={selectedFamily} onChange={setSelectedFamily} isDisplayed={true}
//             />
//         </div> 
//             </div>
//             <NoDataAlert
//             title={`${selectedFamily?.name}`}
//             message={"No Data\nAdd a Root To Visualize The Tree."}
//             ></NoDataAlert>
//             <Button onClick={() => setIsEditingFamily(!isEditingFamily)}>
//             تعديل معلومات العائلة
//             </Button>
//             {isEditingFamily && selectedFamily && (
//             <Modal
//                 isOpen={isEditingFamily}
//                 onClose={() => setIsEditingFamily(false)}
//             >
//                 <EditFamilyForm
//                 family={selectedFamily}
//                 onEdit={() => {}}
//                 ></EditFamilyForm>
//             </Modal>
//             )}
//         </div>
//         );
//     }

//   if (!treeData) {
//     return <div className="flex items-center justify-center p-4">
//         <SelectFamily selected={selectedFamily} onChange={setSelectedFamily} isDisplayed={true}
//         />
//        </div> 
//   }
  return <svg ref={svgRef} width={600} height={600}></svg>;
}
