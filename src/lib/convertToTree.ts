/**
 * 将扁平数据结构转换为树形结构。
 *
 * @template T 泛型类型，表示节点对象的类型。
 *
 * @param {T[]} flatData - 扁平数据数组。
 * @param {TreeOptions<T>} options - 树形结构的配置选项。
 * @returns {Array<TreeNode<T>>} 转换后的树形结构数组。
 *
 * @throws {Error} 如果存在重复 ID 或找不到父节点时抛出错误。
 *
 * @example
 * ```typescript
 * // 假设我们有以下扁平数据结构：
 * interface DataItem {
 *   id: number;
 *   name: string;
 *   parentId?: number | null;
 * }
 *
 * const flatData: DataItem[] = [
 *   { id: 1, name: 'Root', parentId: null },
 *   { id: 2, name: 'Child 1', parentId: 1 },
 *   { id: 3, name: 'Child 2', parentId: 1 },
 *   { id: 4, name: 'Grandchild 1', parentId: 2 },
 *   { id: 5, name: 'Grandchild 2', parentId: 2 },
 *   { id: 6, name: 'Another Root', parentId: null }
 * ];
 *
 * const options: TreeOptions<DataItem> = {
 *   idKey: 'id',
 *   parentIdKey: 'parentId',
 *   rootId: null,
 * };
 *
 * // 使用 convertToTree 函数将扁平数据转换为树形结构
 * const treeData = convertToTree(flatData, options);
 * console.log(JSON.stringify(treeData, null, 2));
 * ```
 */
export function convertToTree<T extends Record<string, any>>(
  flatData: T[],
  options: TreeOptions<T>
): Array<TreeNode<T>> {
  const { idKey, parentIdKey, rootId } = options;
  const map = new Map<any, TreeNode<T>>();
  const tree: Array<TreeNode<T>> = [];

  // 检查是否有重复ID
  flatData.forEach((item) => {
    if (map.has(item[idKey])) {
      throw new Error(`Duplicate ID found: ${item[idKey]}`);
    }
    const node: TreeNode<T> = { ...item, children: [] };
    map.set(item[idKey], node);
  });

  // 建立父子关系
  flatData.forEach((item) => {
    const node = map.get(item[idKey]);
    if (item[parentIdKey] === rootId) {
      tree.push(node!); // 根节点直接添加到树中
    } else {
      const parent = map.get(item[parentIdKey]);
      if (parent) {
        parent.children?.push(node!); // 添加到父节点的子节点列表
      } else {
        console.warn(`Parent not found for item with ID: ${item[idKey]}`);
      }
    }
  });

  return tree;
}

// TreeNode 和 TreeOptions 类型定义
type TreeNode<T extends Record<string, any>> = T & {
  children?: Array<TreeNode<T>>;
};

interface TreeOptions<T extends Record<string, any>> {
  idKey: keyof T;
  parentIdKey: keyof T;
  rootId: T[keyof T];
}
