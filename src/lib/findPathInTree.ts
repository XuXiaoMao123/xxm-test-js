/**
 * 查找树形数据中从根节点到目标节点的完整路径，未找到则返回空数组
 *
 * @template T 泛型类型，表示节点对象的类型
 * @param {TreeNode<T>} tree - 树形数据
 * @param {T[keyof T]} target - 目标值
 * @param {keyof T} [matchKey='id'] - 用于匹配的节点属性名，默认为 'id'
 * @param {keyof T} [childrenKey='children'] - 子节点的键名
 * @returns {TreeNode<T>[]} - 从根节点到目标节点的完整路径，未找到则返回空数组
 *
 * @example
 * ```typescript
 * // 示例使用
 * interface DataItem {
 *   id: number;
 *   name: string;
 *   children?: DataItem[];
 * }
 *
 * const tree: DataItem = {
 *   id: 1,
 *   name: 'Root',
 *   children: [
 *     {
 *       id: 2,
 *       name: 'Child 1',
 *       children: [
 *         { id: 4, name: 'Grandchild 1' }
 *       ]
 *     },
 *     {
 *       id: 3,
 *       name: 'Child 2'
 *     }
 *   ]
 * };
 *
 * const path = findPathInTree(tree, 4); // 未传入 matchKey，默认使用 'id' 匹配
 * console.log('路径为：', path);
 * ```
 */
export function findPathInTree<T extends Record<string, any>>(
  tree: TreeNode<T>,
  target: T[keyof T],
  matchKey: keyof T = 'id' as keyof T,
  childrenKey: keyof T = 'children' as keyof T
): TreeNode<T>[] {
  const path: TreeNode<T>[] = [];

  // 深度优先搜索函数
  function dfs(node: TreeNode<T>): boolean {
    path.push(node);
    // 通过指定的属性名来判断当前节点是否匹配目标值
    if (node[matchKey] === target) {
      return true;
    }
    // 如果当前节点有子节点
    if (node[childrenKey]) {
      // 遍历子节点
      for (const child of node[childrenKey] as TreeNode<T>[]) {
        // 如果在子节点中找到目标节点，返回 true
        if (dfs(child)) {
          return true;
        }
      }
    }
    // 如果在当前节点及其子节点中未找到目标节点，将当前节点从路径中移除
    path.pop();
    return false;
  }

  // 从根节点开始深度优先搜索
  dfs(tree);
  return path;
}

//TreeNode 类型定义
type TreeNode<T extends Record<string, any>> = T & {
  children?: Array<TreeNode<T>>;
};
