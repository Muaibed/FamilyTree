export interface TreeNode {
    name: string;
    attributes?: Record<string, string | number | boolean>;
    children: TreeNode[];
  }