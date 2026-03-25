import { Family } from "@/generated/prisma";
import { TreeNode } from "@/types/tree";

export const collectPersonIds = (node: TreeNode): string[] => {
  const ids: string[] = [];
  const traverse = (n: TreeNode) => {
    if (n.attributes?.id) ids.push(n.attributes.id as string);
    n.children.forEach(traverse);
  };
  traverse(node);
  return ids;
};

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
  const memberMap = new Map(members.map(p => [p.id, p]));
  const addedMembers = new Set<string>();
  const collapsedSet = new Set(collapsedPersonIds);

  const build = (id: string, prevNodeGender?: string): TreeNode | undefined => {
    const person = memberMap.get(id);
    if (!person) return undefined;

    // Already placed in the tree through another path — skip
    if (addedMembers.has(person.id)) return undefined;

    let node: TreeNode | null = null;

    let grandmother: PersonForTree | undefined;
    if (prevNodeGender === "FEMALE")
      grandmother = person.father?.motherId ? memberMap.get(person.father.motherId) : undefined;

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

      addedMembers.add(person.id);
    } else {
      // This path excludes the person — return immediately so their children
      // are not consumed here. They will be reached via their father's branch.
      return undefined;
    }

    if (collapsedSet.has(person.id)) {
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
