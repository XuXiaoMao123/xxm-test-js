# 将扁平数据结构转换为树形结构（Convert Flat Data to Tree）

## 概述

`convertToTree` 函数用于将扁平的数据结构转换为树形结构。该函数接受一个扁平数据数组和一个配置对象，返回一个树形结构数组。它首先尝试使用提供的配置来识别根节点和子节点，然后构建出完整的树形结构。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
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
 */
export function convertToTree<T extends Record<string, any>>(
  flatData: T[],
  options: TreeOptions<T>
): Array<TreeNode<T>>;
```

## 参数

- `flatData`: 类型为 `T[]`，需要转换的扁平数据数组。
- `options`: 类型为 `TreeOptions<T>`，包含转换所需的配置选项。

## 返回值

- 返回一个 `Array<TreeNode<T>>` 对象，表示转换后的树形结构数组。

## TreeOptions 接口

```typescript
interface TreeOptions<T extends Record<string, any>> {
  idKey: keyof T; // 节点唯一标识符的键名
  parentIdKey: keyof T; // 父节点标识符的键名
  rootId: T[keyof T]; // 根节点的标识符值
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
// 假设我们有以下扁平数据结构：
interface DataItem {
  id: number;
  name: string;
  parentId?: number | null;
}

const flatData: DataItem[] = [
  { id: 1, name: 'Root', parentId: null },
  { id: 2, name: 'Child 1', parentId: 1 },
  { id: 3, name: 'Child 2', parentId: 1 },
  { id: 4, name: 'Grandchild 1', parentId: 2 },
  { id: 5, name: 'Grandchild 2', parentId: 2 },
  { id: 6, name: 'Another Root', parentId: null },
];

const options: TreeOptions<DataItem> = {
  idKey: 'id',
  parentIdKey: 'parentId',
  rootId: null,
};

// 使用 convertToTree 函数将扁平数据转换为树形结构
const treeData = convertToTree(flatData, options);
console.log(JSON.stringify(treeData, null, 2));
```

## 适用场景

- 层级数据展示：在需要将层级数据以树形结构展示的场景，如组织架构、分类目录等。
- 数据转换：在数据处理过程中，需要将数据库中的扁平数据转换为树形结构以便于进一步处理。

## 总结

- `convertToTree` 提供了一种灵活的方法来将扁平数据转换为树形结构，支持自定义节点标识符和父节点标识符，使其适用于各种不同的数据结构和需求。

## 引入

要在使用的项目中使用 `convertToTree` 函数，您可以单独引入：

```js
import { convertToTree } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
