# 时间线程类（TimeThread）

## 概述

`TimeThread` 类用于定时触发事件。

## 版权信息

版权所有 © 2024 xxm

## 类签名

```typescript
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
class TimeThread;
```

## 参数

- `intervalTime`: 时间间隔，单位是毫秒。

## 方法

### start()

启动时间线程，按照指定的时间间隔触发时钟事件。

### pause()

暂停时间线程。

### terminate()

终止时间线程，等同于调用 `pause()` 方法。

## 示例用法

```js
// 创建一个 TimeThread 实例，时间间隔为 1000 毫秒
const timeThread = new TimeThread(1000);

// 启动时间线程
window.addEventListener('load', () => {
  timeThread.start();
  window.addEventListener(window.CLOCK_EVENT, () => {
    console.log('Clock event triggered');
  });
});

// 暂停时间线程
window.addEventListener('beforeunload', () => {
  timeThread.pause();
});
```

## 适用场景

- 定时任务：在需要定时执行某些任务的场景中，如定时刷新数据、定时检查状态等。

## 总结

- `TimeThread` 类是一个方便的工具，它可以帮助我们在指定的时间间隔内触发时钟事件，从而实现定时任务的功能。

## 引入

- 要在使用的项目中使用 `TimeThread` 类，您可以单独引入：

```js
import { TimeThread } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
