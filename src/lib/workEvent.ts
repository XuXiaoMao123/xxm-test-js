import { TimeThread } from './TimeThread';
/**
 * 启动一个时间线程，按照指定的时间间隔触发时钟事件，默认间隔为 5 分钟。
 *
 * @returns 一个已启动的 TimeThread 实例。
 *
 * @example
 * ```js
 * // 在 Vue 2 组件中使用 workEvent
 * export default {
 *   data() {
 *     return {
 *       timeThread: null
 *     };
 *   },
 *   mounted() {
 *     this.timeThread = workEvent();
 *     window.addEventListener(window.CLOCK_EVENT, this.handleClockEvent);
 *   },
 *   beforeDestroy() {
 *     if (this.timeThread) {
 *       this.timeThread.pause();
 *     }
 *     window.removeEventListener(window.CLOCK_EVENT, this.handleClockEvent);
 *   },
 *   methods: {
 *     handleClockEvent() {
 *       // 在这里执行具体任务
 *       console.log('Clock event triggered');
 *     }
 *   }
 * };
 * ```
 */

export function workEvent(intervalTime: number = 1000 * 60 * 5) {
  const timeThread = new TimeThread(intervalTime);
  timeThread.start();
  return timeThread;
}
