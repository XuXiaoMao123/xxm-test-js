"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleTime_1 = require("./lib/handleTime");
const formatThousands_1 = require("./lib/formatThousands");
const getWeek_1 = require("./lib/getWeek");
const throttle_1 = require("./lib/throttle");
const debounce_1 = require("./lib/debounce");
const deepCopy_1 = require("./lib/deepCopy");
const flattenArray_1 = require("./lib/flattenArray");
const isType_1 = require("./lib/isType");
const sortArray_1 = require("./lib/sortArray");
const getQueryObject_1 = require("./lib/getQueryObject");
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
const xxmJs = {
    getWeek: getWeek_1.getWeek,
    handelTime: handleTime_1.handelTime,
    formatThousands: formatThousands_1.formatThousands,
    throttle: throttle_1.throttle,
    debounce: debounce_1.debounce,
    deepCopy: deepCopy_1.deepCopy,
    flattenArray: flattenArray_1.flattenArray,
    isType: isType_1.isType,
    sortArray: sortArray_1.sortArray,
    getQueryObject: getQueryObject_1.getQueryObject
};
exports.default = xxmJs;
//# sourceMappingURL=index.js.map