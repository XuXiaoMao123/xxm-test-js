/**
 * 根据指定条件对数组元素进行分组。
 * Copyright (c) 2024 xxm
 *
 * @template T - 数组元素的类型。
 * @template K - 分组键的类型，默认为 string。
 * @param {T[]} array - 要分组的数组。
 * @param {(item: T) => K | keyof T} grouper - 分组函数或属性名。如果是函数，将用其返回值作为分组键；如果是字符串，将用该属性的值作为分组键。
 * @returns {Record<string, T[]>} - 分组后的对象，其中每个键是分组值（转为字符串），对应的值是该分组的元素数组。
 *
 * @example
 * ```javascript
 * // 使用属性名分组
 * const fruits = [
 *   { name: 'Apple', type: 'fruit' },
 *   { name: 'Carrot', type: 'vegetable' },
 *   { name: 'Banana', type: 'fruit' }
 * ];
 * const groupedByType = groupBy(fruits, 'type');
 * console.log(groupedByType);
 * // 输出:
 * // {
 * //   fruit: [{ name: 'Apple', type: 'fruit' }, { name: 'Banana', type: 'fruit' }],
 * //   vegetable: [{ name: 'Carrot', type: 'vegetable' }]
 * // }
 *
 * // 使用自定义函数分组
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const groupedByEvenOdd = groupBy(numbers, num => num % 2 === 0 ? 'even' : 'odd');
 * console.log(groupedByEvenOdd);
 * // 输出:
 * // {
 * //   odd: [1, 3, 5],
 * //   even: [2, 4, 6]
 * // }
 *
 * // 使用对象的复杂属性分组
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const groupedByAgeRange = groupBy(users, user => user.age >= 30 ? '30+' : '20-29');
 * console.log(groupedByAgeRange);
 * // 输出:
 * // {
 * //   '20-29': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
 * //   '30+': [{ name: 'Bob', age: 30 }]
 * // }
 * ```
 */
export function groupBy<T extends object, K = string>(
  array: T[],
  grouper: ((item: T) => K) | keyof T
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    // 确保 item 是对象并且不是 null
    if (typeof item !== 'object' || item === null) {
      return acc;
    }

    let groupKey: K;
    if (typeof grouper === 'function') {
      // 如果 grouper 是函数，调用它获取分组键
      groupKey = grouper(item);
    } else {
      // 如果 grouper 是字符串，使用该属性的值作为分组键
      const propValue = item[grouper];
      if (propValue === undefined) {
        return acc;
      }
      groupKey = propValue as unknown as K;
    }

    // 将分组键转换为字符串以安全地用作对象键
    const keyString = String(groupKey);
    // 如果 acc 中还没有这个键，则创建一个新的空数组
    if (!acc[keyString]) {
      acc[keyString] = [];
    }
    // 将当前项添加到对应的分组中
    acc[keyString].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}
