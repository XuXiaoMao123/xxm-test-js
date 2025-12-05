/**
 * 将经过 HTML 转义的字符串进行反转义
 * @param {string | null | undefined} str - 要反转义的字符串，可为 null 或 undefined
 * @returns {string} 反转义后的字符串
 * @example
 * ```js
 * htmlUnescape('Hello &amp; World &lt; Example &gt;') // 返回 'Hello & World < Example >'
 * ```
 */
export function htmlUnescape(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return '';
  }
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
