# 将对象数组按指定规则排序（Custom Array Sorting）

## 概述

`customSortMethod` 函数用于对给定的数组按照一系列自定义规则进行排序。该函数支持多级排序，允许为每个排序级别指定排序字段以及升序或降序的排序顺序。它在处理需要精确控制数组排序方式的复杂数据结构时非常有用，例如在表格数据的排序、数据统计分析中的数据预处理等场景。同时，该函数会对输入的 `tableData` 进行全面检查，考虑了 `tableData` 为 `null` 或空数组的情况，增强了函数的健壮性。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 按照指定的排序规则对对象数组进行多级排序。
 *
 * @template T 数组元素的类型，需为对象类型，以便根据对象属性进行排序。
 * @param {T[] | null} tableData - 要排序的数组，数组中的每个元素应为对象，也可能为 null。
 * @param {Array<{ field: string; order?: 'asc' | 'desc' }>} sortConfigs - 排序规则数组，每个元素包含排序字段和可选的排序顺序（默认为升序）。
 * @returns {T[]} 排序后的数组。
 */
export function customSortMethod<T extends object>(
  tableData: T[] | null,
  sortConfigs: Array<{ field: string; order?: 'asc' | 'desc' }>
): T[];
```

## 参数

- `tableData`: 要进行排序的数组，数组中的每个元素都必须是对象，因为排序是基于对象的属性进行的。函数会检查该参数是否为数组，以及数组中的元素是否为对象，如果不符合要求，会抛出 `TypeError` 异常。
- `sortConfigs`: 一个包含排序规则的数组。数组中的每个元素是一个对象，该对象具有 `field` 属性，表示用于排序的对象属性名称；`order` 属性是可选的，取值为 `asc`（升序）或 `desc`（降序），默认为 `asc`。

## 返回值

- 返回一个与 `tableData` 同类型的数组，该数组中的元素按照 `sortConfigs` 中指定的规则进行了排序。

## 示例用法

```js
// 使用示例
const tableData = [
  { name: 'Alice', age: 25, score: 80 },
  { name: 'Bob', age: 20, score: 90 },
  { name: 'Alice', age: 22, score: 85 },
];

const sortConfigs = [
  { field: 'name', order: 'asc' },
  { field: 'age', order: 'desc' },
  { field: 'score', order: 'asc' },
];

try {
  const sortedData = customSortMethod(tableData, sortConfigs);
  // 结果: 首先按name升序，name相同按age降序，age相同按score升序排序后的数组
} catch (error) {
  console.error(error);
}
```

## 适用场景

- 表格数据排序：在前端开发中，当需要对表格中的数据进行灵活排序时，可根据用户选择的列和排序方向动态生成 sortConfigs，然后使用 customSortMethod 对数据进行排序，以实现实时的表格排序功能。
- 数据统计分析：在处理大量数据时，可能需要先按某一维度（如时间）进行排序，然后在同一时间分组内再按其他指标（如销售额）进行排序，以便更好地分析数据趋势和规律。
- 游戏开发：在游戏中，对角色列表进行排序，比如先按角色等级降序排列，等级相同的再按经验值升序排列，以确定角色在排行榜中的顺序。

## 总结

- `customSortMethod` 是一个功能强大且灵活的工具，它为开发者提供了对数组进行多级、自定义排序的能力。通过清晰定义排序规则，开发者可以轻松地按照业务需求对复杂数据结构进行排序，提高数据处理的效率和准确性。同时，函数对输入数据的全面检查，包括对 `null` 和空数组情况的处理，进一步增强了其健壮性，无论是在简单的数据展示场景还是复杂的数据分析任务中，该函数都能发挥重要作用。

## 引入

要在使用的项目中使用 `customSortMethod` 函数，您可以单独引入：

```js
import { customSortMethod } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。如果您发现文档或函数实现有任何错误、不足，欢迎提交反馈或贡献代码以改进它。
