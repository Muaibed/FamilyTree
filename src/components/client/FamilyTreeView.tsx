// components/FamilyTreeView.tsx
"use client";

import React, { useState, useEffect } from "react";
import useSWR, { SWRResponse } from 'swr';
import Tree, {
  CustomNodeElementProps,
  RenderCustomNodeElementFn,
} from "react-d3-tree";
import { Family, FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner"
import { Modal, PersonModal } from "@/components/client/Modal";
import AddChildForm from "@/components/client/AddChildForm";
import AddSpouseForm from "./AddSpouseForm";
import CreatePersonForm from "./CreatePersonForm";
import { deletePerson, getAncestors } from "@/lib/person";
import { TreeNode } from "@/types/tree";
import { prepareTreeData } from "@/lib/tree";
import DeletePerson from "./DeletePerson";
import isValidDateString from "@/lib/date";
import ThemeToggle from "@/theme/theme-toggle";
import SearchSelect from "./SearchSelect";
import { Option } from "@/types/ui" 
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

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

export default function FamilyTreeView({ data, family, onChange } : { data : FamilyTreeData, family:Family, onChange : any }) {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [isCreatingPerson, setIsCreatingPerson] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | undefined>(family);
  const [familyOptions, setFamilyOptions] = useState<Option[]>();

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data:families } = useSWR<Family[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);
  
  useEffect(() => { 
    if (families) {
      const options = families.map((f) => ({
      id: f.id.toString(),
      value: f.name,
    }));

    setFamilyOptions(options)
    }

    if (data && selectedFamily) {
      const formattedData = prepareTreeData(data, selectedFamily.rootPersonId.toString());
      setTreeData(formattedData);
    }
  }, [data, family, families, selectedFamily]);

  if (!treeData) return <div>Loading tree...</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="flex gap-4">
      </div>
      <div className="flex flex-row">
      <div>
        <SearchSelect
          options={familyOptions ?? []}
          selected={selectedFamily ? { id: selectedFamily.id.toString(), value: selectedFamily.name } : null}
          onSelect={(option) => {
            const family = families?.find((f) => f.id.toString() === option.id);
            setSelectedFamily(family || undefined);
          }}
          placeholder="Select family..."
        />
      </div>
      { isAdmin &&
      <button
        className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
        onClick={() => {
          setIsCreatingPerson(true)
        }}
      >
        Create Person
      </button>
      }
      </div>
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePersonForm members={data} onCreate={onChange} />
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
              setSelectedPerson(data.people[personId])
            }
            setDetailModalOpen(true);
          }}
        />
      </div>

      <PersonModal
        isOpen={!!selectedPerson}
        onClose={() => {
          setSelectedPerson(null);
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
            {selectedPerson.birthDate && isValidDateString(selectedPerson.birthDate) && (
              <p>Birth Date: {selectedPerson.birthDate}</p>
            )}
            <p>Spouses: {data.people[selectedPerson.id].spouses.map((s) => 
              s[1] ? 
              data.people[s[0]].name + " " + data.people[s[0]].familyName 
              : "")
              }
            </p>
            {selectedPerson.deathDate && isValidDateString(selectedPerson.deathDate) && (
              <p>Death Date: {selectedPerson.deathDate}</p>
            )}

            {isAdmin && ( 
              <div>
                <div>
                <button
                  className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                  onClick={() => setIsAddingChild(!isAddingChild)}
                >
                  ADD Child
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
                  onClick={() => setIsAddingSpouse(!isAddingSpouse)}
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
                    members={data}
                    onAdd={() => {
                      onChange();
                      setDetailModalOpen(false)
                      setIsAddingChild(false);
                      setSelectedPerson(null)
                    }}
                  />
                </div>
              )}
              {isAddingSpouse && (
                <div>
                  <AddSpouseForm 
                    personId={selectedPerson.id} 
                    members={data} 
                    onAdd={() => {
                      onChange();
                      setDetailModalOpen(false)
                      setIsAddingSpouse(false);
                      setSelectedPerson(null)
                    }} 
                  />
                </div>
              )}          
              </div>
            )}
            { !isAdmin && (
                <Button
                  className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
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
          setSelectedPerson(null);
        }}
      >
        {selectedPerson && isDeleting && (
          <DeletePerson 
            person={selectedPerson} 
            onSubmit={() => {
                onChange();
                setDetailModalOpen(false);
                setIsDeleting(false);
                setSelectedPerson(null);
                setDeleteModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
