# WebSocketClient - WebSocket 客户端封装类

## 简介

`WebSocketClient` 是一个功能完善的 WebSocket 客户端封装类，提供了自动重连、心跳检测、消息队列、事件监听等实用功能。适用于需要实时双向通信的应用场景。

## 主要特性

- ✅ **自动重连**：连接断开后自动尝试重新连接，可配置重连间隔和最大重连次数
- ✅ **心跳检测**：定时发送心跳包保持连接活跃，防止连接超时
- ✅ **消息队列**：连接未建立时自动缓存消息，连接成功后自动发送
- ✅ **智能错误处理**：达到最大重连次数后自动清理队列，防止内存泄漏
- ✅ **事件监听**：支持监听连接、断开、消息、错误、重连等事件
- ✅ **连接状态管理**：提供完整的连接状态跟踪和查询
- ✅ **TypeScript 支持**：完整的类型定义和智能提示
- ✅ **调试模式**：可选的调试日志输出

## 安装

```bash
npm install xxm-test-js
```

## 基本用法

### 创建实例

```typescript
import { WebSocketClient } from 'xxm-test-js';

// 创建 WebSocket 客户端实例
const ws = new WebSocketClient('ws://localhost:8080');

// 连接到服务器
ws.connect();
```

### 带配置选项的创建

```typescript
const ws = new WebSocketClient('ws://localhost:8080', {
  reconnect: true, // 启用自动重连
  reconnectInterval: 3000, // 重连间隔 3 秒
  maxReconnectAttempts: 10, // 最多重连 10 次
  heartbeat: true, // 启用心跳检测
  heartbeatInterval: 30000, // 心跳间隔 30 秒
  heartbeatMessage: 'ping', // 心跳消息内容
  connectionTimeout: 10000, // 连接超时时间 10 秒
  debug: true, // 启用调试日志
});
```

## 配置选项

| 选项                   | 类型                 | 默认值      | 说明                 |
| ---------------------- | -------------------- | ----------- | -------------------- |
| `reconnect`            | `boolean`            | `true`      | 是否启用自动重连     |
| `reconnectInterval`    | `number`             | `5000`      | 重连间隔时间（毫秒） |
| `maxReconnectAttempts` | `number`             | `Infinity`  | 最大重连次数         |
| `heartbeat`            | `boolean`            | `true`      | 是否启用心跳检测     |
| `heartbeatInterval`    | `number`             | `30000`     | 心跳间隔时间（毫秒） |
| `heartbeatMessage`     | `string \| object`   | `'ping'`    | 心跳消息内容         |
| `connectionTimeout`    | `number`             | `10000`     | 连接超时时间（毫秒） |
| `protocols`            | `string \| string[]` | `undefined` | WebSocket 子协议     |
| `debug`                | `boolean`            | `false`     | 是否启用调试日志     |

## API 方法

### connect()

建立 WebSocket 连接。

```typescript
ws.connect();
```

### disconnect(code?, reason?)

关闭 WebSocket 连接。

**参数：**

- `code` (可选): 关闭状态码
- `reason` (可选): 关闭原因

```typescript
ws.disconnect();
// 或指定关闭码和原因
ws.disconnect(1000, '正常关闭');
```

### send(data)

发送消息到服务器。支持字符串、对象、ArrayBuffer、Blob 等类型。

**参数：**

- `data`: 要发送的数据

**行为说明：**

- 连接已建立：立即发送消息
- 连接未建立但正在重连：消息加入队列，连接成功后自动发送
- 已达到最大重连次数：拒绝发送，触发 `error` 事件

```typescript
// 发送字符串
ws.send('Hello Server');

// 发送对象（自动转换为 JSON）
ws.send({ type: 'chat', message: 'Hello', userId: 123 });

// 发送二进制数据
const buffer = new ArrayBuffer(8);
ws.send(buffer);

// 处理发送失败的情况
ws.on('error', (error) => {
  if (error.message?.includes('无法发送消息')) {
    console.error('连接已失败，无法发送消息');
  }
});
```

### on(event, callback)

监听事件。

**参数：**

- `event`: 事件类型（'open' | 'close' | 'message' | 'error' | 'reconnect'）
- `callback`: 事件回调函数

```typescript
ws.on('open', () => {
  console.log('连接已建立');
});

ws.on('message', (data) => {
  console.log('收到消息:', data);
});

ws.on('error', (error) => {
  console.error('发生错误:', error);
});

ws.on('close', (event) => {
  console.log('连接已关闭:', event.code, event.reason);
});

ws.on('reconnect', (info) => {
  console.log('正在重连，第', info.attempt, '次尝试');
});
```

### off(event, callback)

移除事件监听。

**参数：**

- `event`: 事件类型
- `callback`: 要移除的回调函数

```typescript
const messageHandler = (data) => {
  console.log('收到消息:', data);
};

ws.on('message', messageHandler);
// 移除监听
ws.off('message', messageHandler);
```

### getReadyState()

获取当前连接状态码。

**返回值：**

