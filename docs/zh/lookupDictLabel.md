# 数据字典回显（Lookup Dictionary Label）

## 概述

`lookupDictLabel` 函数根据提供的值和键名，在数据字典中查找并返回目标键的值（通常是标签）。这个函数特别适用于需要将编码值转换为更具可读性的文本标签的场景，例如在用户界面中显示下拉菜单选择项或处理表单数据时。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 根据提供的值和键名，在数据字典中查找并返回目标键的值（通常是标签）。
 *
 * @template T - 数据字典项的对象类型。
 * @template K - 数据字典项对象中的键类型，用于匹配和提取值。
 * @param {T[]} dict - 数据字典数组，每个对象包含 value 和 label 属性或其他键值对。
 * @param {any} searchValue - 要匹配的值。
 * @param {K} [searchKey='value'] - 用于匹配的键名，默认为 'value'。
 * @param {K} [targetKey='label'] - 找到匹配项后，从中提取其值的键名，默认为 'label'。
 * @returns {T[K] | undefined} - 如果找到匹配项，则返回目标键的值；否则返回 undefined。
 */
export function lookupDictLabel<T extends object, K extends keyof T>(
  dict: T[],
  searchValue: any,
  searchKey: K = 'value' as K,
  targetKey: K = 'label' as K
): T[K] | undefined;
```

## 参数

- `dict`: 数据字典数组，每个对象包含 `value` 和 `label` 属性或其他键值对。
- `searchValue`: 要匹配的值。
- `searchKey`: 用于匹配的键名，默认为 `value`。
- `targetKey`: 找到匹配项后，从中提取其值的键名，默认为 `label`。

## 返回值

- 返回一个由 `targetKey` 指定的目标键的值。如果找到了匹配项，则返回该值；否则返回 `undefined`。

## 示例用法

```js
// 基本用法：从简单的数据字典中查找并显示对应的标签
const categoryDict = [
  { value: 'fruit', label: 'Fruit' },
  { value: 'vegetable', label: 'Vegetable' },
  { value: 'dairy', label: 'Dairy' },
];
const selectedCategoryLabel = lookupDictLabel(categoryDict, 'vegetable');
console.log(selectedCategoryLabel); // 输出: "Vegetable"

// 处理更复杂的数据结构：自定义 `searchKey` 和 `targetKey`
const statusDict = [
  { code: 'active', description: 'Active User' },
  { code: 'inactive', description: 'Inactive User' },
  { code: 'pending', description: 'Pending Verification' },
];
// 根据 'code' 获取 'description'
const statusDescription = lookupDictLabel(statusDict, 'inactive', 'code', 'description');
console.log(statusDescription); // 输出: "Inactive User"
```

## 适用场景

- 数据格式化：当需要将编码值转换为用户界面上友好的文本标签时。
- 表单验证与显示：在处理表单数据时，可能需要根据选中的值显示相应的描述性文本。
- 用户界面：在构建用户界面时，可能需要将编码值转换为更具可读性的文本以提高用户体验。

## 总结

- `lookupDictLabel` 是一个简单而灵活的工具，它允许开发者轻松地将编码值转换为更具可读性的文本标签，并支持自定义键名。这个函数在处理数据字典和用户界面交互时非常有用，特别是在需要将编码值映射为友好标签的场景中。

## 引入

要在使用的项目中使用 `lookupDictLabel` 函数，您可以单独引入：

```js
import { lookupDictLabel } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
