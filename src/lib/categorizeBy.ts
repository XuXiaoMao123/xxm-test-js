/**
 * 根据对象数组中每个元素指定属性的值进行分类。
 *
 * @template T - 数组元素的类型。
 * @param {T[]} array - 要分类的对象数组。
 * @param {keyof T} key - 用于分类的属性名，必须是对象中存在的属性。
 * @returns {Record<string, T[]>} - 分类后的新对象，其中每个键都是由 `key` 指定的属性值（转为字符串），对应的值是由具有相同键值的对象组成的数组。
 *
 * @example
 * ```javascript
 * const fruits = [
 *   { name: 'Apple', type: 'fruit' },
 *   { name: 'Carrot', type: 'vegetable' },
 *   { name: 'Banana', type: 'fruit' },
 *   { name: 'Broccoli', type: 'vegetable' }
 * ];
 * const categorizedFruits = categorizeBy(fruits, 'type');
 * console.log(categorizedFruits);
 * // 输出:
 * // {
 * //   fruit: [{ name: 'Apple', type: 'fruit' }, { name: 'Banana', type: 'fruit' }],
 * //   vegetable: [{ name: 'Carrot', type: 'vegetable' }, { name: 'Broccoli', type: 'vegetable' }]
 * // }
 *```
 * @example
 * ```javascript
 * const numbers = [
 *   { id: 1, category: 10 },
 *   { id: 2, category: 20 },
 *   { id: 3, category: 10 }
 * ];
 * const categorizedNumbers = categorizeBy(numbers, 'category');
 * console.log(categorizedNumbers);
 * // 输出:
 * // {
 * //   "10": [{ id: 1, category: 10 }, { id: 3, category: 10 }],
 * //   "20": [{ id: 2, category: 20 }]
 * // }
 * ```
 */
export function categorizeBy<T extends object>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    // 确保 item 是对象并且不是 null
    if (typeof item === 'object' && item !== null && key in item && item[key] !== undefined) {
      // 将属性值转换成字符串以安全地用作对象键
      const keyValue = String(item[key]);
      // 如果 acc 中还没有这个键，则创建一个新的空数组
      if (!acc[keyValue]) {
        acc[keyValue] = [];
      }
      // 将当前项推入相应的数组中
      acc[keyValue].push(item);
    }
    return acc;
  }, {} as Record<string, T[]>);
}
