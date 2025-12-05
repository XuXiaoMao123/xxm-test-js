/**
 * WebSocket 客户端封装类
 *
 * 使用场景：用于建立和管理 WebSocket 连接，提供自动重连、心跳检测、消息队列等功能。
 * 适用于需要实时双向通信的应用，如聊天应用、实时数据推送、在线协作等。
 *
 * 主要特性：
 * - 自动重连：连接断开后自动尝试重新连接
 * - 心跳检测：定时发送心跳包保持连接活跃
 * - 消息队列：连接未建立时缓存消息，连接成功后自动发送
 * - 事件监听：支持监听连接、断开、消息、错误等事件
 * - 连接状态管理：提供完整的连接状态跟踪
 *
 * @example
 * ```typescript
 * const ws = new WebSocketClient('ws://localhost:8080', {
 *   reconnectInterval: 3000,
 *   heartbeatInterval: 30000,
 *   heartbeatMessage: 'ping'
 * });
 *
 * ws.on('open', () => console.log('连接成功'));
 * ws.on('message', (data) => console.log('收到消息:', data));
 * ws.on('error', (error) => console.error('连接错误:', error));
 * ws.on('close', () => console.log('连接关闭'));
 *
 * ws.connect();
 * ws.send({ type: 'chat', message: 'Hello' });
 * ```
 */

interface WebSocketClientOptions {
  /**
   * 自动重连开关，默认 true
   */
  reconnect?: boolean;
  /**
   * 重连间隔时间（毫秒），默认 5000ms
   */
  reconnectInterval?: number;
  /**
   * 最大重连次数，默认 Infinity（无限次）
   */
  maxReconnectAttempts?: number;
  /**
   * 心跳检测开关，默认 true
   */
  heartbeat?: boolean;
  /**
   * 心跳间隔时间（毫秒），默认 30000ms
   */
  heartbeatInterval?: number;
  /**
   * 心跳消息内容，默认 'ping'
   */
  heartbeatMessage?: string | object;
  /**
   * 连接超时时间（毫秒），默认 10000ms
   */
  connectionTimeout?: number;
  /**
   * WebSocket 子协议
   */
  protocols?: string | string[];
  /**
   * 是否启用调试日志，默认 false
   */
  debug?: boolean;
}

type EventType = 'open' | 'close' | 'message' | 'error' | 'reconnect';
type WebSocketMessage = string | object | ArrayBuffer | Blob | ArrayBufferView;
type EventCallbackData = WebSocketMessage | Event | CloseEvent | MessageEvent | { attempt: number } | undefined;
type EventCallback = (data?: EventCallbackData) => void;

class WebSocketClient {
  private url: string;
  private options: Required<Omit<WebSocketClientOptions, 'protocols'>> & {
    protocols?: string | string[];
  };
  private ws: WebSocket | null = null;
  private reconnectAttempts: number = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private connectionTimer: ReturnType<typeof setTimeout> | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private eventListeners: Map<EventType, Set<EventCallback>> = new Map();
  private isManualClose: boolean = false;
  private isReconnectAbandoned: boolean = false;

  constructor(url: string, options: WebSocketClientOptions = {}) {
    this.url = url;
    this.options = {
      reconnect: options.reconnect ?? true,
      reconnectInterval: options.reconnectInterval ?? 5000,
      maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
      heartbeat: options.heartbeat ?? true,
      heartbeatInterval: options.heartbeatInterval ?? 30000,
      heartbeatMessage: options.heartbeatMessage ?? 'ping',
      connectionTimeout: options.connectionTimeout ?? 10000,
      protocols: options.protocols,
      debug: options.debug ?? false,
    };

    // 初始化事件监听器集合
    ['open', 'close', 'message', 'error', 'reconnect'].forEach((event) => {
      this.eventListeners.set(event as EventType, new Set());
    });
  }

