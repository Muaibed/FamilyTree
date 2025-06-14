// src/app/components/EditPersonForm.tsx

"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner"
import { useState } from "react";
import { Button } from "../ui/button";
import { useMembersContext } from "./MembersContextProvider";
import AddChildForm from "./AddChildForm";
import AddSpouseForm from "./AddSpouseForm";
import { Modal } from "./Modal";
import DeletePerson from "./DeletePerson";

const EditPersonForm = ({
  person,
  onEdit,
}: {
  person: Person;
  onEdit: any;
}) => {
  const [firstName, setFirstName] = useState(person.name);
  const [familyName, setFamilyName] = useState(person.familyName);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person.gender);
  const [phone, setPhone] = useState<string | undefined>(person.phone)
  const [fatherId, setFatherId] = useState<string | undefined>(person.fatherId);
  const [motherId, setMotherId] = useState<string | undefined>(person.motherId);
  const [birthDate, setBirthDate] = useState<string | undefined>(person.birthDate);
  const [deathDate, setDeathDate] = useState<string | undefined>(person.deathDate);
  const [spouses, setSpouses] = useState<string[]>(person.spouses.map((s) => s[0]))
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<'success' | 'error' | null>(null);

  const { members, isLoading, error, mutate } = useMembersContext();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`api/person/${person.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          familyName,
          gender,
          phone,
          fatherId,
          motherId,
          birthDate,
          deathDate
        }),
      });
  
      if (response.ok) {
        toast(`${firstName} has been updated successfully.`)
        onEdit();
      } else {
        const errorData = await response.json();
        toast(`Updating ${firstName} Failed.`)
      }
    } catch (error) {
      console.error(error)
    }  
  }

  const getOtherSpouses = (spouse:string) => {
    const spousess : string[] = []
    spouses.forEach(function (s) {
      if (s !== spouse)
          spousess.push(s)
    })

      return spousess;
  }

  const deleteRelation = async (person1Id: string, person2Id: string) => {
    try {
      const response = await fetch('api/spouseRelationship', {
        method: "DELETE",
        body: JSON.stringify({
          person1Id,
          person2Id
        })
      })
  
      if (response.ok) {
        toast(`Relataion has been deleted successfully.`)
        onEdit();
        mutate
      } else {
        toast(`Deletetion Failed.`)
      }
    } catch (error) {
      console.error(error)
    }
  } 

  return (
    
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Edit Person
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <select
          value={fatherId}
          onChange={(e) => setFatherId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Father</option>
          {Object.entries(members.people)
            .filter(([key, person]) => person.gender === "MALE")
            .map(([key, person]) => {
              return (
                <option value={person.id} key={person.id}>
                  {person.name} {person.familyName} {person.id}
                </option>
              );
            })}
        </select>
        <select
          value={motherId ?? ""}
          onChange={(e) => setMotherId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Mother (optional)</option>
          {Object.entries(members.people)
            .filter(([key, person]) => person.gender === "FEMALE")
            .map(([key, person]) => {
              return (
                <option value={person.id} key={person.id}>
                  {person.name} {person.familyName} {person.id}
                </option>
              );
            })}
        </select>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Birth Date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
          placeholder="Death Date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-white">
          {spouses.map((s) => {
            return (
            <div className="flex flex-col-2 justify-between" key={s}>
              <p className="alig">{s + ""}</p>
              <Button type="button" onClick={() => {
                deleteRelation(person.id, s.toString())
                setSpouses(getOtherSpouses(s.toString()))
                }}>
                Remove
              </Button>
            </div>
            )
          })}

        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
        >
          Submit
        </button>
      </form>
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
                  </div>
                    <Modal
                      isOpen={!!isAddingChild}
                      onClose={() => {
                        setIsAddingChild(false);
                      }}
                    >
                      <div>
                        <AddChildForm
                          parent={person}
                          members={members}
                          onAdd={() => {
                            onEdit()
                            setIsAddingChild(false);
                          }}
                        />
                      </div>
                      </Modal>
                    
                   <Modal
                      isOpen={!!isAddingSpouse}
                      onClose={() => {
                        setIsAddingSpouse(false);
                      }}
                    >
                      <div>
                        <AddSpouseForm 
                          personId={person.id} 
                          members={members} 
                          onAdd={(s:string) => {
                            onEdit();
                            mutate
                            setIsAddingSpouse(false);
                            spouses.push(s)
                            setSpouses(spouses)
                          }} 
                        />
                      </div>
                    </Modal>
        
              <Modal
                isOpen={!!isDeleting}
                onClose={() => {
                  setIsDeleting(false);
                  setDeleteModalOpen(false);
                }}
              >
                {isDeleting && (
                  <DeletePerson 
                    person={person} 
                    onSubmit={() => {
                        onEdit();
                        setIsDeleting(false);
                        setDeleteModalOpen(false);
                    }}
                  />
                )}
              </Modal>
      </div>
  );
};

export default EditPersonForm;
