/**
 * 将字符串进行 CSS 转义
 * @param {string | null | undefined} str - 要转义的字符串，可为 null 或 undefined
 * @returns {string} 转义后的字符串
 * @example
 * ```js
 * cssEscape('div::after') // 返回 'div\:\:after'
 * cssEscape('Hello # World') // 返回 'Hello \000023 World'
 * ```
 */
export function cssEscape(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return '';
  }
  return str.replace(/[\s'"(){};:#&,.<>[\]/\\^$*+?|=~`!-]/g, (match) => {
    return '\\' + match.charCodeAt(0).toString(16);
  });
}
