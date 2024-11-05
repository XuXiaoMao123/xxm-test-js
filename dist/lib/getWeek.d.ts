/**
 * 获取指定日期所在的周数（符合中国的周定义，即周一作为一周的开始）。
 * Copyright (c) 2024 xxm
 *
 * @param {string | Date} [nowDay=new Date()] - 传入一个具体的日期或日期字符串。默认为当前日期。
 * @returns {number} 返回一个数字，表示指定日期是一年中的第几周。
 *
 * @example
 *
 * ```javascript
 * const currentWeekNumber = getWeek(); // 使用默认的当前日期
 * console.log(`当前是一年中的第 ${currentWeekNumber} 周`);
 *
 * const specificWeekNumber = getWeek('2024-01-01'); // 指定日期字符串
 * console.log(`指定日期是一年中的第 ${specificWeekNumber} 周`);
 *
 * const specificDate = new Date('2024-01-01');
 * const specificWeekNumberFromObject = getWeek(specificDate); // 指定日期对象
 * console.log(`指定日期对象是一年中的第 ${specificWeekNumberFromObject} 周`);
 * ```
 */
export declare function getWeek(nowDay?: string | Date): number;
