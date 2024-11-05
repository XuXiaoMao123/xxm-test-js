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
export declare function handelTime(cellValue: string | Date, format?: string): string;
