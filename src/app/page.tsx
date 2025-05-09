import PersonCard from "@/app/components/ui/PersonCard";
import FamilyTreeView from "@/app/components/client/FamilyTreeView";
import PersonEditor from "@/app/components/ui/PersonEditor";
import { FamilyTreeData, Person } from "@/app/types/family";
import ThemeToggle from "@/theme/theme-toggle";
import CreatePersonForm from "@/app/components/client/AddChildForm";
import PersonList from "./components/client/PersonList";
import { getFamilyTreeData } from "./components/server/fetchFamilyTreeData";
import { Modal } from "./components/client/Modal";

// const sampleData: FamilyTreeData = {
//   people: {
//     'person1': {
//       id: 'person1',
//       name: 'عبد المحسن',
//       gender: 'male',
//       parentIds: [],
//       childrenIds: ['person2', 'person3', 'person4']
//     },
//     'person2': {
//       id: 'person2',
//       name: 'أفراح',
//       gender: 'female',
//       parentIds: [],
//       childrenIds: []
//     },
//     'person3': {
//       id: 'person3',
//       name: 'عمار',
//       gender: 'male',
//       parentIds: ['person1'],
//       childrenIds: []
//     },
//     'person4': {
//       id: 'person4',
//       name: 'فريال',
//       gender: 'female',
//       parentIds: ['person1'],
//       childrenIds: []
//     },
//   },
//   rootPersonId: 'person1'
// };

export default async function Home() {
  const familyData = await getFamilyTreeData();

  // const handleSavePerson = (person: Person) => {
  //   setTreeData(prevData => ({
  //     ...prevData,
  //     people: {
  //       ...prevData.people,
  //       [person.id]: person
  //     }
  //   }));
  //   setIsEditing(false);
  //   setIsAdding(false);
  //   setSelectedPersonId(person.id);
  // };

  return (
    <div className="relative w-full h-screen bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]">
      <ThemeToggle />
      <FamilyTreeView data={familyData} />
    </div>
  );
}
