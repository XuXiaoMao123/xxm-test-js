(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{353:function(t,a,s){"use strict";s.r(a);var r=s(17),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"url查询字符串解析函数-get-query-object"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#url查询字符串解析函数-get-query-object"}},[t._v("#")]),t._v(" URL查询字符串解析函数（Get Query Object）")]),t._v(" "),a("h2",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),a("p",[a("code",[t._v("getQueryObject")]),t._v(" 函数用于解析URL查询字符串，并返回一个对象，其中包含查询参数的键值对。")]),t._v(" "),a("h2",{attrs:{id:"版权信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#版权信息"}},[t._v("#")]),t._v(" 版权信息")]),t._v(" "),a("p",[t._v("版权所有 © 2024 xxm")]),t._v(" "),a("h2",{attrs:{id:"函数签名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数签名"}},[t._v("#")]),t._v(" 函数签名")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 解析URL查询字符串并返回一个对象，其中包含查询参数的键值对。\n * \n * @param {string} url - 需要解析的URL字符串。如果为空，则默认使用当前页面的URL。\n * @returns {Object} - 包含查询参数的对象。\n */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("declare")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getQueryObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[t._v("#")]),t._v(" 参数")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("url")]),t._v(" (可选): 需要解析的URL字符串。如果为空或未提供，则默认使用当前页面的URL。")])]),t._v(" "),a("h2",{attrs:{id:"返回值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#返回值"}},[t._v("#")]),t._v(" 返回值")]),t._v(" "),a("ul",[a("li",[t._v("返回一个对象，其属性为URL查询参数的键值对，键为参数名，值为参数值。")])]),t._v(" "),a("h2",{attrs:{id:"示例用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例用法"}},[t._v("#")]),t._v(" 示例用法")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" queryObj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getQueryObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://example.com?name=John&age=30'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("queryObj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出：{ name: 'John', age: '30' }")]),t._v("\n")])])]),a("h2",{attrs:{id:"适用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#适用场景"}},[t._v("#")]),t._v(" 适用场景")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Web")]),t._v("开发：在处理URL参数时，快速从URL中提取查询字符串。")]),t._v(" "),a("li",[t._v("数据处理：在需要根据URL参数动态加载或修改页面内容时。")])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("URL查询字符串解析函数是一个实用的工具，它可以帮助我们将URL中的查询参数转换为JavaScript对象，使得参数处理更加方便和直观。")])]),t._v(" "),a("h2",{attrs:{id:"引入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引入"}},[t._v("#")]),t._v(" 引入")]),t._v(" "),a("ul",[a("li",[t._v("要在使用的项目中使用 "),a("code",[t._v("getQueryObject")]),t._v(" 函数，您可以单独引入：")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" getQueryObject "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xxm-test-js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"贡献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贡献"}},[t._v("#")]),t._v(" 贡献")]),t._v(" "),a("ul",[a("li",[t._v("希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);