  /**
   * 建立 WebSocket 连接
   */
  public connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.log('WebSocket 已连接，无需重复连接');
      return;
    }

    try {
      this.isManualClose = false;
      this.isReconnectAbandoned = false;
      this.log(`正在连接到 ${this.url}...`);

      // 创建 WebSocket 连接
      if (this.options.protocols) {
        this.ws = new WebSocket(this.url, this.options.protocols);
      } else {
        this.ws = new WebSocket(this.url);
      }

      // 设置连接超时
      this.connectionTimer = setTimeout(() => {
        if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
          this.log('连接超时');
          this.ws.close();
          this.handleReconnect();
        }
      }, this.options.connectionTimeout);

      // 绑定事件处理器
      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
    } catch (error) {
      this.log('连接失败:', error);
      const errorEvent = error instanceof Error ? error : new Error(String(error));
      this.emit('error', errorEvent);
      this.handleReconnect();
    }
  }

  /**
   * 关闭 WebSocket 连接
   * @param code 关闭状态码
   * @param reason 关闭原因
   */
  public disconnect(code?: number, reason?: string): void {
    this.isManualClose = true;
    this.clearTimers();

    if (this.ws) {
      this.log('手动关闭连接');
      this.ws.close(code, reason);
      this.ws = null;
    }
  }

  /**
   * 发送消息
   * @param data 要发送的数据（支持字符串、对象等）
   */
  public send(data: string | object | ArrayBuffer | Blob): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        const message =
          typeof data === 'object' && !(data instanceof ArrayBuffer) && !(data instanceof Blob)
            ? JSON.stringify(data)
            : data;
        this.ws.send(message as string | ArrayBuffer | Blob);
        this.log('发送消息:', data);
      } catch (error) {
        this.log('发送消息失败:', error);
        const errorEvent = error instanceof Error ? error : new Error(String(error));
        this.emit('error', errorEvent);
      }
    } else {
      // 检查是否已放弃重连
      if (this.isReconnectAbandoned) {
        this.log('已达到最大重连次数，消息发送失败');
        this.emit('error', new Error('WebSocket 连接已失败，无法发送消息'));
        return;
      }
      // 连接未建立，将消息加入队列
      this.log('连接未建立，消息已加入队列');
      this.messageQueue.push(data);
    }
  }

  /**
   * 监听事件
   * @param event 事件类型
   * @param callback 回调函数
   */
  public on(event: EventType, callback: EventCallback): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.add(callback);
    }
  }

  /**
   * 移除事件监听
   * @param event 事件类型
   * @param callback 回调函数
   */
  public off(event: EventType, callback: EventCallback): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  /**
   * 获取当前连接状态
   * @returns 连接状态：CONNECTING(0), OPEN(1), CLOSING(2), CLOSED(3)
   */
  public getReadyState(): number {
    return this.ws ? this.ws.readyState : WebSocket.CLOSED;
  }

  /**
   * 获取连接状态描述
   */
  public getStatus(): string {
    const state = this.getReadyState();
    const statusMap: { [key: number]: string } = {
      [WebSocket.CONNECTING]: '正在连接',
      [WebSocket.OPEN]: '已连接',
      [WebSocket.CLOSING]: '正在关闭',
      [WebSocket.CLOSED]: '已关闭',
    };
    return statusMap[state] || '未知状态';
  }

  /**
   * 处理连接打开事件
   */
  private handleOpen(event: Event): void {
    this.log('WebSocket 连接已建立');

    // 清除连接超时定时器
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = null;
    }

    // 重置重连计数
    this.reconnectAttempts = 0;

    // 发送队列中的消息
    this.flushMessageQueue();

    // 启动心跳
    this.startHeartbeat();

    this.log('连接已建立');
    this.emit('open', event as Event);
  }

  /**
   * 处理连接关闭事件
   */
  private handleClose(event: CloseEvent): void {
    this.log(`WebSocket 连接已关闭 [code: ${event.code}, reason: ${event.reason}]`);

    // 停止心跳
    this.stopHeartbeat();

    // 触发 close 事件
    this.emit('close', event);

    // 尝试重连
    if (!this.isManualClose) {
      this.handleReconnect();
    }
  }

  /**
   * 处理消息接收事件
   */
  private handleMessage(event: MessageEvent): void {
    let data = event.data;

    // 尝试解析 JSON
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      // 不是 JSON 格式，保持原始数据
      console.error('解析 JSON 失败:', error);
    }

    this.log('收到消息:', data);
    this.emit('message', data);
  }

  /**
   * 处理错误事件
   */
  private handleError(error: unknown): void {
    this.log('WebSocket 错误:', error);
    const errorEvent = error instanceof Error ? error : new Error(String(error));
    this.emit('error', errorEvent);
  }

  /**
   * 处理重连逻辑
   */
  private handleReconnect(): void {
    if (!this.options.reconnect || this.isManualClose) {
      return;
    }

    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      this.log(`已达到最大重连次数 (${this.options.maxReconnectAttempts})，停止重连`);
      this.isReconnectAbandoned = true;
      // 清空消息队列，避免内存泄漏
      this.messageQueue = [];
      return;
    }

    this.reconnectAttempts++;
    this.log(`准备第 ${this.reconnectAttempts} 次重连，${this.options.reconnectInterval}ms 后执行`);

    this.reconnectTimer = setTimeout(() => {
      this.emit('reconnect', { attempt: this.reconnectAttempts });
      this.connect();
    }, this.options.reconnectInterval);
  }

  /**
   * 启动心跳检测
   */
  private startHeartbeat(): void {
    if (!this.options.heartbeat) {
      return;
    }

    this.stopHeartbeat();

    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send(this.options.heartbeatMessage);
        this.log('发送心跳');
      }
    }, this.options.heartbeatInterval);
  }

  /**
   * 停止心跳检测
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 发送消息队列中的所有消息
   */
  private flushMessageQueue(): void {
    if (this.messageQueue.length > 0) {
      this.log(`发送队列中的 ${this.messageQueue.length} 条消息`);
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message !== undefined) {
          this.send(message);
        }
      }
    }
  }

  /**
   * 清除所有定时器
   */
  private clearTimers(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = null;
    }
  }

  /**
   * 触发事件
   */
  private emit(event: EventType, data?: EventCallbackData): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          this.log(`事件 ${event} 的回调函数执行出错:`, error);
        }
      });
    }
  }

  /**
   * 输出日志
   */
  private log(...args: unknown[]): void {
    if (this.options.debug) {
      console.log('[WebSocketClient]', ...args);
    }
  }

  /**
   * 销毁实例，清理所有资源
   */
  public destroy(): void {
    this.disconnect();
    this.messageQueue = [];
    this.eventListeners.clear();
    this.log('WebSocketClient 实例已销毁');
  }
}

export { WebSocketClient, WebSocketClientOptions };
