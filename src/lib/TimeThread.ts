/**
 * 时间线程类，用于定时触发事件
 *
 * 使用场景：当需要在特定时间间隔内重复执行某些操作时，可以使用此类。
 * 例如，定时更新页面上的时钟显示、定时发送数据请求等。
 *
 * @param {number} intervalTime - 时间间隔（毫秒），表示事件触发的时间间隔。
 *
 * @returns {TimeThread} - 返回一个 TimeThread 实例，可用于控制事件的启动、暂停和终止。
 */
class TimeThread {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private intervalTime: number;

  constructor(intervalTime: number) {
    this.intervalTime = intervalTime;
  }

  start() {
    if (!this.intervalId) {
      const eventName = 'clock';
      window.CLOCK_EVENT = eventName;
      const clockEvent = new CustomEvent(eventName);
      this.intervalId = setInterval(() => {
        window.dispatchEvent(clockEvent);
      }, this.intervalTime);
    }
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  terminate() {
    this.pause();
  }
}

declare global {
  interface Window {
    CLOCK_EVENT: string;
  }
}

export { TimeThread };
