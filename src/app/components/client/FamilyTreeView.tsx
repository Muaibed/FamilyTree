// components/FamilyTreeView.tsx
"use client";

import React, { useState, useEffect } from "react";
import Tree, {
  CustomNodeElementProps,
  RenderCustomNodeElementFn,
} from "react-d3-tree";
import { FamilyTreeData, Person } from "@/app/types/family";
import { Modal, PersonModal } from "@/app/components/client/Modal";
import AddChildForm from "@/app/components/client/AddChildForm";
import { deletePerson } from "@/app/components/server/deletePerson";
import AddSpouseForm from "./AddSpouseForm";
import CreatePersonForm from "./CreatePersonForm";
import { getAncestors } from "@/lib/person";
import { TreeNode } from "@/app/types/tree";
import { prepareTreeData } from "@/lib/tree";

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

export default function FamilyTreeView({ data }: { data: FamilyTreeData }) {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<
    string | number | null
  >(null);
  const [isCreatingPerson, setIsCreatingPerson] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedPerson = selectedPersonId
    ? data.people[selectedPersonId]
    : null;

  useEffect(() => {
    if (data && data.rootPersonId) {
      const formattedData = prepareTreeData(data, data.rootPersonId);
      setTreeData(formattedData);
    }
  }, [data]);

  if (!treeData) return <div>Loading tree...</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <style>
        {/* {`
          .custom-link {
            stroke: var(--stroke-color) !important;
            fill: #3B82F6;
            color: #3B82F6;
            stroke-width: 1;
          }
        `} */}
      </style>
      <button
        className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
        onClick={() => setIsCreatingPerson(true)}
      >
        Create Person
      </button>
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePersonForm members={data} />
      </Modal>
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
              setSelectedPersonId(personId);
            }
            setDetailModalOpen(true);
          }}
        />
      </div>

      <PersonModal
        isOpen={!!selectedPerson}
        onClose={() => {
          setSelectedPersonId(null);
          setDetailModalOpen(false);
          setIsAddingChild(false);
          setIsAddingSpouse(false);
        }}
        gender={selectedPerson?.gender}
      >
        {selectedPerson && (
          <div className="text-center">
            <div>
              <h2 className="text-xl font-bold">{selectedPerson.name}</h2>
              <p className="text-sm opacity-50">
                {getAncestors(data, selectedPerson.id)}
              </p>
            </div>
            <p>id: {selectedPerson.id}</p>
            <p>Gender: {selectedPerson.gender}</p>
            <p>Spouses: {selectedPerson.spouses}</p>
            {selectedPerson.deathDate && (
              <p>Death Date: {selectedPerson.deathDate}</p>
            )}
            <div>
              <button
                className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                onClick={() => setIsAddingChild(true)}
              >
                ADD Child
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                onClick={() => setIsAddingSpouse(true)}
              >
                ADD Spuose
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                onClick={() => setIsDeleting(true)}
              >
                DELETE
              </button>
            </div>
            {isAddingChild && (
              <div>
                <AddChildForm
                  {...(selectedPerson.gender === "MALE"
                    ? { FID: selectedPerson.id }
                    : { MID: selectedPerson.id })}
                  members={data}
                />
              </div>
            )}
            {isAddingSpouse && (
              <div>
                <AddSpouseForm personId={selectedPerson.id} members={data} />
              </div>
            )}
          </div>
        )}
      </PersonModal>

      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
          setDeleteModalOpen(false);
        }}
      >
        {selectedPerson && isDeleting && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">
              Are you sure to delete {selectedPerson.name}?
            </h2>
            <button
              className="bg-rose-700 dark:bg-rose-700 rounded hover:cursor-pointer p-1 pl-4 pr-4"
              onClick={() => {
                deletePerson(selectedPerson.id);
                setIsDeleting(false);
              }}
            >
              CONFIRM
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
