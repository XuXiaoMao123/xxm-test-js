/**
 * 页面水印类
 *
 * 使用场景：为页面添加水印，用于版权保护、信息安全、防止截图泄密等场景。
 * 适用于后台管理系统、敏感信息页面、文档预览等需要标识用户身份或保护内容的场合。
 *
 * 主要特性：
 * - 自定义水印内容：支持单行或多行文字
 * - 样式配置：可配置字体、颜色、大小、透明度、旋转角度等
 * - 防删除保护：使用 MutationObserver 监听 DOM 变化，防止水印被删除或修改
 * - 高性能：使用 Canvas 生成水印，以 base64 图片作为背景
 * - 响应式：支持窗口大小变化时自动调整
 * - 易于销毁：提供销毁方法，完全清理水印和监听器
 *
 * @example
 * ```typescript
 * // 基本用法
 * const watermark = new Watermark({
 *   content: '机密文档',
 *   fontSize: 16,
 *   opacity: 0.15
 * });
 * watermark.create();
 *
 * // 多行水印
 * const watermark = new Watermark({
 *   content: ['张三', '2024-01-01', '仅供内部使用'],
 *   color: '#000',
 *   rotate: -20
 * });
 * watermark.create();
 *
 * // 销毁水印
 * watermark.destroy();
 * ```
 */

interface WatermarkOptions {
  /**
   * 水印内容，支持字符串或字符串数组（多行）
   */
  content?: string | string[];
  /**
   * 水印容器，默认为 document.body
   */
  container?: HTMLElement;
  /**
   * 水印宽度，默认 200
   */
  width?: number;
  /**
   * 水印高度，默认 150
   */
  height?: number;
  /**
   * 字体大小，默认 16
   */
  fontSize?: number;
  /**
   * 字体样式，默认 'normal'
   */
  fontStyle?: 'normal' | 'italic' | 'oblique';
  /**
   * 字体粗细，默认 'normal'
   */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  /**
   * 字体系列，默认 'Microsoft YaHei'
   */
  fontFamily?: string;
  /**
   * 文字颜色，默认 '#000000'
   */
  color?: string;
  /**
   * 透明度，默认 0.15
   */
  opacity?: number;
  /**
   * 旋转角度（度），默认 -20
   */
  rotate?: number;
  /**
   * 层级，默认 9999
   */
  zIndex?: number;
  /**
   * 行间距（仅多行时有效），默认 20
   */
  lineHeight?: number;
  /**
   * 是否启用防删除保护，默认 true
   */
  monitor?: boolean;
  /**
   * 水印层的 id，默认 'watermark-container'
   */
  id?: string;
}

class Watermark {
  private options: Required<WatermarkOptions>;
  private watermarkElement: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private isDestroyed: boolean = false;

  constructor(options: WatermarkOptions = {}) {
    this.options = {
      content: options.content ?? '水印',
      container: options.container ?? document.body,
      width: options.width ?? 200,
      height: options.height ?? 150,
      fontSize: options.fontSize ?? 16,
      fontStyle: options.fontStyle ?? 'normal',
      fontWeight: options.fontWeight ?? 'normal',
      fontFamily: options.fontFamily ?? 'Microsoft YaHei, sans-serif',
      color: options.color ?? '#000000',
      opacity: options.opacity ?? 0.15,
      rotate: options.rotate ?? -20,
      zIndex: options.zIndex ?? 9999,
      lineHeight: options.lineHeight ?? 20,
      monitor: options.monitor ?? true,
      id: options.id ?? 'watermark-container',
    };
  }

  /**
   * 创建水印
   */
  public create(): void {
    if (this.isDestroyed) {
      console.warn('水印已被销毁，无法创建');
      return;
    }

    // 如果已存在水印，先删除
    this.removeWatermarkElement();

    // 创建水印元素
    this.watermarkElement = this.createWatermarkElement();
    this.options.container.appendChild(this.watermarkElement);

    // 启动监听
    if (this.options.monitor) {
      this.startMonitor();
    }

    // 监听窗口大小变化
    this.observeResize();
  }

