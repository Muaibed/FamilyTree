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
import { Family } from "@/generated/prisma";

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
        y="-22"
        className={`${
          gender == "MALE" ? "fill-[#60B5FF]" : "fill-[#EC7FA9]"
        } stroke-none`}
        rx="10"
        ry="10"
      />
      <rect
        width="120"
        height="40"
        x="-60"
        y="-20"
        className="fill-white dark:fill-[#e6eafc] dark:stroke-none stroke-none"
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  }, [members, family, families, selectedFamily]);

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
      <div className="flex flex-row">
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
              <h2 className="text-xl font-bold">{selectedPerson.firstName}</h2>
              <p className="text-sm opacity-50">
                {selectedPerson.fullName}
              </p>
            </div>
            <p>id: {selectedPerson.id}</p>
            <p>Gender: {selectedPerson.gender}</p>
            {selectedPerson.birthDate && (
                <p>Birth Date: {selectedPerson.birthDate.toISOString()}</p>
              )}
            <p>
              Spouses: {" "}
              {selectedPerson.gender === "FEMALE" ? selectedPerson.femaleSpouses.map((s) =>
                s.male.fullName) : selectedPerson.maleSpouses.map((s) => s.female.fullName)}
            </p>
            {selectedPerson.deathDate && (
                <p>Death Date: {selectedPerson.deathDate.toISOString()}</p>
              )}

            {isAdmin && (
              <div>
                <div>
                  <button
                    className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                    onClick={() => {
                      setIsAddingChild(!isAddingChild);
                      setIsAddingSpouse(false);
                    }}
                  >
                    ADD Child
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                    onClick={() => {
                      setIsAddingSpouse(!isAddingSpouse);
                      setIsAddingChild(false);
                    }}
                  >
                    ADD Spuose
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                    onClick={() => setIsDeleting(!isDeleting)}
                  >
                    DELETE
                  </button>
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
                className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                onClick={() =>
                  (window.location.href = `/changeRequestForm?personId=${selectedPerson.id}`)
                }
              >
                Request Edit
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
          setDeleteModalOpen(false);
          setSelectedPerson(undefined);
        }}
      >
        {selectedPerson && isDeleting && (
          <DeletePerson
            person={selectedPerson}
            onSubmit={() => {
              onChange();
              setDetailModalOpen(false);
              setIsDeleting(false);
              setSelectedPerson(undefined);
              setDeleteModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
