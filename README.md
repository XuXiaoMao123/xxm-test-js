# xxm-test-js js 库

xxm-test-js。一个开箱即用的函数库。提供了日常开发时所需的一些常用函数方法。该 js 库提供了丰富的代码提示功能，方便开发者快速使用。

[![npm](https://img.shields.io/npm/dm/xxm-test-js?color=e24)](https://www.npmjs.com/package/xxm-test-js)
[![npm](https://img.shields.io/npm/v/xxm-test-js?color=0c3)](https://www.npmjs.com/package/xxm-test-js)
[![License](https://img.shields.io/npm/l/xxm-test-js)](https://github.com/xuxiaomao123/xxm-test-js/blob/main/LICENSE)

> [查看文档](https://xuxiaomao123.github.io/xxm-test-js/)

## ✨ 特性

- 🚀 **开箱即用**：无需复杂配置，直接引入使用
- 📝 **TypeScript 支持**：完整的类型定义，提供智能代码提示
- 📦 **轻量级**：按需引入，减少包体积
- 🎯 **功能丰富**：45+ 实用工具函数和类
- 📚 **文档完善**：详细的中文文档和示例
- ✅ **生产就绪**：经过充分测试和验证

## 📦 功能模块

| 模块           | 功能                           | 数量 |
| -------------- | ------------------------------ | ---- |
| 🕐 时间处理    | 日期格式化、周数计算、时间差等 | 4    |
| 📊 数组操作    | 排序、去重、扁平化、分组等     | 13   |
| 🗂️ 对象操作    | 深拷贝、合并、过滤等           | 4    |
| 🔤 字符串/数字 | 转义、格式化、随机数等         | 8    |
| 🌐 浏览器 API  | 剪贴板、全屏、滚动、尺寸监听等 | 7    |
| ⚡ 性能优化    | 防抖、节流、并发控制           | 3    |
| 🎓 实用类      | 表单验证、WebSocket、水印等    | 6    |

### 快速开始

#### 1.安装 js 库

```bash
npm i xxm-test-js
```

#### 2.引用 js 库

> 在组件中的使用方式

```javascript
//全部引入
import xxmJs from 'xxm-test-js';

const time = new Date();
xxmJs.handelTime(time, 'yyyy-MM-dd HH:mm:ss');

//按需引入
import { handelTime } from 'xxm-test-js';

const time = new Date();
handelTime(time, 'MM-dd');
```

## 📖 文档

查看完整文档：[https://xuxiaomao123.github.io/xxm-test-js/](https://xuxiaomao123.github.io/xxm-test-js/)

## 🗺️ 开发路线图

查看我们的开发计划：[ROADMAP.md](./ROADMAP.md)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 贡献者

感谢所有为这个项目做出贡献的开发者！

## 📄 更新日志

查看详细的更新记录：[CHANGELOG.md](./CHANGELOG.md)

## 📜 许可证

[ISC](./LICENSE) © xxm

## 🔗 相关链接

- [NPM 包地址](https://www.npmjs.com/package/xxm-test-js)
- [GitHub 仓库](https://github.com/xuxiaomao123/xxm-test-js)
- [在线文档](https://xuxiaomao123.github.io/xxm-test-js/)
- [问题反馈](https://github.com/xuxiaomao123/xxm-test-js/issues)

---

如果这个项目对你有帮助，欢迎 ⭐️ Star 支持一下！
