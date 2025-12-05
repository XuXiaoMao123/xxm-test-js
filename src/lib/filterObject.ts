/**
 * 根据条件过滤对象的属性。
 * 该函数会遍历对象的所有可枚举属性，并根据提供的过滤条件函数保留或移除属性。
 * @template T - 原始对象类型
 * @param {T} obj - 要过滤的对象。
 * @param {(value: any, key: string, obj: T) => boolean} predicate - 过滤条件函数，返回true的属性会被保留，返回false的属性会被移除。
 * @returns {Partial<T>} - 过滤后的新对象，只包含满足条件的属性。
 * @example
 * ```js
 * // 示例1: 过滤出值为数字类型的属性
 * const obj1 = { a: 1, b: 'string', c: 3, d: null };
 * const filteredObj1 = filterObject(obj1, (value) => typeof value === 'number');
 * console.log(filteredObj1); // 输出: { a: 1, c: 3 }
 *
 * // 示例2: 过滤出属性名长度大于1的属性
 * const obj2 = { a: 1, ab: 2, abc: 3 };
 * const filteredObj2 = filterObject(obj2, (_, key) => key.length > 1);
 * console.log(filteredObj2); // 输出: { ab: 2, abc: 3 }
 *
 * // 示例3: 组合条件过滤
 * const obj3 = { a: 1, b: 2, c: 3, d: 4 };
 * const filteredObj3 = filterObject(obj3, (value, key) => value > 2 && key !== 'd');
 * console.log(filteredObj3); // 输出: { c: 3 }
 *
 * // 示例4: 过滤出非空属性
 * const obj4 = { a: 1, b: null, c: undefined, d: '' };
 * const filteredObj4 = filterObject(obj4, (value) => value !== null && value !== undefined && value !== '');
 * console.log(filteredObj4); // 输出: { a: 1 }
 * ```
 */
export function filterObject<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: unknown, key: string, obj: T) => boolean
): Partial<T> {
  // 验证参数
  if (!obj || typeof obj !== 'object') {
    throw new Error('第一个参数必须是对象');
  }

  if (typeof predicate !== 'function') {
    throw new Error('第二个参数必须是函数');
  }

  const result: Partial<T> = {};

  // 遍历对象的所有可枚举属性
  for (const key in obj) {
    // 只处理对象自身的属性，不包括原型链上的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 如果满足过滤条件，则保留该属性
      if (predicate(obj[key], key, obj)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}
