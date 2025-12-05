/**
 * 数组去重函数
 * 对数组进行去重操作，支持基本类型和对象类型
 * Copyright (c) 2024 xxm
 *
 * @template T - 数组元素的类型
 * @param {T[]} array - 需要去重的数组
 * @param {string|((a: T, b: T) => boolean)} [comparison] - 可选的比较参数
 *   - 如果是字符串，则作为对象的属性名进行比较
 *   - 如果是函数，则作为自定义比较函数
 * @returns {T[]} - 去重后的新数组
 * @example
 *
 * ```js
 * // 基本类型数组去重
 * const numbers = [1, 2, 2, 3, 4, 4, 5];
 * console.log(uniqueArray(numbers)); // 输出: [1, 2, 3, 4, 5]
 *
 * const strings = ['a', 'b', 'a', 'c'];
 * console.log(uniqueArray(strings)); // 输出: ['a', 'b', 'c']
 *
 * // 对象数组去重 - 通过属性名
 * const users = [
 *   { id: 1, name: '张三' },
 *   { id: 2, name: '李四' },
 *   { id: 1, name: '张三' }
 * ];
 * console.log(uniqueArray(users, 'id')); // 输出: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
 *
 * // 对象数组去重 - 通过自定义比较函数
 * const customCompare = (a, b) => a.name === b.name;
 * console.log(uniqueArray(users, customCompare)); // 输出: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
 *
 * // 混合类型数组去重
 * const mixed = [1, '1', 1, 'a', 'a'];
 * console.log(uniqueArray(mixed)); // 输出: [1, '1', 'a']
 *
 * // 复杂嵌套对象去重（使用自定义比较函数）
 * const complexUsers = [
 *   { id: 1, profile: { age: 25 } },
 *   { id: 2, profile: { age: 30 } },
 *   { id: 1, profile: { age: 25 } }
 * ];
 * const complexCompare = (a, b) => a.id === b.id && a.profile.age === b.profile.age;
 * console.log(uniqueArray(complexUsers, complexCompare)); // 输出: [{ id: 1, profile: { age: 25 } }, { id: 2, profile: { age: 30 } }]
 * ```
 */
export function uniqueArray<T>(array: T[], comparison?: string | ((a: T, b: T) => boolean)): T[] {
  // 参数验证
  if (!Array.isArray(array)) {
    throw new TypeError('The first argument must be an array.');
  }

  // 空数组直接返回
  if (array.length === 0) {
    return [];
  }

  // 处理自定义比较函数的情况
  if (typeof comparison === 'function') {
    return array.filter((item, index, self) => {
      // 只保留第一个出现的元素
      return self.findIndex((compareItem) => comparison(item, compareItem)) === index;
    });
  }

  // 处理对象属性名比较的情况
  if (typeof comparison === 'string') {
    const seen = new Set();
    return array.filter((item) => {
      // 确保item是对象且具有该属性
      const key = item && typeof item === 'object' ? item[comparison as keyof T] : undefined;
      // 使用JSON.stringify将值转换为字符串，以便Set可以比较
      const keyString = JSON.stringify(key);

      if (seen.has(keyString)) {
        return false;
      }

      seen.add(keyString);
      return true;
    });
  }

  // 默认处理 - 基本类型去重
  // 对于基本类型，可以使用Set进行高效去重
  // 但是需要处理NaN的特殊情况，因为NaN !== NaN
  const result: T[] = [];
  const seen = new Set<any>();
  let nanCount = 0;

  for (const item of array) {
    // 特殊处理NaN
    if (typeof item === 'number' && isNaN(item)) {
      if (nanCount === 0) {
        result.push(item);
        nanCount++;
      }
      continue;
    }

    // 处理其他基本类型
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
