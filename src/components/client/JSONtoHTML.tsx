import { JSX } from "react";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";

export default function JSONtoHTML({members, families, data}: {members: PersonWithRelations[], families: FamilyWithRootPerson[] | undefined, data: any}): JSX.Element {
  if (data === null || data === undefined) return <span>{String(data)}</span>;

  if (!families) return <div>Something went wrong!</div>
  if (typeof data === "object") {
    return (
      <ul className="ml-4 text-sm space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong> 
            {(() => {
              if (key.includes("familyId")) 
                return <div>
                  {families.find((m) => m.id === String(value))?.name}
                </div>
              else if (key.endsWith("Id"))
                return <div>
                  {members.find((m) => m.id === String(value))?.fullName}
                </div>
              else return <div>
                {String(value)}
              </div>
            })()}
          </li>
        ))}
      </ul>
    );
  }

  return <span>{String(data)}</span>
}
