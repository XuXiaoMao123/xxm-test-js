/**
 * 格式化时间差，将毫秒数转换为易读的时间格式（如"1小时30分钟"）。
 * 该函数会根据传入的毫秒数，计算并返回相应的时间描述。
 * 如果传入的毫秒数无效，将返回错误提示。
 * @param {number} milliseconds - 要格式化的时间差（毫秒）。
 * @param {Object} [options] - 可选配置项。
 * @param {boolean} [options.includeSeconds=false] - 是否包含秒数。
 * @param {boolean} [options.compact=false] - 是否使用紧凑格式（如"1h30m"）。
 * @returns {string} - 格式化后的时间字符串。
 * @example
 * ```js
 * // 示例1: 格式化1小时30分钟
 * const duration1 = 1 * 60 * 60 * 1000 + 30 * 60 * 1000;
 * console.log(formatDuration(duration1)); // 输出: 1小时30分钟
 *
 * // 示例2: 格式化1小时30分钟15秒，包含秒数
 * const duration2 = 1 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000;
 * console.log(formatDuration(duration2, { includeSeconds: true })); // 输出: 1小时30分钟15秒
 *
 * // 示例3: 使用紧凑格式
 * console.log(formatDuration(duration1, { compact: true })); // 输出: 1h30m
 *
 * // 示例4: 传入无效的毫秒数
 * console.log(formatDuration(-1000)); // 输出: 无效的时间差
 * ```
 */
export function formatDuration(
  milliseconds: number,
  options: {
    includeSeconds?: boolean;
    compact?: boolean;
  } = {}
): string {
  const { includeSeconds = false, compact = false } = options;

  // 验证参数
  if (typeof milliseconds !== 'number' || isNaN(milliseconds) || milliseconds < 0) {
    return '无效的时间差';
  }

  // 定义时间单位
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  // 计算各时间单位的数量
  const days = Math.floor(milliseconds / day);
  const hours = Math.floor((milliseconds % day) / hour);
  const minutes = Math.floor((milliseconds % hour) / minute);
  const seconds = Math.floor((milliseconds % minute) / second);

  // 定义时间单位文本
  const dayText = compact ? 'd' : '天';
  const hourText = compact ? 'h' : '小时';
  const minuteText = compact ? 'm' : '分钟';
  const secondText = compact ? 's' : '秒';

  // 构建结果数组
  const result: string[] = [];

  if (days > 0) {
    result.push(`${days}${dayText}`);
  }
  if (hours > 0) {
    result.push(`${hours}${hourText}`);
  }
  if (minutes > 0) {
    result.push(`${minutes}${minuteText}`);
  }
  if (includeSeconds && seconds > 0) {
    result.push(`${seconds}${secondText}`);
  }

  // 如果没有任何时间单位，返回默认值
  if (result.length === 0) {
    return includeSeconds ? `0${secondText}` : `0${minuteText}`;
  }

  return result.join(compact ? '' : '');
}
