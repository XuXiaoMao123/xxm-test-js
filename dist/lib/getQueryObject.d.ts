/**
 * 解析URL查询字符串并返回一个对象，其中包含查询参数的键值对。
 * Copyright (c) 2024 xxm
 *
 * @param {string} url - 需要解析的URL字符串。如果为空，则默认使用当前页面的URL。
 * @returns {Object} - 包含查询参数的对象。
 * @example
 * ```js
 * const queryObj = getQueryObject('http://example.com?name=John&age=30');
 * console.log(queryObj); // 输出：{ name: 'John', age: '30' }
 * ```
 */
export declare function getQueryObject(url?: string): {
    [key: string]: string;
};
