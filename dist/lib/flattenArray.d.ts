/**
 * 将嵌套数组展平成一维数组。
 * Copyright (c) 2024 xxm
 *
 * @param arr - 需要展平的嵌套数组。
 * @returns 展平后的一维数组。
 * @example
 * ```js
 * const nestedArray = [1, [2, [3, 4], 5], 6];
 * const flatArray = flattenArray(nestedArray);
 * console.log(flatArray); // 输出: [1, 2, 3, 4, 5, 6]
 * ```
 */
export declare function flattenArray(arr: any[]): any[];
