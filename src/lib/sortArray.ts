/**
 * 通用排序函数
 * 对普通数组或对象数组根据指定字段进行升序或降序排序
 * Copyright (c) 2024 xxm
 *
 * @template T - 数组元素类型（可以是基本类型或对象）
 * @param {Array<T>} array - 要排序的数组
 * @param {'asc' | 'desc'} [order='asc'] - 排序顺序，'asc' 表示升序，'desc' 表示降序
 * @param {keyof T | null} [field=null] - 对象数组中用于排序的字段名，如果是普通数组则为 null
 * @param {boolean} [numericStrings=false] - 是否将字符串作为数字处理（如果可能）
 * @returns {Array<T>} - 排序后的数组
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
export function sortArray<T extends string | number | boolean | bigint>(
  array: T[],
  order?: 'asc' | 'desc',
  field?: null,
  numericStrings?: boolean
): T[];
export function sortArray<T extends Record<string, unknown>, K extends keyof T>(
  array: T[],
  order?: 'asc' | 'desc',
  field?: K,
  numericStrings?: boolean
): T[];
export function sortArray<T>(
  array: T[],
  order: 'asc' | 'desc' = 'asc',
  field: keyof T | null = null,
  numericStrings: boolean = false
): T[] {
  // 辅助：尝试将未知值解析为数字，失败返回 null
  const toNumber = (v: unknown): number | null => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const s = v.trim();
      if (s === '') return null;
      const n = Number(s);
      return Number.isNaN(n) ? null : n;
    }
    return null;
  };

  // 辅助：安全获取对象字段值（不使用 any）
  const getField = (obj: unknown, key: keyof T | null): unknown => {
    if (key === null) return obj;
    if (obj !== null && typeof obj === 'object') {
      return (obj as Record<PropertyKey, unknown>)[key as PropertyKey];
    }
    return undefined;
  };

  return array.sort((aa, bb) => {
    const a = aa as unknown;
    const b = bb as unknown;
    let comparison = 0;

    if (field === null) {
      // 普通数组排序
      if (numericStrings) {
        const aNum = toNumber(a);
        const bNum = toNumber(b);

        if (aNum !== null && bNum !== null) {
          comparison = aNum - bNum;
        } else if (typeof a === 'string' && typeof b === 'string') {
          comparison = a.localeCompare(b);
        } else {
          comparison = String(a).localeCompare(String(b));
        }
      } else {
        if (typeof a === 'number' && typeof b === 'number') {
          comparison = a - b;
        } else if (typeof a === 'string' && typeof b === 'string') {
          comparison = a.localeCompare(b);
        } else {
          comparison = String(a).localeCompare(String(b));
        }
      }
    } else {
      // 对象数组，根据字段进行排序（使用 unknown/Record 替代 any）
      const aValue = getField(a, field);
      const bValue = getField(b, field);

      if (numericStrings) {
        const aNum = toNumber(aValue);
        const bNum = toNumber(bValue);

        if (aNum !== null && bNum !== null) {
          comparison = aNum - bNum;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = (aValue as string).localeCompare(bValue as string);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }
      } else {
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = (aValue as number) - (bValue as number);
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = (aValue as string).localeCompare(bValue as string);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }
      }
    }

    return order === 'asc' ? comparison : -comparison;
  });
}
