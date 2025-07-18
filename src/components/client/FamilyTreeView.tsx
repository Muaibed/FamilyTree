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
import SearchSelect from "./SearchSelect";
import { Option } from "@/types/ui";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import NoDataAlert from "../alerts/NoDataAlert";
import EditFamilyForm from "../forms/EditFamilyForm";
import Image from 'next/image';


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
  family: FamilyWithRootPerson;
  onChange: any;
}) {
  const [treeData, setTreeData] = useState<TreeNode | undefined>(undefined);
  const [selectedPerson, setSelectedPerson] = useState<PersonWithRelations | undefined>(undefined);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<FamilyWithRootPerson | undefined>(
    family
  );
  const [familyOptions, setFamilyOptions] = useState<Option[]>();

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (families) {
      const options = families.map((f) => ({
        id: f.id.toString(),
        value: f.name,
      }));

      setFamilyOptions(options);
    }

    if (members && selectedFamily && selectedFamily.rootPersonId) {
      const formattedData = prepareTreeData(
        members,
        selectedFamily.rootPersonId.toString()
      );
      setTreeData(formattedData);
    }

    if (members && selectedFamily && !selectedFamily.rootPersonId) {
      setTreeData(undefined)
    }

  }, [members, family, families, selectedFamily, selectedPerson]);

  if (!treeData) {
    return (
      <div className="flex flex-col items-center align-middle">
        <div>
          <SearchSelect
            options={familyOptions ?? []}
            selected={
              selectedFamily
                ? {
                    id: selectedFamily.id.toString(),
                    value: selectedFamily.name,
                  }
                : null
            }
            onSelect={(option) => {
              const family = families?.find(
                (f) => f.id.toString() === option.id
              );
              setSelectedFamily(family || undefined);
            }}
            placeholder="Select family..."
          />
        </div>
        <NoDataAlert
          title={`${selectedFamily?.name}`}
          message={"No Data\nAdd a Root To Visualize The Tree."}
        ></NoDataAlert>
        <Button onClick={() => setIsEditingFamily(!isEditingFamily)}>
          Edit Family
        </Button>
        {isEditingFamily && selectedFamily && (
          <Modal
            isOpen={isEditingFamily}
            onClose={() => setIsEditingFamily(false)}
          >
            <EditFamilyForm family={selectedFamily} onEdit={() => {}}></EditFamilyForm>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="absolute top-4 left-0 w-full flex items-center justify-center z-50">
          <SearchSelect
            className="w-32!"
            options={familyOptions ?? []}
            selected={
              selectedFamily
                ? {
                    id: selectedFamily.id.toString(),
                    value: selectedFamily.name,
                  }
                : null
            }
            onSelect={(option) => {
              const family = families?.find(
                (f) => f.id.toString() === option.id
              );
              setSelectedFamily(family || undefined);
            }}
            placeholder="Select family..."
          />
      </div>
      <div
        className={`relative w-full h-screen ${
          detailModalOpen ? "blur-xs" : ""
        } transition-all duration-200`}
      >
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

            if (personId && personId !== true) {
              // exclude (true) if assigned to personId
              setSelectedPerson(members.find(p => p.id === personId));
            }
            setDetailModalOpen(true);
          }}
        />
      </div>

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
              <p className="text-sm opacity-50">
                {selectedPerson.fullName}
              </p>
            </div>
            <div className="m-4">
              <div className="bg-accent dark:bg-secondary rounded m-1">
                {(selectedPerson.femaleSpouses.filter((s) => s.isActive === true).length > 0 
                  || selectedPerson.maleSpouses.filter((s) => s.isActive === true).length > 0) 
                  && (
                  <div className="flex items-center justify-between py-2 relative min-h-[2.5rem]">
                    <div className="relative left-1/2 transform -translate-x-1/2">
                      <div className="flex flex-col">
                      {selectedPerson.gender === "FEMALE" ? selectedPerson.femaleSpouses.filter((s) => s.isActive === true).map((s) =>
                        <div key={s.id} className="py-1">{s.male.fullName}</div>) : selectedPerson.maleSpouses.filter((s) => s.isActive === true).map((s) => <div key={s.id} className="py-1">{s.female.fullName}</div>)}
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Image src="/icons/wedding-rings.png" alt="Star" width={512} height={512} className="w-7 block dark:hidden" />
                      <Image src="/icons/white-wedding-rings.png" alt="Star" width={512} height={512} className="w-7 hidden dark:block" />
                    </div>
                  </div>
                  )}
              </div>
              {selectedPerson.deathDate && (
              <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{new Date(selectedPerson.deathDate).toISOString().slice(0,10)}</p>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Image src="/icons/tombstone.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                      <Image src="/icons/white-tombstone.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                  </div>
                </div>
              </div>
              )}
            </div>

            {isAdmin && (
              <div>
                <div className="mt-4">
                  <Button
                    className="p-1 w-fit pl-2 pr-2 m-2"
                    onClick={() => {
                      setIsAddingChild(!isAddingChild);
                      setIsAddingSpouse(false);
                    }}
                  >
                    ADD Child
                  </Button>
                  <Button
                    className="p-1 w-fit pl-2 pr-2 m-2"
                    onClick={() => {
                      setIsAddingSpouse(!isAddingSpouse);
                      setIsAddingChild(false);
                    }}
                  >
                    ADD Spuose
                  </Button>
                  <Button
                    className="p-1 w-fit pl-2 pr-2 m-2"
                    onClick={() => setIsDeleting(!isDeleting)}
                  >
                    DELETE
                  </Button>
                </div>
                {isAddingChild && (
                  <div>
                    <AddChildForm
                      parent={selectedPerson}
                      members={members}
                      onAdd={() => {
                        onChange();
                        setDetailModalOpen(false);
                        setIsAddingChild(false);
                        setSelectedPerson(undefined);
                      }}
                    />
                  </div>
                )}
                {isAddingSpouse && (
                  <div>
                    <AddSpouseForm
                      person={selectedPerson}
                      members={members}
                      onAdd={() => {
                        onChange();
                        setDetailModalOpen(false);
                        setIsAddingSpouse(false);
                        setSelectedPerson(undefined);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {!isAdmin && (
              <Button
                className="w-fit pl-2 pr-2 mt-6"
                onClick={() =>
                  (window.location.href = `/changeRequestForm?personId=${selectedPerson.id}`)
                }
              >
                طلب تعديل
              </Button>
            )}
          </div>
        )}
      </PersonModal>

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
