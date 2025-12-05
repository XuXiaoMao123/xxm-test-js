/**
 * 通用排序函数
 * 对普通数组或对象数组根据指定字段进行升序或降序排序
 * Copyright (c) 2024 xxm
 *
 * @param {Array<any>} array - 要排序的数组
 * @param {string} [order='asc'] - 排序顺序，'asc' 表示升序，'desc' 表示降序
 * @param {string|null} [field=null] - 对象数组中用于排序的字段名，如果是普通数组则为null
 * @param {boolean} [numericStrings=false] - 是否将字符串作为数字处理（如果可能）
 * @returns {Array<any>} - 排序后的数组
 * @example
 *
 * ```js
 * // 示例用法
 * const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
 * console.log(sortArray(numbers)); // 升序排序 [1, 1, 2, 3, 4, 5, 6, 9]
 * console.log(sortArray(numbers, 'desc')); // 降序排序 [9, 6, 5, 4, 3, 2, 1, 1]
 *
 * const strings = ["banana", "apple", "orange"];
 * console.log(sortArray(strings)); // 字典序升序排序 ["apple", "banana", "orange"]
 * console.log(sortArray(strings, 'desc')); // 字典序降序排序 ["orange", "banana", "apple"]
 *
 * // 字符串数字排序
 * const stringNumbers = ["10", "2", "1", "21"];
 * console.log(sortArray(stringNumbers)); // 字典序升序排序 ["1", "10", "2", "21"]
 * console.log(sortArray(stringNumbers, 'asc', null, true)); // 数值升序排序 ["1", "2", "10", "21"]
 *
 * // 混合类型排序（数字和字符串数字）
 * const mixedValues = [5, "10", 1, "2"];
 * console.log(sortArray(mixedValues, 'asc', null, true)); // 数值升序排序 [1, "2", 5, "10"]
 *
 * interface User {
 *     name: string;
 *     age: number | string; // 年龄可能是数字或字符串
 *     score: string; // 分数存储为字符串
 * }
 *
 * const users: User[] = [
 *     { name: "John", age: 30, score: "100" },
 *     { name: "Alice", age: "25", score: "85" },
 *     { name: "Bob", age: 28, score: "120" }
 * ];
 *
 * // 根据年龄升序排序（混合类型）
 * console.log(sortArray(users, 'asc', 'age', true));
 * // 输出: [{ name: "Alice", age: "25", score: "85" }, { name: "Bob", age: 28, score: "120" }, { name: "John", age: 30, score: "100" }]
 *
 * // 根据分数（字符串数字）升序排序
 * console.log(sortArray(users, 'asc', 'score', true));
 * // 输出: [{ name: "Alice", age: "25", score: "85" }, { name: "John", age: 30, score: "100" }, { name: "Bob", age: 28, score: "120" }]
 * ```
 */
export function sortArray<T>(
  array: T[],
  order: 'asc' | 'desc' = 'asc',
  field: keyof T | null = null,
  numericStrings: boolean = false
): T[] {
  return array.sort((a, b) => {
    let comparison = 0;

    if (field === null) {
      // 普通数组排序
      if (numericStrings) {
        // 如果启用了数字字符串处理
        const aNum =
          typeof a === 'number' ? a : typeof a === 'string' && !isNaN(Number(a)) ? Number(a) : NaN;
        const bNum =
          typeof b === 'number' ? b : typeof b === 'string' && !isNaN(Number(b)) ? Number(b) : NaN;

        if (!isNaN(aNum) && !isNaN(bNum)) {
          // 两者都可以转换为数字
          comparison = aNum - bNum;
        } else if (typeof a === 'string' && typeof b === 'string') {
          // 如果都是字符串但不能转换为数字，使用字符串比较
          comparison = a.localeCompare(b);
        } else {
          // 其他情况，转换为字符串比较
          comparison = String(a).localeCompare(String(b));
        }
      } else {
        // 不启用数字字符串处理
        if (typeof a === 'number' && typeof b === 'number') {
          comparison = a - b; // 数字排序
        } else if (typeof a === 'string' && typeof b === 'string') {
          comparison = a.localeCompare(b); // 字符串排序
        } else {
          // 混合类型，转换为字符串比较
          comparison = String(a).localeCompare(String(b));
        }
      }
    } else {
      // 对象数组，根据字段进行排序
      const aValue = (a as any)[field];
      const bValue = (b as any)[field];

      if (numericStrings) {
        // 如果启用了数字字符串处理
        const aNum =
          typeof aValue === 'number'
            ? aValue
            : typeof aValue === 'string' && !isNaN(Number(aValue))
            ? Number(aValue)
            : NaN;
        const bNum =
          typeof bValue === 'number'
            ? bValue
            : typeof bValue === 'string' && !isNaN(Number(bValue))
            ? Number(bValue)
            : NaN;

        if (!isNaN(aNum) && !isNaN(bNum)) {
          // 两者都可以转换为数字
          comparison = aNum - bNum;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          // 如果都是字符串但不能转换为数字，使用字符串比较
          comparison = aValue.localeCompare(bValue);
        } else {
          // 其他情况，转换为字符串比较
          comparison = String(aValue).localeCompare(String(bValue));
        }
      } else {
        // 不启用数字字符串处理
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue; // 数字类型字段排序
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue); // 字符串类型字段排序
        } else {
          // 混合类型，转换为字符串比较
          comparison = String(aValue).localeCompare(String(bValue));
        }
      }
    }

    // 根据排序顺序返回比较结果
    return order === 'asc' ? comparison : -comparison;
  });
}
