/**
 * 获取指定范围内的随机整数。
 *
 * @param min - 最小值（包含）。
 * @param max - 最大值（包含）。
 * @returns 一个介于 min 和 max 之间的随机整数。
 *
 * @example
 * ```typescript
 * // 示例使用
 * const randomInt = getRandomInt(1, 10);
 * console.log('随机整数为：', randomInt);
 * ```
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
