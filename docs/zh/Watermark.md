# Watermark - 页面水印类

## 简介

`Watermark` 是一个功能强大的页面水印类，用于在页面上添加防删除的文字水印。常用于版权保护、信息安全、防止截图泄密等场景。

## 主要特性

- ✅ **自定义内容**：支持单行或多行文字水印
- ✅ **样式配置**：可配置字体、颜色、大小、透明度、旋转角度等
- ✅ **防删除保护**：使用 MutationObserver 监听 DOM 变化，自动恢复被删除或修改的水印
- ✅ **高性能**：使用 Canvas 生成水印图案，以 base64 图片作为背景
- ✅ **响应式**：自动适配容器大小变化
- ✅ **易于销毁**：提供完整的销毁方法，清理所有资源

## 安装

```bash
npm install xxm-test-js
```

## 基本用法

### 简单示例

```typescript
import { Watermark } from 'xxm-test-js';

// 创建水印实例
const watermark = new Watermark({
  content: '机密文档',
});

// 显示水印
watermark.create();
```

### 多行水印

```typescript
const watermark = new Watermark({
  content: ['张三', '2024-01-01', '仅供内部使用'],
  fontSize: 14,
  opacity: 0.1,
});

watermark.create();
```

### 自定义样式

```typescript
const watermark = new Watermark({
  content: '版权所有',
  width: 250,
  height: 180,
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FF0000',
  opacity: 0.2,
  rotate: -30,
});

watermark.create();
```

## 配置选项

### WatermarkOptions

| 参数         | 类型                                                    | 默认值                          | 说明                                     |
| ------------ | ------------------------------------------------------- | ------------------------------- | ---------------------------------------- |
| `content`    | `string \| string[]`                                    | `'水印'`                        | 水印内容，支持字符串或字符串数组（多行） |
| `container`  | `HTMLElement`                                           | `document.body`                 | 水印容器元素                             |
| `width`      | `number`                                                | `200`                           | 水印宽度（像素）                         |
| `height`     | `number`                                                | `150`                           | 水印高度（像素）                         |
| `fontSize`   | `number`                                                | `16`                            | 字体大小（像素）                         |
| `fontStyle`  | `'normal' \| 'italic' \| 'oblique'`                     | `'normal'`                      | 字体样式                                 |
| `fontWeight` | `'normal' \| 'bold' \| 'bolder' \| 'lighter' \| number` | `'normal'`                      | 字体粗细                                 |
| `fontFamily` | `string`                                                | `'Microsoft YaHei, sans-serif'` | 字体系列                                 |
| `color`      | `string`                                                | `'#000000'`                     | 文字颜色                                 |
| `opacity`    | `number`                                                | `0.15`                          | 透明度（0-1）                            |
| `rotate`     | `number`                                                | `-20`                           | 旋转角度（度数，正数顺时针，负数逆时针） |
| `zIndex`     | `number`                                                | `9999`                          | 层级                                     |
| `lineHeight` | `number`                                                | `20`                            | 行间距（仅多行时有效）                   |
| `monitor`    | `boolean`                                               | `true`                          | 是否启用防删除保护                       |
| `id`         | `string`                                                | `'watermark-container'`         | 水印层的 DOM id                          |

## API 方法

### create()

创建并显示水印。

```typescript
watermark.create();
```

### update(options)

更新水印配置并重新渲染。

**参数：**

- `options`: 新的配置选项（部分更新）

```typescript
// 更新水印内容
watermark.update({
  content: '新的水印内容',
  color: '#FF0000',
});
```

### destroy()

销毁水印，移除 DOM 元素并清理所有监听器。

```typescript
watermark.destroy();
```

## 使用场景

### 场景 1：后台管理系统

在敏感信息页面添加用户信息水印，防止截图泄密。

```typescript
import { Watermark } from 'xxm-test-js';

// 获取当前登录用户信息
const userInfo = {
  name: '张三',
  id: 'U001',
  time: new Date().toLocaleString(),
};

// 创建水印
const watermark = new Watermark({
  content: [userInfo.name, `工号: ${userInfo.id}`, userInfo.time],
  fontSize: 14,
  opacity: 0.12,
  rotate: -20,
  color: '#000000',
  monitor: true, // 启用防删除
});

watermark.create();
```

### 场景 2：文档预览页面

为在线文档添加版权水印。

```typescript
const watermark = new Watermark({
  content: '版权所有 © 2024 公司名称',
  fontSize: 16,
  opacity: 0.1,
  rotate: -15,
  fontWeight: 'bold',
});

watermark.create();
```

### 场景 3：指定容器水印

在特定容器内添加水印（如某个 div）。

```typescript
const container = document.getElementById('content-area');

const watermark = new Watermark({
  content: '内部资料',
  container: container,
  fontSize: 18,
  opacity: 0.08,
});

watermark.create();
```

