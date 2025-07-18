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
  const [spouses, setSpouses] = useState<Person[]>(person.gender === "MALE" ? person.maleSpouses.map((s) => s.female) : person.femaleSpouses.map((s) => s.male));
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

  const deleteRelation = async (maleId: string, femaleId: string) => {
    try {
      const response = await fetch("api/spouseRelationship", {
        method: "DELETE",
        body: JSON.stringify({
          maleId,
          femaleId,
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
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Edit Person
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className={`w-full justify-between px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center`}
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
        <div>
          {spouses?.map((s) => {
            return (<div className="mb-1" key={s.id}>
              <div className="flex flex-col-2 items-center justify-between">
                <p>{s.fullName + ""}</p>
                <Button
                  type="button"
                  onClick={() => {
                    person.gender === "MALE" ? deleteRelation(person.id, s.id) : deleteRelation(s.id, person.id)
                    setSpouses(spouses => spouses?.filter(s => person.id !== s.id));
                  }}
                  className="bg-secondary hover:bg-accent"
                >
                  Remove
                </Button>
              </div>
              <hr className="border-t border-border my-2" />
            </div>
            );
          })}
        </div>
      <div>
        <div className="flex flex-col gap-2 mt-3">
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold rounded-md transition bg-secondary"
            onClick={() => setIsAddingChild(true)}
          >
            ADD Child
          </Button>
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold rounded-md transition bg-secondary"
            onClick={() => setIsAddingSpouse(true)}
          >
            ADD Spuose
          </Button>
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold rounded-md transition bg-secondary"
            onClick={() => setIsDeleting(true)}
          >
            DELETE
          </Button>
        </div>
      </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
        >
          Submit
        </Button>
      </form>
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
