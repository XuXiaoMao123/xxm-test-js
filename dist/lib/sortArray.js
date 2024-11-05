"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = sortArray;
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
function sortArray(array, order = 'asc', field = null) {
    return array.sort((a, b) => {
        let comparison = 0;
        if (field === null) {
            // 普通数组排序
            if (typeof a === 'number' && typeof b === 'number') {
                comparison = a - b; // 数字排序
            }
            else if (typeof a === 'string' && typeof b === 'string') {
                comparison = a.localeCompare(b); // 字符串排序
            }
            else {
                throw new Error('普通数组只能包含数字或字符串类型的元素');
            }
        }
        else {
            // 对象数组，根据字段进行排序
            const aValue = a[field];
            const bValue = b[field];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                comparison = aValue.localeCompare(bValue); // 字符串类型字段排序
            }
            else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue; // 数字类型字段排序
            }
            else {
                throw new Error(`字段 ${String(field)} 的值必须为数字或字符串类型`);
            }
        }
        // 根据排序顺序返回比较结果
        return order === 'asc' ? comparison : -comparison;
    });
}
//# sourceMappingURL=sortArray.js.map