module.exports = {
  base: "/xxm-test-js/",
  title: 'xxm-test-js',
  description: 'xxm-test-js。一个开箱即用的函数库。提供了日常开发时所需的一些常用函数方法。该js库提供了丰富的代码提示功能，无需阅读文档，方便开发者快速使用。',
  theme: '@vuepress/theme-default',
  plugins: [
    ['vuepress-plugin-code-copy', {
      // 配置选项
      copyText: '复制代码',
      tip: {
        content: '复制成功'
      },
      error: {
        content: '复制失败'
      },
    }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/zh/guide' }
    ],
    sidebar: {
      '/zh/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            'guide',
            'debounce',
            'deepCopy',
            'flattenArray',
            'formatThousands',
            'getQueryObject',
            'getWeek',
            'handelTime',
            'isType',
            'sortArray',
            'throttle'
          ]
        }
      ]
    }
  }
}
