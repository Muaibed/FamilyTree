export interface TreeNodeAttributes {
  id: string;
  gender: string;
  isDead: boolean;
  fullName: string;
  kunya: string | null;
  deathDate: string | null;
  spouses: string[];
  familyName: string;        
}

export interface TreeNode {
  name: string;
  attributes?: TreeNodeAttributes;
  children: TreeNode[];
}
