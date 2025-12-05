/**
 * 获取相对时间，如刚刚、几天前、几个月前、几年前。
 * 该函数会根据传入的日期与当前日期的差值，计算并返回相应的相对时间描述。
 * 如果传入的日期无效，将返回错误提示。
 * 如果在日期计算过程中出现错误，将抛出异常。
 * @param {Date} date - 要比较的日期，必须是一个有效的Date对象。
 * @returns {string} - 相对时间字符串，可能的值有：刚刚、x 分钟前、x 小时前、x 天前、x 个月前、x 年前；若传入的时间参数无效，返回 '传入的时间参数无效'。
 * @throws {Error} - 如果在日期计算过程中出现错误，抛出 '日期计算出错: [具体错误信息]' 的异常。
 * @example
 * ```js
 * // 示例1: 传入当前时间，返回 '刚刚'
 * const now = new Date();
 * console.log(getRelativeTime(now)); // 输出: 刚刚
 *
 * // 示例2: 传入10分钟前的时间，返回 '10 分钟前'
 * const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
 * console.log(getRelativeTime(tenMinutesAgo)); // 输出: 10 分钟前
 *
 * // 示例3: 传入1天前的时间，返回 '1 天前'
 * const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
 * console.log(getRelativeTime(oneDayAgo)); // 输出: 1 天前
 *
 * // 示例4: 传入无效的日期，返回 '传入的时间参数无效'
 * const invalidDate = new Date('invalid date');
 * console.log(getRelativeTime(invalidDate)); // 输出: 传入的时间参数无效
 * ```
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  try {
    const diff = now.getTime() - date.getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '传入的时间参数无效';
    }
    if (diff < minute) {
      return '刚刚';
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)} 分钟前`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)} 小时前`;
    } else if (diff < month) {
      return `${Math.floor(diff / day)} 天前`;
    } else if (diff < year) {
      return `${Math.floor(diff / month)} 个月前`;
    } else {
      return `${Math.floor(diff / year)} 年前`;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('日期计算出错: ' + errorMessage);
  }
}
