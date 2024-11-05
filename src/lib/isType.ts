/**
 * 创建一个函数来检查对象是否为指定的类型。
 * Copyright (c) 2024 xxm
 * 
 * @param type 要检查的类型，可以是 'array', 'null', 'object' 或者其他基本类型。
 * @returns 返回一个函数，该函数接受一个对象并返回一个布尔值，指示对象是否为指定类型。
 * @example
 * ```js
 * // 使用示例
 * const isString = isType('string');
 * console.log(isString("Hello")); // 输出：true
 * 
 * const isArray = isType('array');
 * console.log(isArray([1, 2, 3])); // 输出：true
 * 
 * const isNull = isType('null');
 * console.log(isNull(null)); // 输出：true

 * const isObject = isType('object');
 * console.log(isObject({})); // 输出：true
 * ```
 */
export function isType(type: string): (obj: any) => boolean {
    return function(obj: any): boolean {
        switch (type) {
            case 'array':
                return Array.isArray(obj);
            case 'null':
                return obj === null;
            case 'object':
                return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
            default:
                return typeof obj === type;
        }
    };
}







