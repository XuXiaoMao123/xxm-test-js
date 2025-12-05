/**
 * 此函数用于格式化日期时间值为指定格式的字符串。
 * 支持输入字符串、日期对象或时间戳作为日期时间值。
 * 支持多种日期时间格式，如 'yyyy-MM-dd', 'HH:mm:ss' 等。
 * 如果输入无效，将返回空字符串。
 *
 * @param {string | Date | number} cellValue - 输入的日期时间值，可以是字符串、日期对象或时间戳。
 *        - 若为字符串，需符合日期格式，如 '2024-01-01' 或 '2024/01/01 12:00:00'。
 *        - 若为日期对象，即 `new Date()` 创建的对象。
 *        - 若为时间戳，是自 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数。
 * @param {string} [format='yyyy-MM-dd'] - 期望的日期时间格式字符串，包含 'yyyy', 'MM', 'dd', 'HH', 'mm', 'ss' 等占位符。
 *        - 'yyyy' 表示四位数的年份，如 2024。
 *        - 'yy' 表示两位数的年份，如 24。
 *        - 'MM' 表示两位数的月份，范围 01 - 12。
 *        - 'M' 表示一位数或两位数的月份，范围 1 - 12。
 *        - 'dd' 表示两位数的日期，范围 01 - 31。
 *        - 'd' 表示一位数或两位数的日期，范围 1 - 31。
 *        - 'HH' 表示两位数的小时，范围 00 - 23。
 *        - 'H' 表示一位数或两位数的小时，范围 0 - 23。
 *        - 'mm' 表示两位数的分钟，范围 00 - 59。
 *        - 'm' 表示一位数或两位数的分钟，范围 0 - 59。
 *        - 'ss' 表示两位数的秒数，范围 00 - 59。
 *        - 's' 表示一位数或两位数的秒数，范围 0 - 59。
 * @returns {string} - 格式化后的日期时间字符串，如果输入无效则返回空字符串。
 * @throws {Error} - 当输入的日期格式无法解析时，会在控制台输出错误信息 'Invalid date format:' 并返回空字符串。
 *
 * @example
 * const time = new Date();
 * const formatTime1 = handleTime(time); // 默认格式 'yyyy-MM-dd'
 * const formatTime2 = handleTime(time, 'yyyy/MM/dd HH:mm:ss'); // 自定义格式
 */
export function handelTime(cellValue: string | Date, format: string = 'yyyy-MM-dd'): string {
  if (!cellValue) return '';

  // 尝试将输入转换为 Date 对象
  let date: Date;
  try {
    if (typeof cellValue === 'number') {
      date = new Date(cellValue);
    } else if (cellValue instanceof Date) {
      date = new Date(cellValue.getTime()); // 使用 getTime() 来避免浅拷贝问题
    } else {
      date = new Date(cellValue);
    }
  } catch (e) {
    console.error('Invalid date format:', e);
    return '';
  }

  const getPaddedValue = (value: number, length: number): string =>
    value.toString().padStart(length, '0');
  const getShortValue = (value: number): string => value.toString();
  // 获取日期各部分
  const year = date.getFullYear();
  const shortYear = getShortValue(year).slice(-2);
  const month = getPaddedValue(date.getMonth() + 1, 2);
  const shortMonth = getShortValue(date.getMonth() + 1);
  const day = getPaddedValue(date.getDate(), 2);
  const shortDay = getShortValue(date.getDate());
  const hours = getPaddedValue(date.getHours(), 2);
  const shortHours = getShortValue(date.getHours());
  const minutes = getPaddedValue(date.getMinutes(), 2);
  const shortMinutes = getShortValue(date.getMinutes());
  const seconds = getPaddedValue(date.getSeconds(), 2);
  const shortSeconds = getShortValue(date.getSeconds());
  // 根据格式字符串生成日期时间字符串
  const replacements = {
    yyyy: year.toString(),
    yy: shortYear,
    MM: month,
    M: shortMonth,
    dd: day,
    d: shortDay,
    HH: hours,
    H: shortHours,
    mm: minutes,
    m: shortMinutes,
    ss: seconds,
    s: shortSeconds,
  };
  return Object.entries(replacements).reduce((formatted, [key, value]) => {
    return formatted.replace(key, value);
  }, format);
}
