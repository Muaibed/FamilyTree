"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddChildForm from "./AddChildForm";
import AddSpouseForm from "./AddSpouseForm";
import { Modal } from "../client/Modal";
import DeletePerson from "../client/DeletePerson";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { Family, Person } from "@/generated/prisma";
import DatePicker from "../ui/datePicker";
import { Input } from "../ui/input";
import SelectGender from "../preDefinedData/SelectGender";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import SelectFamily from "../preDefinedData/SelectFamily";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { ScrollArea } from "../ui/scroll-area";
import TrueFalseSelect from "../preDefinedData/BooleanSelect";
import { qstash } from "@/lib/qstash";

const EditPersonForm = ({
  person,
  onEdit,
}: {
  person: PersonWithRelations;
  onEdit: any;
}) => {
  const [firstName, setFirstName] = useState(person.firstName);
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(person.family);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person.gender);
  const [phone, setPhone] = useState<string | undefined>(person.phone ?? "");
  const [isDead, setIsDead] = useState<boolean>(false);
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
  const [selectedFather, setSelectedFather] = useState<Person | undefined>(person.father ?? undefined);
  const [selectedMother, setSelectedMother] = useState<Person | undefined>(person.mother ?? undefined);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: families, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
    fetcher
  );
  
  useEffect(() => {
    setFamily(selectedFather?.familyId ? families?.find((f) => f.id === selectedFather.familyId) : undefined);
  }, [selectedFather]);

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
          family,
          gender,
          phone,
          fatherId: selectedFather?.id,
          motherId: selectedMother?.id,
          birthDate,
          deathDate,
          isDead,
        }),
      });

      
      if (response.ok) {
        toast(`${firstName} has been updated successfully.`);
        onEdit();
        // console.log("person.firstName: " + person.firstName)
        // console.log("firstName: " + firstName)
      } else {
        toast(`Updating ${firstName} Failed.`);
      }
      
      // if (person.firstName !== firstName) {
        // const updateNamesResponse = await qstash.publish({
        //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateFullName/processTask/${person.id}`, 
        //   method: 'POST',
        // });

        // // console.log('updating full names')
        // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateFullName/addTask`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       "task": {
        //         "type": "updateFullName",
        //         "personId": person.id,
        //       }
        //     }),
        // });
  
        // const updateNamesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateFullName/processTask`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })

        // if (updateNamesResponse.ok) {
        //   toast(`${person.firstName}'s descendants full names have been updated successfully!`)
        // } else {
        //   toast(`Updating ${person.firstName}'s descendants full names failed!`)
        // }
      // }

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
      } else {
        toast(`Deletetion Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (familiesLoading) return <div className="flex items-center justify-center w-full h-screen">
    <Loader2 />
  </div>

  if (familiesError) return <ErrorAlert />

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">
          تعديل معلومات فرد
        </h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
      <form onSubmit={handleSubmit} className="space-y-4 m-1">
        <Input type="text" placeholder="الاسم الأول" onChange={(e) => setFirstName(e.target.value)} value={firstName} required dir="rtl"/>
        
        <SelectGender selected={gender} onChange={setGender}/>
        
         <SearchSelectMember
            placeholder="اختر الأب (اختياري)"
            selected={selectedFather}
            onChange={setSelectedFather}
            gender="MALE"
        />

        <SearchSelectMember
            placeholder="اختر الأم (اختياري)"
            selected={selectedMother}
            onChange={setSelectedMother}
            gender="FEMALE"
        />

        <SelectFamily selected={family} onChange={setFamily}/>
    
        <TrueFalseSelect
          placeholder="متوفى"
          selected={isDead}
          onChange={(strBool: string) => {
            strBool === "true" ? setIsDead(true) : setIsDead(false);
          }}
        />

        <DatePicker placeholder="تاريخ الميلاد (اختياري)" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="تاريخ الوفاة (اختياري)" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>

        <div>
          {spouses?.map((s) => {
            return (<div className="mb-1" key={s.id}>
              <div className="flex flex-col-2 items-center justify-between">
                <p>{s.fullName + ""}</p>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    person.gender === "MALE" ? deleteRelation(person.id, s.id) : deleteRelation(s.id, person.id)
                    setSpouses(spouses => spouses?.filter(s => person.id !== s.id));
                  }}
                >
                  حذف
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
            variant="secondary"
            onClick={() => setIsAddingChild(true)}
          >
            إضافة ابن
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsAddingSpouse(true)}
          >
            إضافة زوج
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsDeleting(true)}
          >
            حذف
          </Button>
        <Button
          type="submit"
        >
          تأكيد
        </Button>
        </div>
      </div>

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
            onAdd={(s: PersonWithRelations) => {
              onEdit();
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
      </ScrollArea>
    </div>
  );
};

export default EditPersonForm;
