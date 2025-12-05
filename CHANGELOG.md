# 更新日志

所有重要的更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增

- 添加开发路线图文档（ROADMAP.md）
- 添加更新日志文档（CHANGELOG.md）

### 修复

- 待修复：README.md 中的 Build Status 徽章链接
- 待修复：package.json 中缺少 repository URL

### 计划

- 建立完整的测试体系
- 配置代码质量工具（ESLint、Prettier）
- 配置 CI/CD 自动化流程

---

## [1.2.24] - 2024-10

### 新增

- 新增 `Watermark` 类：页面水印功能，支持防删除和自定义样式
- 新增 `WebSocketClient` 类：WebSocket 客户端封装，支持自动重连、心跳检测
- 新增 `deepMerge` 函数：递归合并多个对象
- 新增 `uniqueArray` 函数：数组去重，支持对象数组

### 改进

- 完善所有函数的 TypeScript 类型定义
- 优化 VuePress 文档，添加代码复制插件
- 改进文档示例和说明

---

## [1.2.x] - 历史版本

### 核心功能

#### 时间处理

- `handelTime`: 格式化日期时间
- `getWeek`: 获取周数
- `formatDuration`: 格式化时间差
- `getRelativeTime`: 获取相对时间

#### 数组操作

- `flattenArray`: 数组扁平化
- `sortArray`: 数组排序
- `uniqueArray`: 数组去重
- `cleanArray`: 清理假值
- `arrayToString`: 数组转字符串
- `stringToArray`: 字符串转数组
- `categorizeBy`: 数组分类
- `groupBy`: 数组分组
- `flattenTree`: 树形数据扁平化
- `convertToTree`: 扁平数据转树形
- `findPathInTree`: 查找树路径
- `lookupDictLabel`: 字典查找
- `customSortMethod`: 自定义排序

#### 对象操作

- `deepCopy`: 深拷贝
- `deepMerge`: 深度合并
- `filterObject`: 对象过滤

#### 字符串/数字

- `formatThousands`: 千分位格式化
- `htmlEscape`: HTML 转义
- `htmlUnescape`: HTML 反转义
- `cssEscape`: CSS 转义
- `jsEscape`: JS 转义
- `getRandomInt`: 随机整数

#### 浏览器 API

- `copyTextToClipboard`: 复制到剪贴板
- `enterFullscreen`: 进入全屏
- `exitFullscreen`: 退出全屏
- `getFullscreenElement`: 获取全屏元素
- `observeElementResize`: 监听元素尺寸变化
- `scrollToTop`: 滚动到顶部
- `scrollToBottom`: 滚动到底部

#### 性能优化

- `debounce`: 防抖函数
- `throttle`: 节流函数
- `runTasksWithConcurrency`: 并发任务控制

#### 实用类

- `TimeThread`: 时间线程类
- `ScrollDirectionChecker`: 滚动方向检测
- `FormValidator`: 表单验证
- `WebSocketClient`: WebSocket 客户端
- `Watermark`: 水印类

#### 工具函数

- `isType`: 类型检查
- `getQueryObject`: 解析 URL 参数
- `createExistenceChecker`: 存在性检查
- `workEvent`: 定时事件

---

## 版本说明

### 版本号规则

格式：`主版本号.次版本号.修订号`

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 更新类型

- **新增（Added）**：新功能
- **变更（Changed）**：对现有功能的变更
- **弃用（Deprecated）**：即将移除的功能
- **移除（Removed）**：已移除的功能
- **修复（Fixed）**：任何 bug 修复
- **安全（Security）**：安全性修复

---

## 贡献

欢迎提交 Pull Request 或 Issue！

---

**项目地址**：https://github.com/xuxiaomao123/xxm-test-js  
**NPM 地址**：https://www.npmjs.com/package/xxm-test-js  
**文档地址**：https://xuxiaomao123.github.io/xxm-test-js/
