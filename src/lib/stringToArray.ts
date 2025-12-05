/**
 * 将字符串转换为数组，使用指定的分隔符，默认为逗号 `","`。
 *
 * @template T 分隔符的类型，必须是字符串或正则表达式。
 *
 * @param str - 要转换的字符串。
 * @param separator - 用于分隔字符串的分隔符，默认为 `","`。
 * @returns 返回一个字符串数组。
 * @example
 * ```TypeScript
 * // 示例用法
 * try {
 *   const result = stringToArray('apple,banana,cherry');
 *   console.log(result); // 输出: ["apple", "banana", "cherry"]
 *
 *   const resultWithSpace = stringToArray('one two three', ' ');
 *   console.log(resultWithSpace); // 输出: ["one", "two", "three"]
 *
 *   const resultWithRegex = stringToArray('one-two-three', /-/);
 *   console.log(resultWithRegex); // 输出: ["one", "two", "three"]
 *
 *   // 错误的使用示例
 *   const resultWithError = stringToArray([1, 2, 3]); // 将抛出 TypeError
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export function stringToArray<T extends string | RegExp>(
  str: string,
  separator: T = ',' as T
): string[] {
  // 检查 str 是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('The first argument must be a string.');
  }

  // 检查 separator 是否为字符串或正则表达式
  if (!(typeof separator === 'string' || separator instanceof RegExp)) {
    throw new TypeError('The separator must be a string or a RegExp.');
  }

  return str.split(separator);
}
