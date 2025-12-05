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
 *
 * @example
 * ```javascript
 * // 基本用法：从简单的数据字典中查找并显示对应的标签
 * const categoryDict = [
 *   { value: 'fruit', label: 'Fruit' },
 *   { value: 'vegetable', label: 'Vegetable' },
 *   { value: 'dairy', label: 'Dairy' }
 * ];
 * const selectedCategoryLabel = lookupDictLabel(categoryDict, 'vegetable');
 * console.log(selectedCategoryLabel); // 输出: "Vegetable"
 *```
 * @example
 * ```javascript
 * // 处理更复杂的数据结构：自定义 `searchKey` 和 `targetKey`
 * const statusDict = [
 *   { code: 'active', description: 'Active User' },
 *   { code: 'inactive', description: 'Inactive User' },
 *   { code: 'pending', description: 'Pending Verification' }
 * ];
 * // 根据 'code' 获取 'description'
 * const statusDescription = lookupDictLabel(statusDict, 'inactive', 'code', 'description');
 * console.log(statusDescription); // 输出: "Inactive User"
 * ```
 */
export function lookupDictLabel<T extends object, K extends keyof T>(
  dict: T[],
  searchValue: any,
  searchKey: K = 'value' as K,
  targetKey: K = 'label' as K
): T[K] | undefined {
  // 查找与给定键值匹配的对象，并确保该对象存在且包含 targetKey
  const matchedItem = dict.find((item) => item[searchKey] === searchValue && targetKey in item);

  // 如果找到了匹配项，返回目标键的值；否则返回 undefined
  return matchedItem ? matchedItem[targetKey] : undefined;
}
