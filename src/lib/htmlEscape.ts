/**
 * 将字符串进行 HTML 转义
 * @param {string | null | undefined} str - 要转义的字符串，可为 null 或 undefined
 * @returns {string} 转义后的字符串
 * @example
 * ```js
 * htmlEscape('Hello & World < Example >') // 返回 'Hello &amp; World &lt; Example &gt;'
 * ```
 */
export function htmlEscape(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return '';
  }
  return str.replace(/[&<>'"]/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return match;
    }
  });
}
