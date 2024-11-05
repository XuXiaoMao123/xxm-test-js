/**
 * 创建一个对象或数组的深拷贝。
 * Copyright (c) 2024 xxm
 *
 * @param obj - 需要被拷贝的对象或数组。
 * @returns 一个新的对象或数组，其属性和值与原始对象相同。
 *
 * @example
 * ```js
 * const originalObj = { a: 1, b: { c: 2 } };
 * const copiedObj = deepCopy(originalObj);
 * console.log(copiedObj); // 输出: { a: 1, b: { c: 2 } }
 *
 * const originalArr = [1, 2, [3, 4]];
 * const copiedArr = deepCopy(originalArr);
 * console.log(copiedArr); // 输出: [1, 2, [3, 4]]
 * ```
 */
export declare function deepCopy<T>(obj: T): T;
