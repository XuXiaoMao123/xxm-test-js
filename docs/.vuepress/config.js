module.exports = {
  base: '/xxm-test-js/',
  title: 'xxm-test-js',
  description:
    'xxm-test-js。一个开箱即用的函数库。提供了日常开发时所需的一些常用函数方法。该js库提供了丰富的代码提示功能，无需阅读文档，方便开发者快速使用。',
  theme: '@vuepress/theme-default',
  plugins: [
    [
      'vuepress-plugin-code-copy',
      {
        // 配置选项
        copyText: '复制代码',
        tip: {
          content: '复制成功',
        },
        error: {
          content: '复制失败',
        },
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/zh/guide' },
      { text: '路线图', link: '/zh/roadmap' },
      { text: 'GitHub', link: 'https://github.com/xuxiaomao123/xxm-test-js' },
    ],
    sidebar: {
      '/zh/': [
        {
          title: '指南',
          collapsable: false,
          children: ['guide', 'roadmap'],
        },
        {
          title: '常用方法',
          collapsable: true,
          children: [
            'debounce',
            'deepCopy',
            'deepMerge',
            'getQueryObject',
            'isType',
            'runTasksWithConcurrency',
            'throttle',
            'copyTextToClipboard',
            'workEvent',
          ],
        },
        {
          title: '时间方法',
          collapsable: true,
          children: ['handelTime', 'getWeek', 'getRelativeTime', 'formatDuration'],
        },
        {
          title: '字符串/数字方法',
          collapsable: true,
          children: [
            'formatThousands',
            'stringToArray',
            'createExistenceChecker',
            'getRandomInt',
            'htmlEscape',
            'htmlUnescape',
            'cssEscape',
            'jsEscape',
          ],
        },
        {
          title: '数组/对象方法',
          collapsable: true,
          children: [
            'flattenArray',
            'flattenTree',
            'findPathInTree',
            'filterObject',
            'convertToTree',
            'sortArray',
            'cleanArray',
            'arrayToString',
            'categorizeBy',
            'groupBy',
            'uniqueArray',
            'lookupDictLabel',
            'customSortMethod',
          ],
        },
        {
          title: '滚动方法',
          collapsable: true,
          children: ['scrollToTop', 'scrollToBottom'],
        },
        {
          title: '浏览器方法',
          collapsable: true,
          children: [
            'enterFullscreen',
            'exitFullscreen',
            'getFullscreenElement',
            'observeElementResize',
          ],
        },
        {
          title: '常用类',
          collapsable: true,
          children: [
            'TimeThread',
            'ScrollDirectionChecker',
            'FormValidator',
            'WebSocketClient',
            'Watermark',
          ],
        },
      ],
    },
  },
};
