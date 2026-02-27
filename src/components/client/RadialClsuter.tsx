"use client"; 

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode } from "@/types/tree";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { prepareTreeData } from "@/lib/tree";
import { PersonModal } from "./Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import CreatePerson from "@/app/pages/CreatePerson";
import EditPerson from "@/app/pages/EditPerson";
import CreateSpouseRelationship from "@/app/pages/CreateSpouseRelationship";

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
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleClick(event: MouseEvent, d: d3.HierarchyPointNode<TreeNode>) {
    const personId = d.data.attributes?.id;
    setSelectedPerson(members.find((p) => p.id === personId));

    // Get the actual screen coordinates of the click
    let clickX = event.clientX;
    let clickY = event.clientY;

    // Get modal dimensions based on screen size
    const isMobileView = window.innerWidth < 768;
    const modalWidth = isMobileView ? 150 : Math.min(window.innerWidth * 0.9, 350);
    const modalMaxHeight = isMobileView ? window.innerHeight * 0.45 : window.innerHeight * 0.7;

    // Constrain to viewport bounds (with some padding)
    const padding = 10;
    const halfWidth = modalWidth / 2;
    const halfHeight = modalMaxHeight / 2;

    // Constrain X position
    if (clickX - halfWidth < padding) {
      clickX = halfWidth + padding;
    } else if (clickX + halfWidth > window.innerWidth - padding) {
      clickX = window.innerWidth - halfWidth - padding;
    }

    // Constrain Y position
    if (clickY - halfHeight < padding) {
      clickY = halfHeight + padding;
    } else if (clickY + halfHeight > window.innerHeight - padding) {
      clickY = window.innerHeight - halfHeight - padding;
    }

    setModalPos({ x: clickX, y: clickY });
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
      {selectedPerson && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => {
              setSelectedPerson(undefined);
              setIsAddingChild(false);
              setIsAddingSpouse(false);
              setIsEditingPerson(false);
            }}
          />
          {/* Modal - compact beside node, expands to center when a form is open */}
          <div
            className="fixed z-50 overflow-hidden"
            style={
              (isAddingChild || isAddingSpouse || isEditingPerson)
                ? {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90vw',
                    maxWidth: '450px',
                    maxHeight: '85vh',
                    fontSize: '14px',
                  }
                : isMobile
                ? {
                    left: `${modalPos.x}px`,
                    top: `${modalPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '150px',
                    maxHeight: '45vh',
                    fontSize: '9px',
                  }
                : {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90vw',
                    maxWidth: '350px',
                    maxHeight: '70vh',
                    fontSize: '14px',
                  }
            }
          >
        <PersonModal
          isOpen={!!selectedPerson}
          onClose={() => {
            setSelectedPerson(undefined);
            setIsAddingChild(false);
            setIsAddingSpouse(false);
            setIsEditingPerson(false)
          }}
          gender={selectedPerson?.gender}
        >
        {selectedPerson && (
          <div className="text-center overflow-hidden">
            <div className="break-words">
              <h1 className="text-[1.3em] font-bold break-words">{selectedPerson.firstName}</h1>
              <p className="text-[1em] opacity-50 mt-[0.3em] break-words">{selectedPerson.fullName}</p>
              <p className="text-[1em] opacity-50 mt-[0.2em] break-words">{selectedPerson.kunya}</p>
            </div>
            <div className="m-[0.5em]">
                {(selectedPerson.femaleSpouses.filter(
                  (s) => s.isActive === true
                ).length > 0 ||
                  selectedPerson.maleSpouses.filter((s) => s.isActive === true)
                    .length > 0) && (
              <div className="bg-accent dark:bg-secondary rounded m-[0.3em] h-auto p-[0.3em]">
                  <div className="flex flex-row items-center justify-between py-[0.3em] relative min-h-[2em]">
                    <div className="relative left-1/2 transform -translate-x-1/2 w-2/3">
                      <div className="flex flex-col text-[1em]">
                        {selectedPerson.gender === "FEMALE"
                          ? selectedPerson.femaleSpouses
                              .filter((s) => s.isActive === true)
                              .map((s) => (<>
                                <div key={s.id} className="py-[0.2em] flex items-center-safe justify-center-safe w-full h-full break-words">
                                  {s.male.fullName}
                                </div>
                              <div className="w-full bg-primary-foreground h-px opacity-50 dark:opacity-10 rounded-4xl"></div>
                              </>
                              ))
                              : selectedPerson.maleSpouses
                              .filter((s) => s.isActive === true)
                              .map((s) => (<>
                                <div key={s.id} className="py-[0.2em] flex items-center-safe justify-center-safe w-full h-full break-words">
                                  {s.female.fullName}
                                </div>
                              <div className="w-full bg-primary-foreground h-px opacity-50 dark:opacity-10 rounded-4xl"></div>
                              </>
                              ))}
                      </div>
                    </div>
                    <div className="absolute right-[0.4em] top-1/2 transform -translate-y-1/2">
                      <Image
                        src="/icons/wedding-rings.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-[1.4em] h-[1.4em] block dark:hidden"
                      />
                      <Image
                        src="/icons/white-wedding-rings.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-[1.4em] h-[1.4em] hidden dark:block"
                      />
                    </div>
                  </div>
              </div>
                )}
              {selectedPerson.deathDate && (
                <div className="bg-accent dark:bg-secondary rounded m-[0.3em]">
                  <div className="relative py-[0.3em] min-h-[2em]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <p className="text-[1em]">
                        {new Date(selectedPerson.deathDate)
                          .toISOString()
                          .slice(0, 10)}
                      </p>
                    </div>
                    <div className="absolute right-[0.4em] top-1/2 transform -translate-y-1/2">
                      <Image
                        src="/icons/tombstone.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-[1.2em] h-[1.2em] block dark:hidden"
                      />
                      <Image
                        src="/icons/white-tombstone.png"
                        alt="Star"
                        width={512}
                        height={512}
                        className="w-[1.2em] h-[1.2em] hidden dark:block"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <div>
                <div className="flex flex-col gap-[0.4em] mt-[0.5em] px-[0.5em]">
                  <Button
                    onClick={() => {
                      setIsAddingChild(!isAddingChild);
                      setIsAddingSpouse(false);
                      setIsEditingPerson(false);
                    }}
                    className="text-[1em] py-[0.3em] h-auto px-[0.5em]"
                  >
                    إضافة ابن
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingSpouse(!isAddingSpouse);
                      setIsAddingChild(false);
                      setIsEditingPerson(false);
                    }}
                    className="text-[1em] py-[0.3em] h-auto px-[0.5em]"
                  >
                    إضافة زوج
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-[1em] py-[0.3em] h-auto px-[0.5em]"
                    onClick={() => {
                      setIsEditingPerson(!isEditingPerson);
                      setIsAddingChild(false);
                      setIsAddingSpouse(false);
                    }}
                  >
                    تعديل
                  </Button>
                </div>
                <div className="max-h-[20em] overflow-auto overflow-x-hidden mt-[0.5em]">
                {isAddingChild && (
                  <div className="overflow-hidden">
                      <CreatePerson onSuccess={() => setIsAddingChild(false)} defaultValues={selectedPerson.gender === "MALE" ? { father: selectedPerson } : { mother: selectedPerson }} />
                  </div>
                )}
                {isAddingSpouse && (
                  <div className="overflow-hidden">
                    <CreateSpouseRelationship
                      defaultValues={selectedPerson.gender === "MALE" ? { maleId: selectedPerson.id } : { femaleId: selectedPerson.id }}
                      onSuccess={() => {
                        onChange();
                        setIsAddingSpouse(false);
                        setSelectedPerson(undefined);
                      }}
                      />
                  </div>
                )}
                {selectedPerson && isEditingPerson && (
                  <div className="overflow-hidden">
                      <EditPerson id={selectedPerson.id} onSubmit={() => setIsEditingPerson(false)} onDelete={() => setSelectedPerson(undefined)} />
                  </div>
                )}
                </div>
              </div>
            )}
          </div>
        )}
          </PersonModal>
          </div>
        </>
      )}
    </div>
  )
}