### 场景 4：动态水印

根据不同情况动态更新水印内容。

```typescript
const watermark = new Watermark({
  content: '草稿',
});

watermark.create();

// 文档状态改变时更新水印
function onDocumentStatusChange(status) {
  switch (status) {
    case 'draft':
      watermark.update({ content: '草稿', color: '#999999' });
      break;
    case 'review':
      watermark.update({ content: '审核中', color: '#FF9800' });
      break;
    case 'approved':
      watermark.update({ content: '已批准', color: '#4CAF50' });
      break;
  }
}
```

### 场景 5：在 Vue 3 中使用

```vue
<template>
  <div ref="containerRef" class="content-area">
    <!-- 页面内容 -->
    <h1>敏感信息页面</h1>
    <p>这是一些需要保护的内容...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Watermark } from 'xxm-test-js';

const containerRef = ref<HTMLElement>();
let watermark: Watermark | null = null;

onMounted(() => {
  if (containerRef.value) {
    // 创建水印
    watermark = new Watermark({
      content: ['张三', 'ID: 12345', new Date().toLocaleDateString()],
      container: containerRef.value,
      fontSize: 14,
      opacity: 0.15,
      rotate: -20,
      monitor: true,
    });

    watermark.create();
  }
});

onUnmounted(() => {
  // 清理水印
  watermark?.destroy();
});
</script>

<style scoped>
.content-area {
  position: relative;
  min-height: 100vh;
  padding: 20px;
}
</style>
```

### 场景 6：在 React 中使用

```typescript
import React, { useEffect, useRef } from 'react';
import { Watermark } from 'xxm-test-js';

function SecureDocument() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<Watermark | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 创建水印
      watermarkRef.current = new Watermark({
        content: ['机密文档', 'Confidential', new Date().toLocaleDateString()],
        container: containerRef.current,
        fontSize: 16,
        opacity: 0.12,
        color: '#FF0000',
        rotate: -25,
        monitor: true,
      });

      watermarkRef.current.create();
    }

    // 清理函数
    return () => {
      watermarkRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '100vh' }}>
      <h1>机密文档</h1>
      <p>这是需要保护的敏感内容...</p>
    </div>
  );
}

export default SecureDocument;
```

### 场景 7：临时水印

在某些操作期间临时显示水印。

```typescript
import { Watermark } from 'xxm-test-js';

let tempWatermark: Watermark | null = null;

// 开始敏感操作时显示水印
function startSensitiveOperation() {
  tempWatermark = new Watermark({
    content: ['正在进行敏感操作', '请勿截图'],
    fontSize: 20,
    opacity: 0.3,
    color: '#FF0000',
    fontWeight: 'bold',
  });
  tempWatermark.create();
}

// 操作完成后移除水印
function endSensitiveOperation() {
  tempWatermark?.destroy();
  tempWatermark = null;
}

// 使用示例
async function handleSensitiveTask() {
  startSensitiveOperation();

  try {
    // 执行敏感操作
    await performTask();
  } finally {
    endSensitiveOperation();
  }
}
```

### 场景 8：多实例水印

在不同容器中创建多个独立的水印。

```typescript
// 为不同区域创建不同的水印
const headerWatermark = new Watermark({
  content: 'Header Area',
  container: document.querySelector('.header'),
  id: 'watermark-header',
  fontSize: 12,
  opacity: 0.08,
});

const mainWatermark = new Watermark({
  content: ['Main Content', 'Confidential'],
  container: document.querySelector('.main'),
  id: 'watermark-main',
  fontSize: 16,
  opacity: 0.12,
});

const footerWatermark = new Watermark({
  content: 'Footer Area',
  container: document.querySelector('.footer'),
  id: 'watermark-footer',
  fontSize: 10,
  opacity: 0.06,
});

headerWatermark.create();
mainWatermark.create();
footerWatermark.create();
```

## 高级用法

### 防删除保护原理

水印类使用 `MutationObserver` API 监听 DOM 变化，当检测到水印被删除或修改时，会自动重新创建水印。

```typescript
// 启用防删除保护（默认开启）
const watermark = new Watermark({
  content: '受保护的水印',
  monitor: true, // 启用监听
});

watermark.create();

// 即使用户通过开发者工具删除水印元素，它也会立即重新出现
```

### 禁用防删除保护

在某些场景下，你可能希望水印可以被移除：

```typescript
const watermark = new Watermark({
  content: '普通水印',
  monitor: false, // 禁用防删除保护
});

watermark.create();
```

### 自定义容器

为特定元素添加水印：

```typescript
const myContainer = document.getElementById('my-container');

// 确保容器有相对或绝对定位
myContainer.style.position = 'relative';

const watermark = new Watermark({
  content: '区域水印',
  container: myContainer,
});

watermark.create();
```