- `0`: CONNECTING（正在连接）
- `1`: OPEN（已连接）
- `2`: CLOSING（正在关闭）
- `3`: CLOSED（已关闭）

```typescript
const state = ws.getReadyState();
console.log('连接状态码:', state);
```

### getStatus()

获取当前连接状态的中文描述。

**返回值：** `string`

```typescript
const status = ws.getStatus();
console.log('连接状态:', status); // 输出: "已连接"
```

### destroy()

销毁实例，清理所有资源（包括定时器、事件监听器等）。

```typescript
ws.destroy();
```

## 使用示例

### 示例 1：聊天应用

```typescript
import { WebSocketClient } from 'xxm-test-js';

class ChatApp {
  private ws: WebSocketClient;

  constructor() {
    this.ws = new WebSocketClient('ws://chat.example.com/ws', {
      reconnect: true,
      heartbeatInterval: 30000,
      debug: true,
    });

    this.setupListeners();
    this.ws.connect();
  }

  private setupListeners() {
    this.ws.on('open', () => {
      console.log('✅ 连接成功');
      this.updateStatus('在线');
    });

    this.ws.on('message', (data) => {
      if (data.type === 'chat') {
        this.displayMessage(data);
      }
    });

    this.ws.on('error', (error) => {
      console.error('❌ 连接错误:', error);
    });

    this.ws.on('close', () => {
      console.log('⚠️ 连接已断开');
      this.updateStatus('离线');
    });

    this.ws.on('reconnect', (info) => {
      console.log(`🔄 正在重连... (第 ${info.attempt} 次尝试)`);
    });
  }

  sendMessage(message: string) {
    this.ws.send({
      type: 'chat',
      message: message,
      timestamp: Date.now(),
    });
  }

  private displayMessage(data: any) {
    console.log(`[${data.username}]: ${data.message}`);
  }

  private updateStatus(status: string) {
    console.log('状态:', status);
  }

  disconnect() {
    this.ws.disconnect();
  }
}

// 使用
const chat = new ChatApp();
chat.sendMessage('Hello, World!');
```

### 示例 2：实时数据监控

```typescript
import { WebSocketClient } from 'xxm-test-js';

class DataMonitor {
  private ws: WebSocketClient;
  private dataHandlers: Map<string, Function> = new Map();

  constructor(url: string) {
    this.ws = new WebSocketClient(url, {
      reconnect: true,
      reconnectInterval: 5000,
      heartbeat: true,
      heartbeatMessage: { type: 'ping' },
    });

    this.ws.on('message', this.handleData.bind(this));
    this.ws.connect();
  }

  // 订阅数据流
  subscribe(dataType: string, handler: Function) {
    this.dataHandlers.set(dataType, handler);
    this.ws.send({
      action: 'subscribe',
      dataType: dataType,
    });
  }

  // 取消订阅
  unsubscribe(dataType: string) {
    this.dataHandlers.delete(dataType);
    this.ws.send({
      action: 'unsubscribe',
      dataType: dataType,
    });
  }

  private handleData(data: any) {
    const handler = this.dataHandlers.get(data.type);
    if (handler) {
      handler(data.payload);
    }
  }
}

// 使用
const monitor = new DataMonitor('ws://monitor.example.com');

monitor.subscribe('temperature', (data) => {
  console.log('温度:', data.value, '°C');
});

monitor.subscribe('humidity', (data) => {
  console.log('湿度:', data.value, '%');
});
```

### 示例 3：在 Vue 3 中使用

```vue
<template>
  <div>
    <div>连接状态: {{ status }}</div>
    <div>消息列表:</div>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.content }}</li>
    </ul>
    <input v-model="inputMessage" @keyup.enter="sendMessage" />
    <button @click="sendMessage">发送</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { WebSocketClient } from 'xxm-test-js';

const ws = ref<WebSocketClient | null>(null);
const status = ref('未连接');
const messages = ref<any[]>([]);
const inputMessage = ref('');

onMounted(() => {
  ws.value = new WebSocketClient('ws://localhost:8080', {
    debug: true,
  });

  ws.value.on('open', () => {
    status.value = '已连接';
  });

  ws.value.on('close', () => {
    status.value = '已断开';
  });

  ws.value.on('message', (data) => {
    messages.value.push({
      id: Date.now(),
      content: data,
    });
  });

  ws.value.connect();
});

onUnmounted(() => {
  ws.value?.destroy();
});

const sendMessage = () => {
  if (inputMessage.value && ws.value) {
    ws.value.send(inputMessage.value);
    inputMessage.value = '';
  }
};
</script>
```

### 示例 4：在 React 中使用

```typescript
import React, { useEffect, useState } from 'react';
import { WebSocketClient } from 'xxm-test-js';

function ChatComponent() {
  const [ws, setWs] = useState<WebSocketClient | null>(null);
  const [status, setStatus] = useState('未连接');
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const client = new WebSocketClient('ws://localhost:8080');

    client.on('open', () => setStatus('已连接'));
    client.on('close', () => setStatus('已断开'));
    client.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    client.connect();
    setWs(client);

    return () => {
      client.destroy();
    };
  }, []);

  const sendMessage = () => {
    if (input && ws) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <div>状态: {status}</div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>发送</button>
    </div>
  );
}

export default ChatComponent;
```

