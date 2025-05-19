import { getAllPersons } from "@/lib/person";
import { Person } from "../../types/family";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { FamilyTableClient } from "./FamilyTableClient";
import { getFamilyTreeData } from "../../components/server/fetchFamilyTreeData";

async function getData(): Promise<Person[]> {
  const allPersons = await getAllPersons();
  let personsList: Person[] = [];
  allPersons.forEach((person) => {
    let personFormatted: Person = {
      id: `${person.id}`,
      name: person.firstName,
      familyName: person.familyName,
      gender: person.gender,
      childrenIds: [],
      spouses: person.spouseConnections.map((p) => `${p.spouseId}`),
    };
    if (person.gender === "MALE")
      personFormatted.childrenIds = person.fatherChildren.map((p) => `${p.id}`);
    if (person.gender === "FEMALE")
      personFormatted.childrenIds = person.motherChildren.map((p) => `${p.id}`);

    personsList.push(personFormatted);
  });
  return personsList;
}

export default async function DemoPage() {
  const data = await getFamilyTreeData();

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient data={data} />
    </div>
  );
}
