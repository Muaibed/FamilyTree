"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode, TreeNodeAttributes } from "@/types/tree";
import { PersonWithRelations } from "@/types/family";
import { PersonModal } from "./Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import CreatePerson from "@/app/pages/CreatePerson";
import EditPerson from "@/app/pages/EditPerson";
import CreateSpouseRelationship from "@/app/pages/CreateSpouseRelationship";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollapsedBranch, removeCollapsedBranch } from "@/lib/queries/familyTrees";
import { PopoverZoomContext } from "@/contexts/popoverZoom";

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
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const rootDescendantsRef = useRef<d3.HierarchyPointNode<TreeNode>[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<d3.HierarchyPointNode<TreeNode>[]>([]);

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
  const displayDeathStatus: string | null = attrs?.isDead ? (attrs.deathDate ?? "متوفى") : null;

  const mobileModalZoom = 0.23; 
  
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

    rootDescendantsRef.current = root.descendants();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: 100vh; font: 10px sans-serif;");

    // Single container group — zoom transforms are applied here
    const container = svg.append("g");

    container.append("g")
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

    container.append("g")
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

    container.append("g")
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

    // Zoom behavior — panning + scroll-to-zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;

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

  const getLineage = (node: d3.HierarchyPointNode<TreeNode>): string => {
    const parts: string[] = [];
    let current = node;
    let depth = 0;
    while (current.parent && current.parent.data.name && depth < 4) {
      const connector = current.data.attributes?.gender === 'FEMALE' ? 'بنت' : 'بن';
      parts.push(`${connector} ${current.parent.data.name}`);
      current = current.parent;
      depth++;
    }
    return parts.join(' ');
  };

  const focusNode = useCallback((query: string, exactId?: string) => {
    if (!query.trim() || !svgRef.current || !zoomRef.current) return;

    const q = query.toLowerCase();
    const match = rootDescendantsRef.current.find(d =>
      exactId
        ? d.data.attributes?.id === exactId
        : d.data.name.toLowerCase().includes(q) ||
          (d.data.attributes?.fullName ?? '').toLowerCase().includes(q)
    );
    if (!match) return;

    // Highlight matching node: amber fill, larger radius
    const circles = d3.select(svgRef.current)
      .selectAll<SVGCircleElement, d3.HierarchyPointNode<TreeNode>>('circle');

    circles
      .attr('fill', d =>
        d.data.attributes?.id === match.data.attributes?.id
          ? '#f59e0b'
          : d.children ? '#555' : '#999'
      )
      .attr('r', d =>
        d.data.attributes?.id === match.data.attributes?.id ? 7 : 2.5
      );

    // Fade highlight back to default after 3 seconds
    setTimeout(() => {
      if (!svgRef.current) return;
      d3.select(svgRef.current)
        .selectAll<SVGCircleElement, d3.HierarchyPointNode<TreeNode>>('circle')
        .transition()
        .duration(600)
        .attr('fill', d => d.children ? '#555' : '#999')
        .attr('r', 2.5);
    }, 3000);

    // Compute Cartesian SVG coords from radial layout
    // Node at angle match.x (radians), radius match.y; SVG origin = center (viewBox 0,0)
    const svgX = match.y * Math.cos(match.x - Math.PI / 2);
    const svgY = match.y * Math.sin(match.x - Math.PI / 2);

    // Pan + zoom: translate so the node lands at SVG origin (which is viewport center)
    const k = 1.5;
    const transform = d3.zoomIdentity.translate(-k * svgX, -k * svgY).scale(k);
    d3.select(svgRef.current)
      .transition()
      .duration(750)
      .call(zoomRef.current.transform, transform);
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-20 right-4 z-[45] flex flex-col items-end gap-1">
        <div className="flex gap-2 items-center">
          <Input
            value={searchQuery}
            onChange={e => {
              const q = e.target.value;
              setSearchQuery(q);
              if (!q.trim()) { setSuggestions([]); return; }
              // ignore بن\بنت when searching
              const ancestorChain = (node: d3.HierarchyPointNode<TreeNode>): string => {
                const parts: string[] = [];
                let cur: d3.HierarchyPointNode<TreeNode> | null = node;
                while (cur && cur.data.name) { parts.push(cur.data.name); cur = cur.parent; }
                return parts.join(' ');
              };
              const normalizedQ = q.trim().toLowerCase();
              const results = rootDescendantsRef.current
                .filter(d => ancestorChain(d).toLowerCase().includes(normalizedQ))
                .slice(0, 8);
              setSuggestions(results);
            }}
            onKeyDown={e => { if (e.key === 'Escape') { setSuggestions([]); setSearchQuery(''); } }}
            placeholder="ابحث عن شخص..."
            dir="rtl"
            className="w-44 bg-card/90 backdrop-blur-sm shadow-md border"
          />
          <Button
            size="icon"
            variant="secondary"
            className="shadow-md shrink-0"
            onClick={() => setSuggestions([])}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {suggestions.length > 0 && (
          <ul className="w-56 bg-card border rounded-md shadow-lg overflow-hidden">
            {suggestions.map((s) => {
              const lineage = getLineage(s);
              return (
                <li
                  key={s.data.attributes?.id ?? s.data.name}
                  className="px-3 py-2 cursor-pointer hover:bg-accent text-right border-b last:border-b-0"
                  dir="rtl"
                  onClick={() => {
                    const label = s.data.attributes?.fullName ?? s.data.name;
                    focusNode(label, s.data.attributes?.id);
                    setSearchQuery(label);
                    setSuggestions([]);
                  }}
                >
                  <p className="text-sm font-medium">{s.data.name}</p>
                  {lineage && (
                    <p className="text-xs text-muted-foreground mt-0.5">{lineage}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
                    width: '60px',
                    maxHeight: '25vh',
                    fontSize: '3px',
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
                  {displayDeathStatus && (
                    <div className="bg-rose-100 dark:bg-secondary rounded m-[0.3em]">
                      <div className="relative py-[0.3em] min-h-[2em]">
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                          <p className="text-[1em] text-rose-800 dark:text-rose-500">
                            {displayDeathStatus}
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
                      <PopoverZoomContext.Provider value={isMobile ? mobileModalZoom : undefined}>
                      {isAddingChild && (
                        <div style={isMobile ? { zoom: mobileModalZoom, width: '100%', flexShrink: 0 } : { width: '100%' }}>
                          <CreatePerson
                            onSuccess={() => setIsAddingChild(false)}
                            defaultValues={selectedPerson.gender === "MALE" ? { father: selectedPerson } : { mother: selectedPerson }}
                          />
                        </div>
                      )}
                      {isAddingSpouse && (
                        <div style={isMobile ? { zoom: mobileModalZoom, width: '100%', flexShrink: 0 } : { width: '100%' }}>
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
                        <div style={isMobile ? { zoom: mobileModalZoom, width: '100%', flexShrink: 0 } : { width: '100%' }}>
                          <EditPerson
                            id={selectedPerson.id}
                            onSubmit={() => setIsEditingPerson(false)}
                            onDelete={() => setSelectedNode(undefined)}
                          />
                        </div>
                      )}
                      </PopoverZoomContext.Provider>
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
