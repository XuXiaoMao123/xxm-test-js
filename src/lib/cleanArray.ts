/**
 * 清理数组中的假值（falsy values），返回仅含真值（truthy values）的一维数组。
 * @param arr - 需要清理的数组。
 * @returns 清理后的一维数组，只包含真值元素。
 * @example
 * ```js
 * const mixedArray = [0, 1, false, 'text', null, undefined, [], {}, NaN, 42];
 * const cleanedArray = cleanArray(mixedArray);
 * console.log(cleanedArray); // 输出: [1, 'text', [], {}, 42]
 * ```
 */
export function cleanArray(arr: any[]): any[] {
  return arr.reduce((acc: any[], val: any): any[] => {
    // 如果值为真值，则添加到累加器中
    return val ? acc.concat(val) : acc;
  }, []);
}