### 响应式水印

水印会自动响应容器大小的变化：

```typescript
const watermark = new Watermark({
  content: '响应式水印',
  container: document.querySelector('.responsive-container'),
});

watermark.create();

// 当容器大小改变时，水印会自动调整
```

## 样式定制

### 调整密度

通过调整 `width` 和 `height` 来控制水印的密度：

```typescript
// 密集水印
const denseWatermark = new Watermark({
  content: '密集',
  width: 150,
  height: 100,
});

// 稀疏水印
const sparseWatermark = new Watermark({
  content: '稀疏',
  width: 300,
  height: 250,
});
```

### 不同颜色主题

```typescript
// 浅色主题（深色水印）
const lightTheme = new Watermark({
  content: '浅色主题',
  color: '#000000',
  opacity: 0.12,
});

// 深色主题（浅色水印）
const darkTheme = new Watermark({
  content: '深色主题',
  color: '#FFFFFF',
  opacity: 0.08,
});
```

### 不同旋转角度

```typescript
// 逆时针旋转
const watermark1 = new Watermark({
  content: '逆时针',
  rotate: -20,
});

// 顺时针旋转
const watermark2 = new Watermark({
  content: '顺时针',
  rotate: 20,
});

// 水平方向
const watermark3 = new Watermark({
  content: '水平',
  rotate: 0,
});
```

## 最佳实践

### 1. 合理设置透明度

透明度太高会影响阅读体验，太低则失去水印效果。建议范围：0.08 - 0.20。

```typescript
const watermark = new Watermark({
  content: '推荐透明度',
  opacity: 0.12, // 推荐值
});
```

### 2. 选择合适的旋转角度

建议使用 -30° 到 -15° 之间的角度，这样既能保证水印效果，又不会太过突兀。

```typescript
const watermark = new Watermark({
  content: '推荐角度',
  rotate: -20, // 推荐值
});
```

### 3. 及时清理资源

在组件卸载或页面关闭时，记得调用 `destroy()` 方法。

```typescript
// Vue
onUnmounted(() => {
  watermark?.destroy();
});

// React
useEffect(() => {
  return () => {
    watermark?.destroy();
  };
}, []);
```

### 4. 确保容器有定位

水印使用绝对定位，确保容器元素有 `position: relative` 或 `position: absolute`。

```typescript
const container = document.getElementById('container');
container.style.position = 'relative'; // 重要！

const watermark = new Watermark({
  container: container,
  content: '容器水印',
});
```

### 5. 根据场景调整防删除策略

- **高安全场景**：启用 `monitor: true`
- **普通场景**：可以禁用 `monitor: false` 以提高性能

```typescript
// 高安全场景
const secureWatermark = new Watermark({
  content: '机密',
  monitor: true,
});

// 普通场景
const normalWatermark = new Watermark({
  content: '普通',
  monitor: false,
});
```

## 注意事项

1. **性能考虑**：启用 `monitor` 会持续监听 DOM 变化，在复杂页面中可能影响性能
2. **容器定位**：确保容器元素有 `position: relative` 或 `position: absolute`
3. **层级问题**：如果水印被其他元素遮挡，可以调整 `zIndex` 值
4. **移动端兼容**：在移动设备上注意调整字体大小和密度
5. **内容长度**：过长的内容可能超出水印范围，建议分多行显示
6. **颜色对比**：确保水印颜色与背景有足够的对比度

## 浏览器支持

- Chrome 51+
- Firefox 14+
- Safari 10+
- Edge 12+
- Opera 38+
- IE 11+（MutationObserver 支持）

注意：`ResizeObserver` 在旧版浏览器中可能不支持，会自动降级到 `window.resize` 事件。

## 常见问题

### Q: 水印可以被删除吗？

A: 如果启用了 `monitor: true`（默认启用），即使用户通过开发者工具删除水印，它也会自动恢复。但这并不能完全防止技术手段的绕过。

### Q: 如何让水印不影响页面交互？

A: 水印使用 `pointer-events: none` 样式，不会影响页面的点击和交互。

### Q: 可以在特定元素上添加水印吗？

A: 可以，通过 `container` 选项指定目标元素即可。

### Q: 水印会影响页面性能吗？

A: 水印使用 Canvas 生成 base64 图片，性能影响很小。但启用 `monitor` 会持续监听 DOM，在复杂页面可能有轻微影响。

### Q: 如何实现多种语言的水印？

A: 直接在 `content` 中使用对应语言的文字即可，支持中文、英文、日文等。

```typescript
const watermark = new Watermark({
  content: ['Confidential', '机密', '秘密'],
  fontFamily: 'Arial, Microsoft YaHei, sans-serif',
});
```

## 许可证

MIT

## 相关链接

- [Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)
