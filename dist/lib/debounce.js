"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
/**
 * 创建一个防抖函数，该函数会延迟调用 `func` 直到自最后一次调用防抖函数后 `delay` 毫秒已过去。
 * Copyright (c) 2024 xxm
 *
 * @template T - 函数类型，表示被防抖的函数。
 * @param {T} func - 需要防抖的函数。
 * @param {number} delay - 延迟执行的时间，单位为毫秒。
 * @returns {(...args: Parameters<T>) => void} 返回一个防抖后的函数。
 * @example
 *
 * ```js
 * //以下是一个使用 `debounce` 函数的例子，用于在用户停止输入后延迟执行搜索操作：
 * function search(query: string) {
 *   console.log(`Searching for: ${query}`);
 * }
 *
 * const debouncedSearch = debounce(search, 300);
 *
 * // 假设这个函数被绑定到一个输入框的 'input' 事件
 * document.getElementById('search-input').addEventListener('input', (event) => {
 *   debouncedSearch(event.target.value);
 * });
 * ```
 */
function debounce(func, delay) {
    let inDebounce;
    return function (...args) {
        if (inDebounce !== undefined) {
            clearTimeout(inDebounce);
        }
        inDebounce = window.setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
//# sourceMappingURL=debounce.js.map