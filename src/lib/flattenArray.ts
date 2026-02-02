/**
 * 将嵌套数组展平成一维数组。
 * Copyright (c) 2024 xxm
 *
 * @template T - 数组元素的类型
 * @param arr - 需要展平的嵌套数组。
 * @returns 展平后的一维数组。
 * @example
 * ```js
 * const nestedArray = [1, [2, [3, 4], 5], 6];
 * const flatArray = flattenArray(nestedArray);
 * console.log(flatArray); // 输出: [1, 2, 3, 4, 5, 6]
 * ```
 */
type NestedArray<T> = T | NestedArray<T>[];

export function flattenArray<T>(arr: NestedArray<T>[]): T[] {
  return arr.reduce((acc: T[], val: NestedArray<T>): T[] => {
    return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
  }, []);
}
