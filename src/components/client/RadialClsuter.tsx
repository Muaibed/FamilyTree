"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode, TreeNodeAttributes } from "@/types/tree";
import { PersonWithRelations } from "@/types/family";
import { PersonModal } from "./Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import CreatePerson from "@/app/pages/CreatePerson";
import EditPerson from "@/app/pages/EditPerson";
import CreateSpouseRelationship from "@/app/pages/CreateSpouseRelationship";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollapsedBranch, removeCollapsedBranch } from "@/lib/queries/familyTrees";

export default function RadialCluster({
  members,
  treeId,
  treeData,
  collapsedPersonIds,
  onChange,
}: {
  members: PersonWithRelations[];
  treeId: string;
  treeData: TreeNode | null;
  collapsedPersonIds: string[];
  onChange: any;
}) {
  const [width] = useState(2000);
  const [height] = useState(2000);

  // Store the clicked tree node — attributes hold all display data
  const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>(undefined);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  // Admins resolve the full person object from the pre-loaded members list
  const selectedPerson: PersonWithRelations | undefined = isAdmin && selectedNode
    ? members.find((p) => p.id === selectedNode.attributes?.id)
    : undefined;

  const attrs: TreeNodeAttributes | undefined = selectedNode?.attributes;

  // Display values — admins use the full PersonWithRelations, others use node attributes
  const displayGender = (isAdmin ? selectedPerson?.gender : attrs?.gender) as 'MALE' | 'FEMALE' | undefined;
  const displaySpouses: string[] = isAdmin
    ? (displayGender === 'FEMALE'
        ? selectedPerson?.femaleSpouses.filter(s => s.isActive).map(s => s.male.fullName) ?? []
        : selectedPerson?.maleSpouses.filter(s => s.isActive).map(s => s.female.fullName) ?? [])
    : (attrs?.spouses ?? []);
  const displayDeathDate: string | null = isAdmin
    ? (selectedPerson?.deathDate ? String(selectedPerson.deathDate).slice(0, 10) : null)
    : (attrs?.deathDate ?? null);

  const queryClient = useQueryClient();

  const collapseMutation = useMutation({
    mutationFn: ({ personId }: { personId: string }) =>
      addCollapsedBranch(treeId, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-tree", treeId] });
    },
  });

  const expandMutation = useMutation({
    mutationFn: ({ personId }: { personId: string }) =>
      removeCollapsedBranch(treeId, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-tree", treeId] });
    },
  });

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
    setSelectedNode(d.data);
    setIsAddingChild(false);
    setIsAddingSpouse(false);
    setIsEditingPerson(false);

    let clickX = event.clientX;
    let clickY = event.clientY;

    const isMobileView = window.innerWidth < 768;
    const modalWidth = isMobileView ? 150 : Math.min(window.innerWidth * 0.9, 350);
    const modalMaxHeight = isMobileView ? window.innerHeight * 0.45 : window.innerHeight * 0.7;

    const padding = 10;
    const halfWidth = modalWidth / 2;
    const halfHeight = modalMaxHeight / 2;

    if (clickX - halfWidth < padding) {
      clickX = halfWidth + padding;
    } else if (clickX + halfWidth > window.innerWidth - padding) {
      clickX = window.innerWidth - halfWidth - padding;
    }

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

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) / 2 - 60;

    const formattedData = treeData ?? undefined;

    const tree = d3.tree<TreeNode>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const holder = { name: '', children: [] }
    const root = tree(d3.hierarchy<TreeNode>(formattedData ? formattedData : holder)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

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

  }, [treeData]);

  const selectedPersonHasChildren =
    selectedPerson &&
    (selectedPerson.fatherChildren.length > 0 ||
      selectedPerson.motherChildren.length > 0);

  const closeModal = () => {
    setSelectedNode(undefined);
    setIsAddingChild(false);
    setIsAddingSpouse(false);
    setIsEditingPerson(false);
  };

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} className="rd3t-svg" />
      {selectedNode && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModal}
          />
          {/* Modal */}
          <div
            className="fixed z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              ...(isMobile
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
                  }),
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <PersonModal
              isOpen={true}
              onClose={closeModal}
              gender={displayGender}
            >
              <div className="text-center overflow-x-hidden">
                <div className="break-words">
                  <h1 className="text-[1.3em] font-bold break-words">
                    {isAdmin ? selectedPerson?.firstName : selectedNode.name}
                  </h1>
                  <p className="text-[1em] opacity-50 mt-[0.3em] break-words">
                    {isAdmin ? selectedPerson?.fullName : attrs?.fullName}
                  </p>
                  <p className="text-[1em] opacity-50 mt-[0.2em] break-words">
                    {isAdmin ? selectedPerson?.kunya : attrs?.kunya}
                  </p>
                </div>
                <div className="m-[0.5em]">
                  {displaySpouses.length > 0 && (
                    <div className="bg-accent dark:bg-secondary rounded m-[0.3em] h-auto p-[0.3em]">
                      <div className="flex flex-row items-center justify-between py-[0.3em] relative min-h-[2em]">
                        <div className="relative left-1/2 transform -translate-x-1/2 w-2/3">
                          <div className="flex flex-col text-[1em]">
                            {displaySpouses.map((name, i) => (
                              <>
                                <div key={i} className="py-[0.2em] flex items-center-safe justify-center-safe w-full h-full break-words">
                                  {name}
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
                  {displayDeathDate && (
                    <div className="bg-accent dark:bg-secondary rounded m-[0.3em]">
                      <div className="relative py-[0.3em] min-h-[2em]">
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                          <p className="text-[1em]">
                            {displayDeathDate}
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

                {isAdmin && selectedPerson && (
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
                      {selectedPersonHasChildren && (
                        collapsedPersonIds.includes(selectedPerson.id)
                          ? (
                            <Button
                              variant="outline"
                              className="w-full text-[1em] py-[0.3em] h-auto px-[0.5em]"
                              onClick={() => expandMutation.mutate({ personId: selectedPerson.id })}
                            >
                              إظهار الفروع
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="w-full text-[1em] py-[0.3em] h-auto px-[0.5em]"
                              onClick={() => collapseMutation.mutate({ personId: selectedPerson.id })}
                            >
                              إخفاء الفروع
                            </Button>
                          )
                      )}
                    </div>
                    <div className="overflow-auto mt-[0.5em] flex justify-center">
                      {isAddingChild && (
                        <div style={isMobile ? { zoom: 0.43, width: '320px', flexShrink: 0 } : { width: '100%' }}>
                          <CreatePerson
                            onSuccess={() => setIsAddingChild(false)}
                            defaultValues={selectedPerson.gender === "MALE" ? { father: selectedPerson } : { mother: selectedPerson }}
                          />
                        </div>
                      )}
                      {isAddingSpouse && (
                        <div style={isMobile ? { zoom: 0.43, width: '320px', flexShrink: 0 } : { width: '100%' }}>
                          <CreateSpouseRelationship
                            defaultValues={selectedPerson.gender === "MALE" ? { maleId: selectedPerson.id } : { femaleId: selectedPerson.id }}
                            onSuccess={() => {
                              onChange();
                              setIsAddingSpouse(false);
                              setSelectedNode(undefined);
                            }}
                          />
                        </div>
                      )}
                      {isEditingPerson && (
                        <div style={isMobile ? { zoom: 0.43, width: '320px', flexShrink: 0 } : { width: '100%' }}>
                          <EditPerson
                            id={selectedPerson.id}
                            onSubmit={() => setIsEditingPerson(false)}
                            onDelete={() => setSelectedNode(undefined)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PersonModal>
          </div>
        </>
      )}
    </div>
  );
}
