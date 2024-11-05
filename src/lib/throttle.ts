/**
 * 创建一个节流函数，该函数会在最后一次调用后的指定时间后停止执行。
 * Copyright (c) 2024 xxm
 * 
 * @param func - 需要节流的函数。
 * @param limit - 节流的时间间隔，单位是毫秒。
 * @returns 一个新的函数，该函数会在节流时间内限制原函数的执行。
 * @example
 * 
 * ```js
 * // 示例：处理滚动事件
 * function handleScroll() {
 *     console.log('页面正在滚动...');
 *     // 在这里可以执行一些操作，例如更新页面上的某些元素，
 *     // 计算滚动位置等。
 * }
 *
 * // 使用 throttle 包装 handleScroll 函数，设置节流时间为 200 毫秒
 * const throttledHandleScroll = throttle(handleScroll, 200);
 *
 * // 绑定到窗口的 scroll 事件上
 * window.addEventListener('scroll', throttledHandleScroll);
 * ```
 */
export function throttle<T extends (...args: any[]) => void, C extends {} = any>(func: T, limit: number): (this: C, ...args: Parameters<T>) => void {
    let lastFunc: number | null = null;
    let lastRan: number = 0;

    return function(this: C, ...args: Parameters<T>) {
        const context = this;
        const time = Date.now();

        if (!lastFunc || (time - lastRan >= limit)) {
            func.apply(context, args);
            lastRan = time;
            lastFunc = null;
        } else {
            if (lastFunc) {
                clearTimeout(lastFunc);
            }
            lastFunc = setTimeout(() => {
                func.apply(context, args);
                lastRan = time;
            }, limit);
        }
    };
}