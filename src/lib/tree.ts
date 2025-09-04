import { PersonWithRelations } from "@/types/family";
import { TreeNode } from "@/types/tree";

export const prepareTreeData = (
  members: PersonWithRelations[],
  startId: string,
  familyId: string,
): TreeNode | undefined => {
  const person = members.find(p => p.id === startId);
;
  if (!person) return undefined;

  const node: TreeNode = {
        name: person.firstName,
        attributes: {
          id: person.id,
          gender: person.gender,
        },
        children: [],
      };

  if (person.gender === "MALE" && person.fatherChildren.length > 0) {
    person.fatherChildren.forEach((childId) => {
      const childNode = prepareTreeData(members, childId.id, familyId);
      if (node && childNode) {
        node.children.push(childNode);
      }
    });
  }

  if (person.gender === "FEMALE" && person.motherChildren.length > 0) {
    if (person.father?.familyId !== familyId) {
      person.motherChildren.forEach((childId) => {
        const childNode = prepareTreeData(members, childId.id, familyId);
        if (node && childNode) {
          node.children.push(childNode);
        }
      });
    }
  }

  return node;
};