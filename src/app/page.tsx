import PersonCard from "@/components/ui/PersonCard";
import FamilyTreeView from "@/components/client/FamilyTreeView";
import PersonEditor from "@/components/ui/PersonEditor";
import { FamilyTreeData, Person } from "@/types/family";
import ThemeToggle from "@/theme/theme-toggle";
import CreatePersonForm from "@/components/client/AddChildForm";
import PersonList from "../components/client/PersonList";
import { getFamilyTreeData } from "../components/server/fetchFamilyTreeData";
import { Modal } from "../components/client/Modal";

export default async function Home() {
  const familyData = await getFamilyTreeData();

  return (
    <div className="relative w-full h-screen bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]">
      <ThemeToggle />
      <FamilyTreeView data={familyData} />
    </div>
  );
}
