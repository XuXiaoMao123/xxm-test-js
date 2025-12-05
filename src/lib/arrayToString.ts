/**
 * 将数组转换为字符串。
 *
 * @template T 数组元素的类型。
 *
 * @param {T[]} array - 要转换的数组。
 * @param {string} [separator=','] - 自定义连接符，默认为 ','。
 * @returns {string} 转换后的字符串。
 *
 * @example
 * const numbers = [1, 2, 3, 4];
 * const result = arrayToString(numbers, '-'); // 结果: "1-2-3-4"
 *
 * const words = ['Hello', 'World'];
 * const result2 = arrayToString(words); // 结果: "Hello,World"
 */
export function arrayToString<T>(array: T[], separator: string = ','): string {
  return array.join(separator);
}
