"use client"; 

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode } from "@/types/tree";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { prepareTreeData } from "@/lib/tree";
import { Modal, PersonModal } from "./Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import AddChildForm from "../forms/AddChildForm";
import AddSpouseForm from "../forms/AddSpouseForm";
import DeletePerson from "./DeletePerson";

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
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2000);

  const [selectedPerson, setSelectedPerson] = useState<
    PersonWithRelations | undefined
  >(undefined);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
    
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  
  function handleClick(event: MouseEvent, d: d3.HierarchyPointNode<TreeNode>) {
    console.log("Clicked:", d.data.attributes?.id);
    const personId = d.data.attributes?.id;
    setSelectedPerson(members.find((p) => p.id === personId));
    setDetailModalOpen(true);
  }

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
      .enter()
      .append("circle")
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5)
      .attr("id", d => `${d.data.attributes?.id}`)
      .attr("name", d => `${d.data.name}`)
      .on("click", handleClick)


    // Labels
    svg.append("g")
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append('text')
      .join("text")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 1)
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .style("cursor", "pointer")           
      .style("pointer-events", "all")  
      .style("user-select", "none") 
      .style("font-size", d => `${23 - d.depth * 2}px`)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr("id", d => `${d.data.attributes?.id}`)
      .attr("name", d => `${d.data.name}`)
      .on("click", handleClick)
      .raise();

  }, [members, families, selectedFamily]);
  
  return (
    <div>
      <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible'}} className="rd3t-svg"/>
      <div className="">
        <PersonModal
          isOpen={!!selectedPerson}
          onClose={() => {
            setSelectedPerson(undefined);
            setDetailModalOpen(false);
            setIsAddingChild(false);
            setIsAddingSpouse(false);
          }}
          gender={selectedPerson?.gender}
        >
        {selectedPerson && (
          <div className="text-center">
            <div>
              <h1 className="text-2xl font-bold">{selectedPerson.firstName}</h1>
              <p className="text-sm opacity-50 mt-1">{selectedPerson.fullName}</p>
            </div>
            <div className="m-4">
                {(selectedPerson.femaleSpouses.filter(
                  (s) => s.isActive === true
                ).length > 0 ||
                  selectedPerson.maleSpouses.filter((s) => s.isActive === true)
                    .length > 0) && (
              <div className="bg-accent dark:bg-secondary rounded m-1 h-auto p-2">
                  <div className="flex flex-row items-center justify-between py-2 relative min-h-[2.5rem]">
                    <div className="relative left-1/2 transform -translate-x-1/2 w-2/3">
                      <div className="flex flex-col">
                        {selectedPerson.gender === "FEMALE"
                          ? selectedPerson.femaleSpouses
                              .filter((s) => s.isActive === true)
                              .map((s) => (<>
                                <div key={s.id} className="py-1 flex items-center-safe justify-center-safe w-full h-full">
                                  {s.male.fullName}
                                </div>
                              <div className="w-full bg-primary-foreground h-0.5 opacity-50 dark:opacity-10 rounded-4xl"></div>
                              </>
                              ))
                              : selectedPerson.maleSpouses
                              .filter((s) => s.isActive === true)
                              .map((s) => (<>
                                <div key={s.id} className="py-1 flex items-center-safe justify-center-safe w-full h-full">
                                  {s.female.fullName}
                                </div>
                              <div className="w-full bg-primary-foreground h-0.5 opacity-50 dark:opacity-10 rounded-4xl"></div>
                              </>
                              ))}
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="/icons/wedding-rings.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-7 block dark:hidden"
                      />
                      <Image
                        src="/icons/white-wedding-rings.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-7 hidden dark:block"
                      />
                    </div>
                  </div>
              </div>
                )}
              {selectedPerson.deathDate && (
                <div className="bg-accent dark:bg-secondary rounded m-1">
                  <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <p>
                        {new Date(selectedPerson.deathDate)
                          .toISOString()
                          .slice(0, 10)}
                      </p>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="/icons/tombstone.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-6 block dark:hidden"
                      />
                      <Image
                        src="/icons/white-tombstone.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-6 hidden dark:block"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <div>
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Button
                    onClick={() => {
                      setIsAddingChild(!isAddingChild);
                      setIsAddingSpouse(false);
                    }}
                  >
                    إضافة ابن
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingSpouse(!isAddingSpouse);
                      setIsAddingChild(false);
                    }}
                  >
                    إضافة زوج
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full py-2 px-4 font-semibold"
                    onClick={() => setIsDeleting(!isDeleting)}
                  >
                    حذف
                  </Button>
                </div>
                {isAddingChild && (
                  <div>
                  <ScrollArea className="max-h-[50vh] md:max-h-[300px] overflow-auto">
                    <AddChildForm
                      parent={selectedPerson}
                      onAdd={() => {
                        onChange();
                        setDetailModalOpen(false);
                        setIsAddingChild(false);
                        setSelectedPerson(undefined);
                      }}
                    />
                    </ScrollArea>
                  </div>
                )}
                {isAddingSpouse && (
                  <div>
                    <ScrollArea className="max-h-[50vh] md:max-h-[300px] overflow-auto">
                    <AddSpouseForm
                      person={selectedPerson}
                      onAdd={() => {
                        onChange();
                        setDetailModalOpen(false);
                        setIsAddingSpouse(false);
                        setSelectedPerson(undefined);
                      }}
                      />
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}

            {/* {!isAdmin && (
              <div className="flex flex-col gap-2 mt-3 px-4">
                <Button
                  className="w-full py-2 px-4 font-semibold"
                  onClick={() =>
                    (window.location.href = `/changeRequestForm?personId=${selectedPerson.id}`)
                  }
                >
                  طلب تعديل
                </Button>
              </div>
            )} */}
          </div>
        )}
      </PersonModal>
        </div>

      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
          setDetailModalOpen(false);
        }}
      >
        {selectedPerson && isDeleting && (
          <DeletePerson
            person={selectedPerson}
            onSubmit={() => {
              onChange();
              setDetailModalOpen(false);
              setIsDeleting(false);
            }}
          />
        )}
      </Modal>
    </div>
  )
}
