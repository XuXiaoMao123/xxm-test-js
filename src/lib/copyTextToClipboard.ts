/**
 * 将文本复制到剪贴板。
 * @param text 要复制的文本。
 * @returns Promise，表示复制操作是否成功。
 * @example
 * ```js
 * // 使用示例
 *copyTextToClipboard('Hello, world!')
 * .then(() => {
 *   console.log('Text copied successfully!');
 * })
 * .catch((error) => {
 *   console.error('Failed to copy text:', error);
 * });
 * ```
 */
export function copyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } else {
      // 备用方案：使用传统的方法复制文本
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          resolve();
        } else {
          throw new Error('Copy command failed');
        }
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  });
}
