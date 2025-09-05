import { PersonWithRelations } from "@/types/family";
import { TreeNode } from "@/types/tree";

let addedMembers: any[] = [];
export const prepareTreeData = (
  members: PersonWithRelations[],
  startId: string,
  familyId: string,
  prevNodeGender?: string,
): TreeNode | undefined => {
  const person = members.find(p => p.id === startId);
;
  if (!person) return undefined;

  let node: TreeNode | null = null;
  if (!addedMembers.find(id => id === person.id)) {
    let grandmother;
    if (prevNodeGender === "FEMALE")
      grandmother = members.find(p => p.id === person.father?.motherId)

    if (!prevNodeGender || (prevNodeGender === "FEMALE" && person.father?.familyId !== familyId && grandmother?.familyId !== familyId) || prevNodeGender === "MALE") {
      node = {
        name: person.firstName,
        attributes: {
          id: person.id,
          gender: person.gender,
          isDead: person.isDead,
        },
        children: [],
      };
    }
  }

  addedMembers.push({"id" : person.id})

  if (person.gender === "MALE" && person.fatherChildren.length > 0) {
    person.fatherChildren.forEach((childId) => {
      const childNode = prepareTreeData(members, childId.id, familyId, person.gender);
      if (node && childNode) {
        node.children.push(childNode);
      }
    });
  }

  if (person.gender === "FEMALE" && person.motherChildren.length > 0) {
      person.motherChildren.forEach((childId) => {
        const childNode = prepareTreeData(members, childId.id, familyId, person.gender);
        if (node && childNode) {
          node.children.push(childNode);
        }
      });
  }

  if (node)
    return node;
};