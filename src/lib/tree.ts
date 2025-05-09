import { FamilyTreeData } from "@/app/types/family";
import { TreeNode } from "@/app/types/tree";

export const prepareTreeData = (
  data: FamilyTreeData,
  startId: string
): TreeNode | null => {
  const person = data.people[startId];
  if (!person) return null;

  const node: TreeNode = {
    name: person.name,
    attributes: {
      id: person.id,
      gender: person.gender,
    },
    children: [],
  };

  if (person.childrenIds.length > 0) {
    person.childrenIds.forEach((childId) => {
      const childNode = prepareTreeData(data, childId);
      if (childNode) {
        node.children.push(childNode);
      }
    });
  }

  return node;
};