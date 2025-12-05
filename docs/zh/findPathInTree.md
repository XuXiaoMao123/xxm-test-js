# 查找树形数据中从根节点到目标节点的完整路径（Find Path in Tree）

## 概述

`findPathInTree` 函数用于查找树形数据中从根节点到目标节点的完整路径，未找到则返回空数组。该函数接受一个树形数据、一个目标值和可选的匹配键名和子节点键名，返回一个从根节点到目标节点的完整路径数组。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
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
 */
export function findPathInTree<T extends Record<string, any>>(
  tree: TreeNode<T>,
  target: T[keyof T],
  matchKey: keyof T = 'id' as keyof T,
  childrenKey: keyof T = 'children' as keyof T
): TreeNode<T>[];
```

## 参数

- `tree`: 类型为 `TreeNode<T>`，需要查找的树形数据。
- `target`: 类型为 `T[keyof T]`，目标值。
- `matchKey`: 类型为 `keyof T`，可选参数，用于匹配的节点属性名，默认为 'id'。
- `childrenKey`: 类型为 `keyof T`，可选参数，子节点的键名，默认为 'children'。

## 返回值

- 返回一个 `TreeNode<T>[]` 对象，表示从根节点到目标节点的完整路径，未找到则返回空数组。

## TreeNode 类型定义

```typescript
type TreeNode<T extends Record<string, any>> = T & {
  children?: Array<TreeNode<T>>;
};
```

## 示例用法

```typescript
// 示例使用
interface DataItem {
  id: number;
  name: string;
  children?: DataItem[];
}

const tree: DataItem = {
  id: 1,
  name: 'Root',
  children: [
    {
      id: 2,
      name: 'Child 1',
      children: [{ id: 4, name: 'Grandchild 1' }],
    },
    {
      id: 3,
      name: 'Child 2',
    },
  ],
};

const path = findPathInTree(tree, 4); // 未传入 matchKey，默认使用 'id' 匹配
console.log('路径为：', path);
```

## 适用场景

- 树形数据查找：在需要查找树形数据中从根节点到目标节点的完整路径的场景，如文件系统、组织结构等。

## 总结

- `findPathInTree` 提供了一种简单的方法来查找树形数据中从根节点到目标节点的完整路径，支持自定义匹配键名和子节点键名，使其适用于各种不同的数据结构和需求。

## 引入

要在使用的项目中使用 `findPathInTree` 函数，您可以单独引入：

```js
import { findPathInTree } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
