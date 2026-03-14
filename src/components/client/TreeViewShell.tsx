"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Fuse from "fuse.js";
import { TreeNode, TreeNodeAttributes } from "@/types/tree";
import { PersonWithRelations } from "@/types/family";
import { PersonModal } from "./Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Crosshair, Search } from "lucide-react";
import CreatePerson from "@/app/pages/CreatePerson";
import EditPerson from "@/app/pages/EditPerson";
import CreateSpouseRelationship from "@/app/pages/CreateSpouseRelationship";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollapsedBranch, removeCollapsedBranch, setPersonColor as setPersonColorQuery, clearPersonColor as clearPersonColorQuery } from "@/lib/queries/familyTrees";
import { PopoverZoomContext } from "@/contexts/popoverZoom";

export interface TreeLayoutProps {
  treeData: TreeNode | null;
  onNodeClick: (event: MouseEvent, d: d3.HierarchyNode<TreeNode>) => void;
   rootDescendantsRef: React.MutableRefObject<d3.HierarchyNode<TreeNode>[]>;
  fuseRef: React.MutableRefObject<Fuse<any> | null>;
  onFocusNodeReady: (fn: (query: string, exactId?: string) => void) => void;
  onCenterReady: (fn: () => void) => void;
  branchColors: Record<string, { link: string; label: string }>;
}

