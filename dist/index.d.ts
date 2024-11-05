import { handelTime } from "./lib/handleTime";
import { formatThousands } from "./lib/formatThousands";
import { getWeek } from "./lib/getWeek";
import { throttle } from "./lib/throttle";
import { debounce } from "./lib/debounce";
import { deepCopy } from "./lib/deepCopy";
import { flattenArray } from "./lib/flattenArray";
import { isType } from "./lib/isType";
import { sortArray } from "./lib/sortArray";
import { getQueryObject } from "./lib/getQueryObject";
/**
 * xxmJs 通用js方法集
 * Copyright (c) 2024 xxm
 * @getWeek 获取指定日期所在的周数（符合中国的周定义，即周一作为一周的开始）。
 * @handelTime 格式化日期时间字符串。
 * @formatThousands 格式化数字，添加千分位分隔符。
 * @throttle 创建一个节流函数，该函数会在最后一次调用后的指定时间后停止执行。
 * @debounce 创建一个防抖函数，该函数会延迟调用 `func` 直到自最后一次调用防抖函数后 `delay` 毫秒已过去。
 * @deepCopy 创建一个对象或数组的深拷贝。
 * @flattenArray 将嵌套数组展平成一维数组。
 * @isType 创建一个函数来检查对象是否为指定的类型。
 * @sortArray 通用排序函数 对普通数组或对象数组根据指定字段进行升序或降序排序
 * @getQueryObject 解析URL查询字符串并返回一个对象，其中包含查询参数的键值对。
 */
declare const xxmJs: {
    getWeek: typeof getWeek;
    handelTime: typeof handelTime;
    formatThousands: typeof formatThousands;
    throttle: typeof throttle;
    debounce: typeof debounce;
    deepCopy: typeof deepCopy;
    flattenArray: typeof flattenArray;
    isType: typeof isType;
    sortArray: typeof sortArray;
    getQueryObject: typeof getQueryObject;
};
export default xxmJs;
