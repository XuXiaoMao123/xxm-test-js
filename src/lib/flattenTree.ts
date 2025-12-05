/**
 * 树节点类型定义。
 *
 * @template T 泛型类型，表示树节点对象的类型，要求是键值对对象。
 */
type TreeNode<T extends Record<string, any>> = T & {
  /**
   * 可选的子节点数组，每个元素都是一个 `TreeNode<T>` 类型的对象。
   */
  children?: Array<TreeNode<T>>;
};

/**
 * 扁平化树形结构时使用的选项配置接口。
 *
 * @template T 泛型类型，表示树节点对象的类型，要求是键值对对象。
 */
interface FlattenTreeOptions<T extends Record<string, any>> {
  /**
   * 节点 ID 的键名，默认为 'id'。
   */
  idKey?: keyof T;

  /**
   * 父节点 ID 的键名，默认为 'parentId'。
   */
  parentIdKey?: keyof T;

  /**
   * 子节点数组的键名，默认为 'children'。
   */
  childrenKey?: keyof T;

  /**
   * 用于过滤哪些节点应该被包含在结果中的函数。
   */
  filter?: (node: T) => boolean;
}

/**
 * 将树形结构的数据扁平化为数组。
 *
 * @template T 泛型类型，表示树节点对象的类型，要求是键值对对象。
 *
 * @param {Array<TreeNode<T>> | TreeNode<T>} tree - 树的根节点或树节点数组。
 * @param {FlattenTreeOptions<T>} [options={}] - 配置项，包括节点ID、父节点ID、子节点数组的键名及过滤条件。
 *
 * @returns {Array<Omit<TreeNode<T>, keyof T>>} 扁平化后的数组，每个元素都是原始树中的一个节点，但不包含子节点属性。
 *
 * @example
 * ```typescript
 * // 示例用法
 * interface DataItem {
 *   id: number;
 *   name: string;
 *   parentId?: number | null;
 * }
 *
 * const treeData = [
 *   {
 *     id: 1,
 *     name: 'Root',
 *     parentId: null,
 *     children: [
 *       {
 *         id: 2,
 *         name: 'Child 1',
 *         parentId: 1,
 *         children: [
 *           { id: 4, name: 'Grandchild 1', parentId: 2 },
 *           { id: 5, name: 'Grandchild 2', parentId: 2 }
 *         ]
 *       },
 *       { id: 3, name: 'Child 2', parentId: 1 }
 *     ]
 *   },
 *   { id: 6, name: 'Another Root', parentId: null }
 * ];
 *
 * const flatData = flattenTree(treeData, {
 *   idKey: 'id',
 *   parentIdKey: 'parentId',
 *   childrenKey: 'children'
 * });
 *
 * console.log(JSON.stringify(flatData, null, 2));
 * ```
 */
export function flattenTree<T extends Record<string, any>>(
  tree: Array<TreeNode<T>> | TreeNode<T>,
  options: FlattenTreeOptions<T> = {}
): Array<Omit<TreeNode<T>, keyof T>> {
  // Prefix with _ to indicate these are intentionally unused
  const { idKey: _idKey = 'id', parentIdKey: _parentIdKey = 'parentId', childrenKey = 'children', filter } = options;
  const result: Array<Omit<TreeNode<T>, keyof T>> = [];
  const stack: Array<TreeNode<T>> = Array.isArray(tree) ? [...tree] : [tree];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (!filter || filter(node)) {
      // 使用解构赋值排除 childrenKey
      const { [childrenKey as string]: _, ...rest } = node;
      result.push(rest as Omit<TreeNode<T>, typeof childrenKey>);

      if (node[childrenKey] && Array.isArray(node[childrenKey])) {
        for (let i = node[childrenKey].length - 1; i >= 0; i--) {
          stack.push(node[childrenKey][i]);
        }
      }
    }
  }

  return result;
}
