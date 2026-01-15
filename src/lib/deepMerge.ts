/**
 * 对象类型约束
 */
type PlainObject = Record<string, unknown>;

/**
 * 深度合并类型推断
 */
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? T[K] extends PlainObject
        ? U[K] extends PlainObject
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

/**
 * 递归合并两个或多个对象
 * Copyright (c) 2024 xxm
 *
 * @template T - 目标对象类型
 * @template U - 源对象类型
 * @param {T} target - 目标对象
 * @param {U} source - 源对象
 * @param {...PlainObject[]} sources - 更多源对象（可选）
 * @returns {DeepMerge<T, U>} 返回合并后的新对象
 * @example
 *
 * ```ts
 * // 合并两个对象
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const result = deepMerge(obj1, obj2);
 * // 结果: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * // 合并多个对象
 * const obj3 = { f: 5 };
 * const result2 = deepMerge(obj1, obj2, obj3);
 * // 结果: { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 }
 * ```
 */
export function deepMerge<T extends PlainObject, U extends PlainObject>(
  target: T,
  source: U,
  ...sources: PlainObject[]
): DeepMerge<T, U> {
  // 如果有多个源对象，递归合并
  if (sources.length > 0) {
    const merged = deepMergeTwo(target, source);
    return deepMerge(merged, sources[0], ...sources.slice(1)) as DeepMerge<T, U>;
  }

  return deepMergeTwo(target, source) as DeepMerge<T, U>;
}

/**
 * 合并两个对象的内部实现
 */
function deepMergeTwo<T extends PlainObject, U extends PlainObject>(
  target: T,
  source: U
): DeepMerge<T, U> {
  const output = { ...target } as DeepMerge<T, U>;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue });
        } else if (isObject(targetValue)) {
          (output as PlainObject)[key] = deepMergeTwo(
            targetValue as PlainObject,
            sourceValue as PlainObject
          );
        } else {
          Object.assign(output, { [key]: sourceValue });
        }
      } else {
        Object.assign(output, { [key]: sourceValue });
      }
    });
  }

  return output;
}

/**
 * 判断一个值是否为普通对象（非数组、非 null）
 * @param {unknown} item - 要检查的值
 * @returns {boolean} 如果是对象则返回 true，否则返回 false
 */
function isObject(item: unknown): item is PlainObject {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
