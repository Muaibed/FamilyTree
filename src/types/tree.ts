export interface TreeNodeAttributes {
  id: string;
  gender: string;
  isDead: boolean;
  fullName: string;
  kunya: string | null;
  deathDate: string | null; // ISO date string (YYYY-MM-DD)
  spouses: string[];        // active spouse fullNames
}

export interface TreeNode {
  name: string;
  attributes?: TreeNodeAttributes;
  children: TreeNode[];
}