export default function TreeViewShell({
  members,
  treeId,
  treeData,
  collapsedPersonIds,
  initialBranchColors,
  onChange,
  children,
}: {
  members: PersonWithRelations[];
  treeId: string;
  treeData: TreeNode | null;
  collapsedPersonIds: string[];
  initialBranchColors: Record<string, { link: string; label: string }>;
  onChange: any;
  children: (props: TreeLayoutProps) => React.ReactNode;
}) {
  const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>(undefined);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rootDescendantsRef = useRef<d3.HierarchyNode<TreeNode>[]>([]);
  const fuseRef = useRef<Fuse<any> | null>(null);
  const focusNodeFnRef = useRef<((query: string, exactId?: string) => void) | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [countQuery, setCountQuery] = useState('');
  const [nameCount, setNameCount] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [branchColors, setBranchColors] = useState<Record<string, { link: string; label: string }>>(initialBranchColors);

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const selectedPerson: PersonWithRelations | undefined =
    isAdmin && selectedNode
      ? members.find((p) => p.id === selectedNode.attributes?.id)
      : undefined;

  const attrs: TreeNodeAttributes | undefined = selectedNode?.attributes;
  const displayGender = (isAdmin ? selectedPerson?.gender : attrs?.gender) as
    | "MALE"
    | "FEMALE"
    | undefined;
  const displaySpouses: string[] = isAdmin
    ? displayGender === "FEMALE"
      ? selectedPerson?.femaleSpouses.filter((s) => s.isActive).map((s) => s.male.fullName) ?? []
      : selectedPerson?.maleSpouses.filter((s) => s.isActive).map((s) => s.female.fullName) ?? []
    : attrs?.spouses ?? [];
  const displayDeathStatus: string | null = attrs?.isDead
    ? attrs.deathDate ?? "متوفى"
    : null;

  const mobileModalZoom = 0.43;

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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const setColorMutation = useMutation({
    mutationFn: ({ personId, linkColor, labelColor }: { personId: string; linkColor: string; labelColor: string }) =>
      setPersonColorQuery(treeId, personId, linkColor, labelColor),
    onSuccess: (_, { personId, linkColor, labelColor }) => {
      setBranchColors((prev) => ({ ...prev, [personId]: { link: linkColor, label: labelColor } }));
      queryClient.invalidateQueries({ queryKey: ["family-tree", treeId] });
    },
  });

  const clearColorMutation = useMutation({
    mutationFn: ({ personId }: { personId: string }) =>
      clearPersonColorQuery(treeId, personId),
    onSuccess: (_, { personId }) => {
      setBranchColors((prev) => {
        const next = { ...prev };
        delete next[personId];
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["family-tree", treeId] });
    },
  });

  const setPersonColor = (personId: string, type: "link" | "label", color: string) => {
    const existing = branchColors[personId] ?? { link: "#555555", label: "#111111" };
    const updated = { ...existing, [type]: color };
    setColorMutation.mutate({ personId, linkColor: updated.link, labelColor: updated.label });
  };

  const clearPersonColor = (personId: string) => {
    clearColorMutation.mutate({ personId });
  };

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

  const handleNodeClick = useCallback(
    (_event: MouseEvent, d: d3.HierarchyNode<TreeNode>) => {
      setSelectedNode(d.data);
      setIsAddingChild(false);
      setIsAddingSpouse(false);
      setIsEditingPerson(false);
    },
    []
  );

  const onFocusNodeReady = useCallback(
    (fn: (query: string, exactId?: string) => void) => {
      focusNodeFnRef.current = fn;
    },
    []
  );

  const focusNode = useCallback((query: string, exactId?: string) => {
    focusNodeFnRef.current?.(query, exactId);
  }, []);

  const centerFnRef = useRef<(() => void) | null>(null);
  const onCenterReady = useCallback((fn: () => void) => {
    centerFnRef.current = fn;
  }, []);
  const centerTree = useCallback(() => {
    centerFnRef.current?.();
  }, []);

  const normalizeAlef = (s: string) => s.replace(/[أإآ]/g, "ا").replace(/\s+/g, "");

  return (
    <div className="relative">
      {/* Search panel */}
      <div className="fixed top-20 right-4 z-[45] flex flex-col items-end gap-1">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={centerTree}
          title="توسيط الشجرة"
        >
          <Crosshair className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={() => {
            setShowSearch((v) => !v);
            setSuggestions([]);
            setSearchQuery("");
            setCountQuery("");
            setNameCount(null);
          }}
        >
          <Search className="h-4 w-4" />
        </Button>
        {showSearch && (
          <>
            <div className="flex gap-2 items-center">
              <Input
                value={searchQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setSearchQuery(q);
                  if (!q.trim() || !fuseRef.current) {
                    setSuggestions([]);
                    return;
                  }
                  const tokens = normalizeAlef(q)
                    .trim()
                    .split(/\s+/)
                    .filter((t) => t.length >= 2);
                  if (tokens.length === 0) {
                    setSuggestions([]);
                    return;
                  }
                  const tokenSets = tokens.map(
                    (token) =>
                      new Set(
                        fuseRef.current!
                          .search(token)
                          .map(
                            (r) =>
                              r.item.data.attributes?.id ?? r.item.data.name
                          )
                      )
                  );
                  const matchedIds = tokenSets.reduce(
                    (acc, set) => new Set([...acc].filter((id) => set.has(id)))
                  );
                  const results = fuseRef.current
                    .search(tokens[0])
                    .map((r) => r.item)
                    .filter((item) =>
                      matchedIds.has(item.data.attributes?.id ?? item.data.name)
                    )
                    .slice(0, 8);
                  setSuggestions(results);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSuggestions([]);
                    setSearchQuery("");
                    setCountQuery("");
                    setNameCount(null);
                    setShowSearch(false);
                  }
                }}
                placeholder="ابحث عن شخص..."
                dir="rtl"
                className="w-44 bg-card/90 backdrop-blur-sm shadow-md border"
                autoFocus
              />
            </div>
            <div className="flex gap-2 items-center">
              {nameCount !== null && (
                <span className="bg-card/90 backdrop-blur-sm shadow-md border text-sm px-2 py-1 rounded-md shrink-0 tabular-nums">
                  {nameCount}
                </span>
              )}
              <Input
                value={countQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setCountQuery(q);
                  if (!q.trim()) {
                    setNameCount(null);
                    return;
                  }
                  const count = rootDescendantsRef.current.filter(
                    (d) =>
                      normalizeAlef(d.data.name).trim() ===
                      normalizeAlef(q).trim()
                  ).length;
                  setNameCount(count);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setCountQuery("");
                    setNameCount(null);
                    setSearchQuery("");
                    setSuggestions([]);
                    setShowSearch(false);
                  }
                }}
                placeholder="عدد تكرار الاسم..."
                dir="rtl"
                className="w-44 bg-card/90 backdrop-blur-sm shadow-md border"
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="w-56 bg-card border rounded-md shadow-lg overflow-hidden">
                {suggestions.map((s) => (
                  <li
                    key={s.data.attributes?.id ?? s.data.name}
                    className="px-3 py-2 cursor-pointer hover:bg-accent text-right border-b last:border-b-0"
                    dir="rtl"
                    onClick={() => {
                      const label = s.data.attributes?.fullName ?? s.data.name;
                      focusNode(label, s.data.attributes?.id);
                      setSearchQuery(
                        s.data.name + " " + s.data.attributes?.familyName
                      );
                      setSuggestions([]);
                    }}
                  >
                    <p className="text-sm font-medium">{s.data.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.data.attributes?.fullName}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Layout */}
      {children({ treeData, onNodeClick: handleNodeClick, rootDescendantsRef, fuseRef, onFocusNodeReady, onCenterReady, branchColors })}

      {/* Person modal */}
      {selectedNode && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
          <div
            className="fixed z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              ...(isMobile
                ? {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    maxHeight: "55vh",
                    fontSize: "15px",
                  }
                : {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90vw",
                    maxWidth: "350px",
                    maxHeight: "70vh",
                    fontSize: "18px",
                  }),
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <PersonModal isOpen={true} onClose={closeModal} gender={displayGender}>
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
                                <div
                                  key={i}
                                  className="py-[0.2em] flex items-center-safe justify-center-safe w-full h-full break-words"
                                >
                                  {name}
                                </div>
                                <div className="w-full bg-primary-foreground h-px opacity-50 dark:opacity-10 rounded-4xl" />
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
                      {selectedPersonHasChildren &&
                        (collapsedPersonIds.includes(selectedPerson.id) ? (
                          <Button
                            variant="outline"
                            className="w-full text-[1em] py-[0.3em] h-auto px-[0.5em]"
                            onClick={() =>
                              expandMutation.mutate({
                                personId: selectedPerson.id,
                              })
                            }
                          >
                            إظهار الفروع
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full text-[1em] py-[0.3em] h-auto px-[0.5em]"
                            onClick={() =>
                              collapseMutation.mutate({
                                personId: selectedPerson.id,
                              })
                            }
                          >
                            إخفاء الفروع
                          </Button>
                        ))}
                    </div>
                    {/* Branch color pickers */}
                    <div className="border-t mt-[0.4em] pt-[0.3em] px-[0.5em]">
                      <div className="flex items-center justify-between" dir="rtl">
                        <span className="text-[0.75em] text-muted-foreground">ألوان الفروع</span>
                        <div className="flex items-center gap-3 mt-1">
                          <label className="flex flex-row items-center gap-1 text-[0.7em] cursor-pointer text-muted-foreground">
                            الخطوط
                            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-muted">
                              <input
                                type="color"
                                value={branchColors[selectedPerson.id]?.link ?? "#555555"}
                                onChange={(e) => setPersonColor(selectedPerson.id, "link", e.target.value)}
                                className="block cursor-pointer border-none p-0 appearance-none"
                                style={{ width: "200%", height: "200%", margin: "-50%" }}
                              />
                            </div>
                          </label>
                          <label className="flex flex-row items-center gap-1 text-[0.7em] cursor-pointer text-muted-foreground">
                            الأسماء
                            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-muted">
                              <input
                                type="color"
                                value={branchColors[selectedPerson.id]?.label ?? "#111111"}
                                onChange={(e) => setPersonColor(selectedPerson.id, "label", e.target.value)}
                                className="block cursor-pointer border-none p-0 appearance-none"
                                style={{ width: "200%", height: "200%", margin: "-50%" }}
                              />
                            </div>
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[0.75em] h-7 px-2 py-0"
                            onClick={() => clearPersonColor(selectedPerson.id)}
                          >
                            إعادة تعيين
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto mt-[0.5em] flex justify-center">
                      <PopoverZoomContext.Provider
                        value={isMobile ? mobileModalZoom : undefined}
                      >
                        {isAddingChild && (
                          <div
                            style={
                              isMobile
                                ? { zoom: mobileModalZoom, width: "100%", flexShrink: 0 }
                                : { width: "100%" }
                            }
                          >
                            <CreatePerson
                              onSuccess={() => setIsAddingChild(false)}
                              defaultValues={
                                selectedPerson.gender === "MALE"
                                  ? { father: selectedPerson }
                                  : { mother: selectedPerson }
                              }
                            />
                          </div>
                        )}
                        {isAddingSpouse && (
                          <div
                            style={
                              isMobile
                                ? { zoom: mobileModalZoom, width: "100%", flexShrink: 0 }
                                : { width: "100%" }
                            }
                          >
                            <CreateSpouseRelationship
                              defaultValues={
                                selectedPerson.gender === "MALE"
                                  ? { maleId: selectedPerson.id }
                                  : { femaleId: selectedPerson.id }
                              }
                              onSuccess={() => {
                                onChange();
                                setIsAddingSpouse(false);
                                setSelectedNode(undefined);
                              }}
                            />
                          </div>
                        )}
                        {isEditingPerson && (
                          <div
                            style={
                              isMobile
                                ? { zoom: mobileModalZoom, width: "100%", flexShrink: 0 }
                                : { width: "100%" }
                            }
                          >
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
