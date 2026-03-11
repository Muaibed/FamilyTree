import { Family } from "@/generated/prisma";
import { TreeNode } from "@/types/tree";

export type PersonForTree = {
  id: string;
  firstName: string;
  fullName: string;
  gender: 'MALE' | 'FEMALE';
  isDead: boolean;
  familyId: string;
  family: Family;
  kunya: string | null;
  deathDate: Date | null;
  father: { motherId: string | null; familyId: string } | null;
  fatherChildren: { id: string }[];
  motherChildren: { id: string }[];
  maleSpouses: { female: { fullName: string } }[];
  femaleSpouses: { male: { fullName: string } }[];
};

export const prepareTreeData = (
  members: PersonForTree[],
  startId: string,
  familyId: string,
  collapsedPersonIds: string[] = [],
): TreeNode | undefined => {
  const addedMembers: string[] = [];

  const build = (id: string, prevNodeGender?: string): TreeNode | undefined => {
    const person = members.find(p => p.id === id);
    if (!person) return undefined;

    // Already placed in the tree through another path — skip
    if (addedMembers.includes(person.id)) return undefined;

    let node: TreeNode | null = null;

    let grandmother: PersonForTree | undefined;
    if (prevNodeGender === "FEMALE")
      grandmother = members.find(p => p.id === person.father?.motherId);

    if (
      !prevNodeGender ||
      (prevNodeGender === "FEMALE" &&
        person.father?.familyId !== familyId &&
        grandmother?.familyId !== familyId) ||
      prevNodeGender === "MALE"
    ) {
      const spouses = person.gender === 'MALE'
        ? person.maleSpouses.map(s => s.female.fullName)
        : person.femaleSpouses.map(s => s.male.fullName);

      node = {
        name: person.firstName,
        attributes: {
          id: person.id,
          gender: person.gender,
          isDead: person.isDead,
          fullName: person.fullName,
          familyName: person.family.name,
          kunya: person.kunya,
          deathDate: person.deathDate
            ? person.deathDate.toISOString().slice(0, 10)
            : null,
          spouses,
        },
        children: [],
      };

      // Only mark as added when the node is actually created.
      // If excluded by the filter this traversal, the person must remain
      // available for a later male-path traversal to pick them up correctly.
      addedMembers.push(person.id);
    } else {
      // This path excludes the person — return immediately so their children
      // are not consumed here. They will be reached via their father's branch.
      return undefined;
    }

    if (collapsedPersonIds.includes(person.id)) {
      return node;
    }

    if (person.gender === "MALE") {
      person.fatherChildren.forEach((child) => {
        const childNode = build(child.id, person.gender);
        if (childNode) node!.children.push(childNode);
      });
    }

    if (person.gender === "FEMALE") {
      person.motherChildren.forEach((child) => {
        const childNode = build(child.id, person.gender);
        if (childNode) node!.children.push(childNode);
      });
    }

    return node;
  };

  return build(startId);
};