## 事件说明

### open 事件

连接成功建立时触发。

```typescript
ws.on('open', (event) => {
  console.log('连接已建立');
});
```

### close 事件

连接关闭时触发。

```typescript
ws.on('close', (event: CloseEvent) => {
  console.log('连接关闭', event.code, event.reason);
});
```

### message 事件

收到服务器消息时触发。如果消息是 JSON 格式，会自动解析。

```typescript
ws.on('message', (data) => {
  console.log('收到消息:', data);
});
```

### error 事件

发生错误时触发。包括连接错误、发送失败、达到最大重连次数等情况。

```typescript
ws.on('error', (error) => {
  console.error('发生错误:', error);

  // 判断是否为重连失败
  if (error.message?.includes('无法发送消息')) {
    console.error('已达到最大重连次数，连接已失败');
    // 可以在此通知用户或执行其他操作
  }
});
```

### reconnect 事件

开始重连时触发。

```typescript
ws.on('reconnect', (info) => {
  console.log(`正在第 ${info.attempt} 次重连`);
});
```

## 最佳实践

### 1. 合理设置心跳间隔

根据服务器的超时设置来配置心跳间隔，一般建议设置为服务器超时时间的 1/2 或 2/3。

```typescript
const ws = new WebSocketClient('ws://example.com', {
  heartbeatInterval: 30000, // 30 秒
  heartbeatMessage: { type: 'ping', timestamp: Date.now() },
});
```

### 2. 处理重连逻辑

在重连时可能需要重新进行身份验证或订阅数据。建议监听重连失败事件。

```typescript
ws.on('open', () => {
  // 发送认证信息
  ws.send({
    type: 'auth',
    token: localStorage.getItem('token'),
  });

  // 重新订阅数据
  ws.send({
    type: 'subscribe',
    channels: ['channel1', 'channel2'],
  });
});

// 监听重连失败
ws.on('error', (error) => {
  if (error.message?.includes('无法发送消息')) {
    // 已达到最大重连次数
    console.error('连接失败，请检查网络或稍后重试');
    // 可以显示重连按钮让用户手动重连
    showReconnectButton();
  }
});
```

### 3. 使用消息队列

在连接建立之前发送的消息会自动加入队列，连接成功后自动发送。

**注意：** 如果达到最大重连次数，消息队列会被自动清空以防止内存泄漏，后续发送的消息会被拒绝。

```typescript
const ws = new WebSocketClient('ws://example.com', {
  maxReconnectAttempts: 5, // 设置最大重连次数
});
ws.connect();

// 即使连接还未建立，消息也会被加入队列
ws.send({ type: 'message', content: 'Hello' });

// 监听发送失败
ws.on('error', (error) => {
  if (error.message?.includes('无法发送消息')) {
    // 重连失败后的消息会触发此错误
    console.error('消息发送失败，连接已断开');
  }
});
```

### 4. 及时清理资源

在组件卸载或页面关闭时，记得调用 `destroy()` 方法清理资源。

```typescript
// 在组件卸载时
onUnmounted(() => {
  ws.destroy();
});

// 或在 beforeunload 事件中
window.addEventListener('beforeunload', () => {
  ws.disconnect();
});
```

### 5. 错误处理

添加完善的错误处理逻辑。

```typescript
ws.on('error', (error) => {
  console.error('WebSocket 错误:', error);
  // 发送错误日志到监控系统
  sendErrorLog(error);
});

ws.on('close', (event) => {
  if (event.code !== 1000) {
    // 非正常关闭
    console.warn('连接异常关闭:', event.code, event.reason);
  }
});
```

## 注意事项

1. **浏览器兼容性**：WebSocket API 在所有现代浏览器中都得到支持，但在旧版本浏览器中可能不可用。
2. **连接限制**：浏览器对同一域名的 WebSocket 连接数量有限制，通常为 6-8 个。
3. **跨域问题**：WebSocket 连接受同源策略限制，服务器需要正确配置 CORS。
4. **安全性**：生产环境建议使用 `wss://`（WebSocket Secure）协议。
5. **消息大小**：避免发送过大的消息，可能导致性能问题或连接中断。
6. **重连失败处理**：达到最大重连次数后，消息队列会被自动清空，后续 `send()` 调用会触发 `error` 事件。建议监听此事件并提供用户反馈。
7. **内存管理**：长时间运行的应用应合理设置 `maxReconnectAttempts`，避免无限重连导致资源浪费。

## 浏览器支持

- Chrome 16+
- Firefox 11+
- Safari 7+
- Edge 12+
- Opera 12.1+
- IE 10+

## 许可证

MIT

## 相关链接

- [MDN WebSocket API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- [WebSocket 协议 RFC 6455](https://tools.ietf.org/html/rfc6455)
