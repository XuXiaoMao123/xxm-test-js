# xxm-test-js js库
xxm-test-js。一个开箱即用的函数库。提供了日常开发时所需的一些常用函数方法。该js库提供了丰富的代码提示功能，无需阅读文档，方便开发者快速使用。

[![npm](https://img.shields.io/npm/dm/xxm-test-js)](https://www.npmjs.com/package/xxm-test-js)
[![npm](https://img.shields.io/npm/v/xxm-test-js?color=%2346c018)](https://www.npmjs.com/package/xxm-test-js)

### 快速开始

#### 1.安装js库
```bash
npm i xxm-test-js
```

#### 2.引用js库
> 在组件中的使用方式

```javascript
//全部引入
import xxmJs from 'xxm-test-js';

const time = new Date();
xxmJs.handelTime(time, 'yyyy-MM-dd HH:mm:ss');

//按需引入
import { handelTime } from 'xxm-test-js/dist/lib/handleTime.js';

const time = new Date();
handelTime(time, 'MM-dd');
```

<!-- >[查看文档](https://xuxiaomao123.github.io/xxmUi/) -->
