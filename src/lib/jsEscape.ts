/**
 * 将字符串进行 JS 转义
 * @param {string | null | undefined} str - 要转义的字符串，可为 null 或 undefined
 * @returns {string} 转义后的字符串
 * @example
 * ```js
 * jsEscape('Hello \" World \' Example') // 返回 'Hello \\\" World \\\' Example'
 * ```
 */
export function jsEscape(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return '';
  }
  return str.replace(/["'\\]/g, (match) => {
    switch (match) {
      case '"':
        return '\\"';
      case "'":
        return "\\'";
      case '\\':
        return '\\\\';
      default:
        return match;
    }
  });
}
