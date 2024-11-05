"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelTime = handelTime;
/**
 * 格式化日期时间字符串。
 * Copyright (c) 2024 xxm
 *
 * @param {string | Date} cellValue - 输入的日期时间值，可以是字符串或 Date 对象。
 * @param {string} [format='yyyy-MM-dd'] - 期望的日期时间格式字符串，包含 'yyyy', 'MM', 'dd', 'HH', 'mm', 'ss' 等占位符。
 * @returns {string} - 格式化后的日期时间字符串。
 * @example
 *
 * ```js
 * const time = new Date();
 * const formatTime1 = handleTime(time);
 * const formatTime2 = handleTime(time, 'yyyy-MM-dd');
 * ```
 */
function handelTime(cellValue, format = 'yyyy-MM-dd') {
    if (!cellValue)
        return "";
    // 尝试将输入转换为 Date 对象
    let date;
    try {
        if (cellValue instanceof Date) {
            date = new Date(cellValue.getTime()); // 使用 getTime() 来避免浅拷贝问题
        }
        else {
            date = new Date(cellValue);
        }
    }
    catch (e) {
        console.error("Invalid date format:", e);
        return "";
    }
    const pad = (str, len) => str.padStart(len, '0');
    // 获取日期各部分
    const year = date.getFullYear();
    const month = pad((date.getMonth() + 1).toString(), 2);
    const day = pad(date.getDate().toString(), 2);
    const hours = pad(date.getHours().toString(), 2);
    const minutes = pad(date.getMinutes().toString(), 2);
    const seconds = pad(date.getSeconds().toString(), 2);
    // 根据格式字符串生成日期时间字符串
    return format.replace('yyyy', year.toString())
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}
//# sourceMappingURL=handleTime.js.map