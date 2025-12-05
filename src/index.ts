import { handelTime } from './lib/handelTime';
import { formatThousands } from './lib/formatThousands';
import { getWeek } from './lib/getWeek';
import { formatDuration } from './lib/formatDuration';
import { throttle } from './lib/throttle';
import { debounce } from './lib/debounce';
import { deepCopy } from './lib/deepCopy';
import { flattenArray } from './lib/flattenArray';
import { isType } from './lib/isType';
import { runTasksWithConcurrency } from './lib/runTasksWithConcurrency';
import { sortArray } from './lib/sortArray';
import { uniqueArray } from './lib/uniqueArray';
import { getQueryObject } from './lib/getQueryObject';
import { cleanArray } from './lib/cleanArray';
import { copyTextToClipboard } from './lib/copyTextToClipboard';
import { convertToTree } from './lib/convertToTree';
import { flattenTree } from './lib/flattenTree';
import { arrayToString } from './lib/arrayToString';
import { stringToArray } from './lib/stringToArray';
import { categorizeBy } from './lib/categorizeBy';
import { lookupDictLabel } from './lib/lookupDictLabel';
import { createExistenceChecker } from './lib/createExistenceChecker';
import { customSortMethod } from './lib/customSortMethod';
import { groupBy } from './lib/groupBy';
import { enterFullscreen } from './lib/enterFullscreen';
import { exitFullscreen } from './lib/exitFullscreen';
import { getFullscreenElement } from './lib/getFullscreenElement';
import { observeElementResize, unobserveElementResize } from './lib/observeElementResize';
import { findPathInTree } from './lib/findPathInTree';
import { filterObject } from './lib/filterObject';
import { getRandomInt } from './lib/getRandomInt';
import { htmlEscape } from './lib/htmlEscape';
import { htmlUnescape } from './lib/htmlUnescape';
import { cssEscape } from './lib/cssEscape';
import { jsEscape } from './lib/jsEscape';
import { workEvent } from './lib/workEvent';
import { TimeThread } from './lib/TimeThread';
import { getRelativeTime } from './lib/getRelativeTime';
import { scrollToTop } from './lib/scrollToTop';
import { scrollToBottom } from './lib/scrollToBottom';
import { ScrollDirectionChecker } from './lib/ScrollDirectionChecker';
import { FormValidator } from './lib/FormValidator';
import { deepMerge } from './lib/merge';
import { WebSocketClient } from './lib/WebSocketClient';
import { Watermark } from './lib/Watermark';

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
 * @runTasksWithConcurrency 并发执行一组异步任务
 * @sortArray 通用排序函数 对普通数组或对象数组根据指定字段进行升序或降序排序
 * @uniqueArray 数组去重函数，支持基本类型和对象类型的数组去重。
 * @getQueryObject 解析URL查询字符串并返回一个对象，其中包含查询参数的键值对。
 * @cleanArray 清理数组中的假值（falsy values），返回仅含真值（truthy values）的一维数组。
 * @copyTextToClipboard 将文本复制到剪贴板。
 * @convertToTree 将扁平数据结构转换为树形结构。
 * @flattenTree 将树形结构的数据扁平化为数组。
 * @arrayToString 将数组转换为字符串。
 * @stringToArray 将字符串转换为数组。
 * @categorizeBy 根据对象数组中每个元素指定属性的值进行分类。
 * @formatDuration 格式化时间差（如"1小时30分钟"）
 * @filterObject 根据条件过滤对象的属性。
 * @groupBy 根据指定条件对数组元素进行分组。
 * @lookupDictLabel 根据提供的值和键名，在数据字典中查找并返回目标键的值（通常是标签）。
 * @createExistenceChecker 创建一个存在性检查函数，用于验证给定值是否存在于预定义的字符串列表中。
 * @customSortMethod 创建一个多级排序函数，用于对给定的数据数组按照指定的排序规则进行排序。
 * @enterFullscreen 请求指定元素进入全屏模式。
 * @exitFullscreen 退出全屏模式方法
 * @getFullscreenElement 获取当前处于全屏模式的元素。
 * @observeElementResize 监听元素尺寸变化并执行回调函数
 * @unobserveElementResize 取消对元素尺寸变化的监听
 * @findPathInTree 查找树形数据中从根节点到目标节点的完整路径，未找到则返回空数组
 * @getRandomInt 获取指定范围内的随机整数。
 * @htmlEscape 将字符串进行 HTML 转义
 * @htmlUnescape 将经过 HTML 转义的字符串进行反转义
 * @cssEscape 将字符串进行 CSS 转义
 * @jsEscape 将字符串进行 JS 转义
 * @workEvent 启动一个时间线程，按照指定的时间间隔触发时钟事件，默认间隔为 5 分钟。
 * @TimeThread 时间线程类，用于定时触发事件
 * @getRelativeTime 获取相对时间，如刚刚、几天前、几个月前、几年前。
 * @scrollToTop 滚动到容器顶部。
 * @scrollToBottom 滚动到容器底部。
 * @ScrollDirectionChecker 检测页面滚动方向。
 * @FormValidator 表单验证类，用于确保输入数据的有效性。
 * @deepMerge 递归合并两个或多个对象
 * @WebSocketClient WebSocket 客户端封装类，支持自动重连、心跳检测、消息队列等功能
 * @Watermark 页面水印类，用于添加防删除的文字水印，支持自定义样式和防篡改保护
 */
const xxmJs = {
  getWeek,
  handelTime,
  formatThousands,
  throttle,
  debounce,
  deepCopy,
  flattenArray,
  isType,
  runTasksWithConcurrency,
  sortArray,
  uniqueArray,
  getQueryObject,
  cleanArray,
  copyTextToClipboard,
  convertToTree,
  flattenTree,
  arrayToString,
  stringToArray,
  categorizeBy,
  formatDuration,
  groupBy,
  lookupDictLabel,
  createExistenceChecker,
  customSortMethod,
  enterFullscreen,
  exitFullscreen,
  getFullscreenElement,
  observeElementResize,
  unobserveElementResize,
  findPathInTree,
  filterObject,
  getRandomInt,
  htmlEscape,
  htmlUnescape,
  cssEscape,
  jsEscape,
  workEvent,
  TimeThread,
  getRelativeTime,
  scrollToTop,
  scrollToBottom,
  ScrollDirectionChecker,
  FormValidator,
  deepMerge,
  WebSocketClient,
  Watermark,
};
export default xxmJs;

export {
  getWeek,
  handelTime,
  formatThousands,
  throttle,
  debounce,
  deepCopy,
  flattenArray,
  isType,
  runTasksWithConcurrency,
  sortArray,
  uniqueArray,
  getQueryObject,
  cleanArray,
  copyTextToClipboard,
  convertToTree,
  flattenTree,
  arrayToString,
  stringToArray,
  categorizeBy,
  formatDuration,
  groupBy,
  lookupDictLabel,
  createExistenceChecker,
  customSortMethod,
  enterFullscreen,
  exitFullscreen,
  getFullscreenElement,
  observeElementResize,
  unobserveElementResize,
  findPathInTree,
  filterObject,
  getRandomInt,
  htmlEscape,
  htmlUnescape,
  cssEscape,
  jsEscape,
  workEvent,
  TimeThread,
  getRelativeTime,
  scrollToTop,
  scrollToBottom,
  ScrollDirectionChecker,
  FormValidator,
  deepMerge,
  WebSocketClient,
  Watermark,
};
