/**
 * 通用排序函数
 * 对普通数组或对象数组根据指定字段进行升序或降序排序
 * Copyright (c) 2024 xxm
 *
 * @param {Array<any>} array - 要排序的数组
 * @param {string} [order='asc'] - 排序顺序，'asc' 表示升序，'desc' 表示降序
 * @param {string|null} [field=null] - 对象数组中用于排序的字段名，如果是普通数组则为null
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
 * interface User {
 *     name: string;
 *     age: number;
 * }
 *
 * const users: User[] = [
 *     { name: "John", age: 30 },
 *     { name: "Alice", age: 25 },
 *     { name: "Bob", age: 30 }
 * ];
 *
 * // 根据年龄升序排序
 * console.log(sortArray(users, 'asc', 'age'));
 * // 输出: [{ name: "Alice", age: 25 }, { name: "John", age: 30 }, { name: "Bob", age: 30 }]
 *
 * // 根据姓名字典序降序排序
 * console.log(sortArray(users, 'desc', 'name'));
 * // 输出: [{ name: "John", age: 30 }, { name: "Bob", age: 30 }, { name: "Alice", age: 25 }]
 * ```
 */
export declare function sortArray<T>(array: T[], order?: 'asc' | 'desc', field?: keyof T | null): T[];
