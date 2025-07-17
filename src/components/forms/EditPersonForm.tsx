"use client";

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
import { PersonWithRelations } from "@/types/family";
import { Person } from "@/generated/prisma";
import DatePicker from "../ui/datePicker";

const EditPersonForm = ({
  person,
  onEdit,
}: {
  person: PersonWithRelations;
  onEdit: any;
}) => {
  const [firstName, setFirstName] = useState(person.firstName);
  const [familyName, setFamilyName] = useState(person.family.name);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person.gender);
  const [phone, setPhone] = useState<string | undefined>(person.phone ?? "");
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    person.birthDate ? person.birthDate : undefined
  );
  const [deathDate, setDeathDate] = useState<Date | undefined>(
    person.deathDate ? person.deathDate : undefined
  );
  const [spouses, setSpouses] = useState<Person[]>([]);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isAddingSpouse, setIsAddingSpouse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMotherOptions] = useState<Option[]>();
  const [selectedFather, setSelectedFather] = useState<Person | undefined>(person.father ?? undefined);
  const [selectedMother, setSelectedMother] = useState<Person | undefined>(person.mother ?? undefined);

  const { members, isLoading, error, mutate } = useMembersContext();

  useEffect(() => {
    const motherOptions = members
      .filter((member) => member.gender === "FEMALE")
      .map((member) => ({
        id: member.id,
        value: member.fullName,
      }));
    setMotherOptions(motherOptions);

    const fatherOptions = members
      .filter((member) => member.gender === "MALE")
      .map((member) => ({
        id: member.id,
        value: member.fullName,
      }));
    setFatherOptions(fatherOptions);

    if (person.gender === "MALE") {
      const spouses = person.femaleSpouses.map((f) => f.female)
      setSpouses(spouses)
    }
  }, [members]);

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
        toast(`Updating ${firstName} Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
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

        <SearchSelect
          options={fatherOptions ?? []}
          selected={
            selectedFather
              ? {
                  id: selectedFather.id,
                  value: selectedFather.fullName,
                }
              : null
          }
          onSelect={(option) => {
            const father = members.find((m: PersonWithRelations) => m.id === option.id)
            if (father) {
              setSelectedFather(father);
            }
          }}
          placeholder="Select a Father"
        />
        <SearchSelect
          options={motherOptions ?? []}
          selected={
            selectedMother
              ? {
                  id: selectedMother.id,
                  value: selectedMother.fullName,
                }
              : null
          }
          onSelect={(option) => {
            const mother = members.find((m) => m.id === option.id)
            if (mother) {
              setSelectedMother(mother);
            }
          }}
          placeholder="Select a Mother"
        />
        <DatePicker placeholder="Birth Date" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="Death Date" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>
        <div className="text-white">
          {spouses?.map((s) => {
            return (
              <div className="flex flex-col-2 justify-between">
                <p className="alig">{s + ""}</p>
                <Button
                  type="button"
                  onClick={() => {
                    deleteRelation(person.id, s.toString());
                    setSpouses(spouses => spouses?.filter(s => person.id !== s.id));
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
            person={person}
            members={members}
            onAdd={(s: PersonWithRelations) => {
              onEdit();
              mutate;
              setIsAddingSpouse(false);
              setSpouses(spouses => [...spouses, s]);
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
      >
        {isDeleting && (
          <DeletePerson
            person={person}
            onSubmit={() => {
              onEdit();
              setIsDeleting(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default EditPersonForm;
