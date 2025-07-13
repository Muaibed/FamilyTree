import { PersonWithRelations } from "@/types/family";
import { TreeNode } from "@/types/tree";

export const prepareTreeData = (
  members: PersonWithRelations[],
  startId: string
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

  if (person.fatherChildren.length > 0) {
    person.fatherChildren.forEach((childId) => {
      const childNode = prepareTreeData(members, childId.id);
      if (childNode) {
        node.children.push(childNode);
      }
    });
  }

  return node;
};