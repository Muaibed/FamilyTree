"use client";

import { Person } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMembersContext } from "../client/MembersContextProvider";
import AddChildForm from "./AddChildForm";
import AddSpouseForm from "./AddSpouseForm";
import { Modal } from "../client/Modal";
import DeletePerson from "../client/DeletePerson";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";

const EditPersonForm = ({
  person,
  onEdit,
}: {
  person: Person;
  onEdit: any;
}) => {
  const [firstName, setFirstName] = useState(person.name);
  const [familyName, setFamilyName] = useState(person.family.name);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person.gender);
  const [phone, setPhone] = useState<string | undefined>(person.phone);
  const [birthDate, setBirthDate] = useState<string | undefined>(
    person.birthDate
  );
  const [deathDate, setDeathDate] = useState<string | undefined>(
    person.deathDate
  );
  const [spouses, setSpouses] = useState<string[]>(
    person.spouses.map((s) => s[0])
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMotherOptions] = useState<Option[]>();
  const [selectedFather, setSelectedFather] = useState<Person | undefined>();
  const [selectedMother, setSelectedMother] = useState<Person | undefined>();

  const { members, isLoading, error, mutate } = useMembersContext();

  useEffect(() => {
    const fatherOptions = Object.entries(members.people)
      .filter(([key, person]) => person.gender === "MALE")
      .map(([key, person]) => ({
        id: person.id,
        value: person.name,
      }));

    setFatherOptions(fatherOptions);

    const motherOptions = Object.entries(members.people)
      .filter(([key, person]) => person.gender === "FEMALE")
      .map(([key, person]) => ({
        id: person.id,
        value: person.name,
      }));

    setMotherOptions(motherOptions);
  }, []);

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
          fatherId: selectedFather?.id,
          motherId: selectedMother?.id,
          birthDate,
          deathDate,
        }),
      });

      if (response.ok) {
        toast(`${firstName} has been updated successfully.`);
        onEdit();
      } else {
        const errorData = await response.json();
        toast(`Updating ${firstName} Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOtherSpouses = (spouse: string) => {
    const spousess: string[] = [];
    spouses.forEach(function (s) {
      if (s !== spouse) spousess.push(s);
    });

    return spousess;
  };

  const deleteRelation = async (person1Id: string, person2Id: string) => {
    try {
      const response = await fetch("api/spouseRelationship", {
        method: "DELETE",
        body: JSON.stringify({
          person1Id,
          person2Id,
        }),
      });

      if (response.ok) {
        toast(`Relataion has been deleted successfully.`);
        onEdit();
        mutate;
      } else {
        toast(`Deletetion Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

        {/* <select
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
        </select> */}
        <SearchSelect
          className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          options={fatherOptions ?? []}
          selected={
            selectedFather
              ? { id: selectedFather.id.toString(), value: selectedFather.name }
              : null
          }
          onSelect={(option) => {
            const father = fatherOptions?.find(
              (f) => f.id.toString() === option.id
            );
            if (father) {
              setSelectedFather(members.people[father.id]);
            }
          }}
          placeholder="Select Father"
        />
        {/* <select
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
        </select> */}
        <SearchSelect
          className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          options={motherOptions ?? []}
          selected={
            selectedMother
              ? { id: selectedMother.id.toString(), value: selectedMother.name }
              : null
          }
          onSelect={(option) => {
            const mother = motherOptions?.find(
              (f) => f.id.toString() === option.id
            );
            if (mother) {
              setSelectedMother(members.people[mother.id]);
            }
          }}
          placeholder="Select Father"
        />
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
                <Button
                  type="button"
                  onClick={() => {
                    deleteRelation(person.id, s.toString());
                    setSpouses(getOtherSpouses(s.toString()));
                  }}
                >
                  Remove
                </Button>
              </div>
            );
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
              onEdit();
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
            onAdd={(s: string) => {
              onEdit();
              mutate;
              setIsAddingSpouse(false);
              spouses.push(s);
              setSpouses(spouses);
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
