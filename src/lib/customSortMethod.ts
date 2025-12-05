/**
 * 创建一个多级排序函数，用于对给定的数据数组按照指定的排序规则进行排序。
 *
 * @param {T[] | null} tableData - 要排序的数组，数组中的每个元素应为对象，也可能为 null。
 * @param {Array<{ field: string; order?: 'asc' | 'desc' }>} sortConfigs - 排序规则数组，每个元素包含排序字段和排序顺序（默认为升序）。
 * @returns {any[]} - 返回排序后的数据数组。
 *
 * @example
 * ```typescript
 * const tableData = [
 *   { name: 'Alice', age: 25, score: 80 },
 *   { name: 'Bob', age: 20, score: 90 },
 *   { name: 'Alice', age: 22, score: 85 },
 * ];
 * const sortConfigs = [
 *   { field: 'name', order: 'asc' },
 *   { field: 'age', order: 'desc' },
 *   { field: 'score', order: 'asc' }
 * ];
 * const sortedData = customSortMethod(tableData, sortConfigs);
 * console.log(sortedData);
 * ```
 */
export function customSortMethod<T extends object>(
  tableData: T[] | null,
  sortConfigs: Array<{ field: string; order?: 'asc' | 'desc' }>
): T[] {
  // 如果 tableData 为 null 或 空数组，直接返回空数组
  if (tableData === null || (Array.isArray(tableData) && tableData.length === 0)) {
    return [];
  }

  // 检查 tableData 是否为数组
  if (!Array.isArray(tableData)) {
    throw new TypeError('tableData 必须是一个数组');
  }
  // 检查数组中的每个元素是否为对象
  for (const item of tableData) {
    if (typeof item !== 'object' || item === null) {
      throw new TypeError('tableData 数组中的每个元素必须是对象');
    }
  }

  // 复制一份原始数据，避免修改原始数据
  const dataCopy = [...tableData];

  dataCopy.sort((a: T, b: T): number => {
    for (const { field, order = 'asc' } of sortConfigs) {
      const valueA = (a as any)[field];
      const valueB = (b as any)[field];
      let comparison: number;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      } else {
        // 处理非字符串和数字类型的情况，这里简单返回 0
        comparison = 0;
      }

      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });

  return dataCopy;
}
