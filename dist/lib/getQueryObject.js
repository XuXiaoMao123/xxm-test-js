"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryObject = getQueryObject;
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
function getQueryObject(url) {
    // 如果url参数为空，则使用当前页面的URL
    url = url == null ? window.location.href : url;
    // 提取查询字符串部分
    const search = url.substring(url.lastIndexOf('?') + 1);
    // 初始化对象，用于存储解析后的查询参数
    const obj = {};
    // 正则表达式，用于匹配查询字符串中的键值对
    const reg = /([^?&=]+)=([^?&=]*)/g;
    // 替换方法，用于解析查询字符串中的每个键值对
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    // 返回包含查询参数的对象
    return obj;
}
//# sourceMappingURL=getQueryObject.js.map