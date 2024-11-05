/**
 * 格式化数字，添加千分位分隔符。
 * Copyright (c) 2024 xxm
 *
 * @param {number} num - 需要格式化的数字。
 * @param {number} [decimalPlaces=2] - 保留的小数位数，默认为2位。
 * @returns {string} 返回格式化后的字符串，包含千分位分隔符。
 * @example
 *
 * ```js
 * console.log(formatThousands(1234567.891)); // 输出 "1,234,567.89"
 * console.log(formatThousands(1234567.891, 0)); // 输出 "1,234,568"
 * console.log(formatThousands(1234567.891, 3)); // 输出 "1,234,567.891"
 * ```
 *
 */
export declare function formatThousands(num: number, decimalPlaces?: number): string;