  /**
   * 更新水印配置
   * @param options 新的配置项
   */
  public update(options: Partial<WatermarkOptions>): void {
    if (this.isDestroyed) {
      console.warn('水印已被销毁，无法更新');
      return;
    }

    // 更新配置
    this.options = {
      ...this.options,
      ...options,
      container: options.container ?? this.options.container,
    };

    // 重新创建水印
    this.create();
  }

  /**
   * 销毁水印
   */
  public destroy(): void {
    this.isDestroyed = true;
    this.stopMonitor();
    this.stopResizeObserver();
    this.removeWatermarkElement();
  }

  /**
   * 创建水印元素
   */
  private createWatermarkElement(): HTMLElement {
    const div = document.createElement('div');
    div.id = this.options.id;

    // 设置样式
    Object.assign(div.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: String(this.options.zIndex),
      backgroundImage: `url(${this.generateWatermarkImage()})`,
      backgroundRepeat: 'repeat',
    });

    return div;
  }

  /**
   * 生成水印图片（base64）
   */
  private generateWatermarkImage(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('无法获取 Canvas 上下文');
    }

    canvas.width = this.options.width;
    canvas.height = this.options.height;

    // 设置旋转
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((this.options.rotate * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // 设置字体样式
    ctx.font = `${this.options.fontStyle} ${this.options.fontWeight} ${this.options.fontSize}px ${this.options.fontFamily}`;
    ctx.fillStyle = this.options.color;
    ctx.globalAlpha = this.options.opacity;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 绘制文字
    const content = Array.isArray(this.options.content)
      ? this.options.content
      : [this.options.content];

    const startY = canvas.height / 2 - ((content.length - 1) * this.options.lineHeight) / 2;

    content.forEach((text, index) => {
      const y = startY + index * this.options.lineHeight;
      ctx.fillText(text, canvas.width / 2, y);
    });

    return canvas.toDataURL();
  }

  /**
   * 移除水印元素
   */
  private removeWatermarkElement(): void {
    if (this.watermarkElement && this.watermarkElement.parentNode) {
      this.watermarkElement.parentNode.removeChild(this.watermarkElement);
      this.watermarkElement = null;
    } else {
      // 尝试通过 ID 查找并删除
      const existingElement = document.getElementById(this.options.id);
      if (existingElement && existingElement.parentNode) {
        existingElement.parentNode.removeChild(existingElement);
      }
    }
  }

  /**
   * 启动 DOM 监听（防删除）
   */
  private startMonitor(): void {
    if (!this.options.monitor || this.isDestroyed) {
      return;
    }

    this.stopMonitor();

    this.observer = new MutationObserver((mutations) => {
      if (this.isDestroyed) {
        return;
      }

      let shouldRecreate = false;

      mutations.forEach((mutation) => {
        // 检查是否删除了水印元素
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (
              node === this.watermarkElement ||
              (node instanceof HTMLElement && node.id === this.options.id)
            ) {
              shouldRecreate = true;
            }
          });
        }

        // 检查是否修改了水印元素的属性或样式
        if (mutation.type === 'attributes' && mutation.target === this.watermarkElement) {
          shouldRecreate = true;
        }
      });

      if (shouldRecreate) {
        this.create();
      }
    });

    // 监听容器的子节点变化和属性变化
    this.observer.observe(this.options.container, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['style', 'class'],
    });

    // 监听水印元素本身
    if (this.watermarkElement) {
      this.observer.observe(this.watermarkElement, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }
  }

  /**
   * 停止 DOM 监听
   */
  private stopMonitor(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * 监听容器大小变化
   */
  private observeResize(): void {
    if (typeof ResizeObserver === 'undefined') {
      // 降级到 window resize 事件
      this.handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.handleResize);
      return;
    }

    this.stopResizeObserver();

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isDestroyed && this.watermarkElement) {
        // 容器大小变化时，更新水印元素的大小
        this.watermarkElement.style.width = '100%';
        this.watermarkElement.style.height = '100%';
      }
    });

    this.resizeObserver.observe(this.options.container);
  }

  /**
   * 停止监听容器大小变化
   */
  private stopResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    } else {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  /**
   * 处理窗口大小变化（降级方案）
   */
  private handleResize(): void {
    if (!this.isDestroyed && this.watermarkElement) {
      this.watermarkElement.style.width = '100%';
      this.watermarkElement.style.height = '100%';
    }
  }
}

export { Watermark, WatermarkOptions };
