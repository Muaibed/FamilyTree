"use client";

import React, { useState, useEffect } from "react";
import Tree, {
  CustomNodeElementProps,
  RenderCustomNodeElementFn,
} from "react-d3-tree";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { Modal, PersonModal } from "@/components/client/Modal";
import AddChildForm from "@/components/forms/AddChildForm";
import AddSpouseForm from "../forms/AddSpouseForm";
import { TreeNode } from "@/types/tree";
import { prepareTreeData } from "@/lib/tree";
import DeletePerson from "./DeletePerson";
import SearchSelect from "../ui/SearchSelect";
import { Option } from "@/types/ui";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import NoDataAlert from "../alerts/NoDataAlert";
import EditFamilyForm from "../forms/EditFamilyForm";
import Image from "next/image";
import SelectFamily from "../preDefinedData/SelectFamily";
import { ScrollArea } from "../ui/scroll-area";

const renderCustomNode: RenderCustomNodeElementFn = (
  rd3tNodeProps: CustomNodeElementProps
) => {
  const { nodeDatum, onNodeClick } = rd3tNodeProps;
  const gender = nodeDatum.attributes?.gender;
  return (
    <g onClick={(e) => onNodeClick(e)}>
      <rect
        width="120"
        height="40"
        x="-60"
        y="-23"
        className={`${
          gender == "MALE" ? "fill-male" : "fill-female"
        } stroke-none`}
        rx="10"
        ry="10"
      />
      <rect
        width="120"
        height="40"
        x="-60"
        y="-20"
        className="fill-white dark:fill-seondary dark:stroke-none stroke-none"
        rx="10"
        ry="10"
      />
      <text
        fill="black"
        strokeWidth="0.1"
        textAnchor="middle"
        dominantBaseline="middle"
        x="0"
        y="0"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default function FamilyTreeView({
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
  const [selectedPerson, setSelectedPerson] = useState<
    PersonWithRelations | undefined
  >(undefined);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<
    FamilyWithRootPerson | undefined
  >(family);

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    const familyFromSessionStorage = sessionStorage.getItem("selectedFamily")
    if (familyFromSessionStorage)
      setSelectedFamily(families?.find((f) => f.id === familyFromSessionStorage))

    if (members && selectedFamily && selectedFamily.rootPersonId) {
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
  }, [members, family, families, selectedFamily, selectedPerson]);

  if (family && !treeData) {
    return (
      <div className="flex flex-col items-center align-middle">
        <div>
          <div className="flex items-center justify-center p-4">
        <SelectFamily selected={selectedFamily} onChange={setSelectedFamily} isDisplayed={true}
        />
       </div> 
        </div>
        <NoDataAlert
          title={`${selectedFamily?.name}`}
          message={"No Data\nAdd a Root To Visualize The Tree."}
        ></NoDataAlert>
        <Button onClick={() => setIsEditingFamily(!isEditingFamily)}>
          تعديل معلومات العائلة
        </Button>
        {isEditingFamily && selectedFamily && (
          <Modal
            isOpen={isEditingFamily}
            onClose={() => setIsEditingFamily(false)}
          >
            <EditFamilyForm
              family={selectedFamily}
              onEdit={() => {}}
            ></EditFamilyForm>
          </Modal>
        )}
      </div>
    );
  }

  if (!treeData) {
    return <div className="flex items-center justify-center p-4">
        <SelectFamily selected={selectedFamily} onChange={setSelectedFamily} isDisplayed={true}
        />
       </div> 
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="absolute top-4 left-0 w-full flex items-center justify-center z-50">
        <SelectFamily selected={selectedFamily} onChange={setSelectedFamily} isDisplayed={true}
        />
      </div>
      <div
      >
        <div className={`flex w-full h-full min-h-screen`}>
          <div className={`${
          detailModalOpen ? "md:blur-xs" : ""
        } transition-all duration-200 w-full`}>
        <Tree
          data={treeData}
          renderCustomNodeElement={renderCustomNode}
          orientation="vertical"
          pathFunc="step"
          collapsible={false}
          zoomable={true}
          draggable={true}
          pathClassFunc={() => "custom-link"}
          onNodeClick={(nodeData, event) => {
            const personId = nodeData.data.attributes?.id;
            setSelectedPerson(members.find((p) => p.id === personId));
            setDetailModalOpen(true);
          }}
        />
          </div>
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

            {!isAdmin && (
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
            )}
          </div>
        )}
      </PersonModal>
        </div>
      </div>
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
  );
}
