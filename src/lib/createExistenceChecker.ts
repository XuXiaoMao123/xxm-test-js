/**
 * 创建一个存在性检查函数，用于验证给定值是否存在于预定义的字符串列表中。
 *
 * @param {string} str - 逗号分隔的字符串，表示要包含在映射中的关键字或值。
 * @param {boolean} [expectsLowerCase=false] - 指示映射的键是否应该被转换为小写。
 * @returns {MakeMapFunction} - 返回一个闭包函数，该函数接收一个字符串并返回布尔值，指示该字符串是否存在于映射中。
 *
 * @example
 * ```javascript
 * // 创建一个大小写敏感的存在性检查函数
 * const checkKeywords = createExistenceChecker('html,css,javascript');
 * console.log(checkKeywords('HTML')); // 输出: false
 * console.log(checkKeywords('css'));   // 输出: true
 * ```
 *
 * @example
 * ```javascript
 * // 创建一个大小写不敏感的存在性检查函数
 * const checkKeywordsIgnoreCase = createExistenceChecker('html,css,javascript', true);
 * console.log(checkKeywordsIgnoreCase('HTML')); // 输出: true
 * console.log(checkKeywordsIgnoreCase('CSS'));  // 输出: true
 * ```
 */
type MakeMapFunction = (val?: string) => boolean;

export function createExistenceChecker(
  str: string,
  expectsLowerCase: boolean = false
): MakeMapFunction {
  const map: { [key: string]: boolean } = Object.create(null);
  const list = str.split(',').map((item) => item.trim()); // 移除前后空白

  for (const item of list) {
    if (item) {
      // 确保不会添加空字符串作为键
      map[expectsLowerCase ? item.toLowerCase() : item] = true;
    }
  }

  return expectsLowerCase
    ? (val?: string) => (val !== undefined && val !== null ? !!map[val.toLowerCase()] : false)
    : (val?: string) => (val !== undefined && val !== null ? !!map[val] : false);
}
