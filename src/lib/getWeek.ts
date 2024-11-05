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
export function getWeek(nowDay: string | Date = new Date()): number {
    let dateToCheck: Date;

    if (typeof nowDay === 'string') {
        dateToCheck = new Date(nowDay);
    } else {
        dateToCheck = nowDay;
    }

    // 获取当前年份的第一天
    const startOfYear = new Date(dateToCheck.getFullYear(), 0, 1);
    const dayOfWeek = startOfYear.getDay() || 7; // 获取1月1日是星期几，0表示周日，1表示周一...7表示周六

    // 计算该年第一个星期一的日期
    let firstMonday = new Date(startOfYear);
    firstMonday.setDate(startOfYear.getDate() + (1 - dayOfWeek + 7) % 7);

    // 如果当前日期小于第一个星期一，则是第0周
    if (dateToCheck < firstMonday) {
        return 52;
    }

    // 计算当前日期与第一个星期一之间的天数差
    const pastDays = Math.floor((dateToCheck.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000));

    // 计算当前是第几周，周一作为一周的开始
    const weekNumber = pastDays / 7 + 1;

    return Math.floor(weekNumber);
}
