# 将树形结构数据扁平化为数组（Flatten Tree Structure to Array）

## 概述

`flattenTree` 函数用于将树形结构的数据扁平化为数组。该函数接受一个树的根节点或树节点数组，以及配置选项，返回一个扁平化后的数组。它通过递归遍历树形结构，提取每个节点并构建一个新的数组。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 将树形结构的数据扁平化为数组。
 *
 * @template T 泛型类型，表示树节点对象的类型，要求是键值对对象。
 * @param {Array<TreeNode<T>> | TreeNode<T>} tree - 树的根节点或树节点数组。
 * @param {FlattenTreeOptions<T>} [options={}] - 配置项，包括节点ID、父节点ID、子节点数组的键名及过滤条件。
 * @returns {Array<Omit<TreeNode<T>, keyof T>>} 扁平化后的数组，每个元素都是原始树中的一个节点，但不包含子节点属性。
 *
 */
export function flattenTree<T extends Record<string, any>>(
  tree: Array<TreeNode<T>> | TreeNode<T>,
  options: FlattenTreeOptions<T> = {}
): Array<Omit<TreeNode<T>, keyof T>>;
```

## 参数

- `tree`: 类型为 `Array<TreeNode<T>> | TreeNode<T>`，树的根节点或树节点数组。
- `options`: 类型为 `FlattenTreeOptions<T>`，包含扁平化所需的配置选项。

## 返回值

- 返回一个 `Array<Omit<TreeNode<T>, keyof T>>` 对象，表示扁平化后的数组，每个元素都是原始树中的一个节点，但不包含子节点属性。

## FlattenTreeOptions 接口

```typescript
interface FlattenTreeOptions<T extends Record<string, any>> {
  idKey?: keyof T; // 节点唯一标识符的键名，默认为 'id'。
  parentIdKey?: keyof T; // 父节点标识符的键名，默认为 'parentId'。
  childrenKey?: keyof T; // 子节点数组的键名，默认为 'children'。
  filter?: (node: T) => boolean; // 用于过滤哪些节点应该被包含在结果中的函数。
}
```

## TreeNode 类型定义

```typescript
type TreeNode<T extends Record<string, any>> = T & {
  children?: Array<TreeNode<T>>;
};
```

## 示例用法

```typescript
// 假设我们有以下树形数据结构：
const treeData: Array<TreeNode<DataItem>> = [
  {
    id: 1,
    name: 'Root',
    parentId: null,
    children: [
      {
        id: 2,
        name: 'Child 1',
        parentId: 1,
        children: [
          { id: 4, name: 'Grandchild 1', parentId: 2 },
          { id: 5, name: 'Grandchild 2', parentId: 2 },
        ],
      },
      { id: 3, name: 'Child 2', parentId: 1 },
    ],
  },
  { id: 6, name: 'Another Root', parentId: null },
];

// 使用 flattenTree 函数将树形数据扁平化
const flatData = flattenTree(treeData, {
  idKey: 'id',
  parentIdKey: 'parentId',
  childrenKey: 'children',
});

console.log(JSON.stringify(flatData, null, 2));
```

## 适用场景

- 层级数据展示：在需要将层级数据以树形结构展示的场景，如组织架构、分类目录等。
- 数据转换：在数据处理过程中，需要将数据库中的树形数据转换为扁平数据以便于进一步处理。

## 总结

- `flattenTree` 提供了一种灵活的方法来将树形数据转换为扁平结构，支持自定义节点标识符和父节点标识符，使其适用于各种不同的数据结构和需求。

## 引入

要在使用的项目中使用 `flattenTree` 函数，您可以单独引入：

```js
import { flattenTree } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
