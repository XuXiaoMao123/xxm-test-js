/**
 * 递归合并两个或多个对象
 * Copyright (c) 2024 xxm
 *
 * @template T - 目标对象类型
 * @template U - 源对象类型
 * @param {T} target - 目标对象
 * @param {U} source - 源对象
 * @returns {T & U} 返回合并后的新对象
 * @example
 *
 * ```ts
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 *
 * const result = deepMerge(obj1, obj2);
 * // 结果: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          (output as Record<string, any>)[key] = deepMerge(
            target[key] as Record<string, any>,
            source[key] as Record<string, any>
          );
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

/**
 * 判断一个值是否为对象
 * @param {any} item - 要检查的值
 * @returns {boolean} 如果是对象则返回 true，否则返回 false
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}
