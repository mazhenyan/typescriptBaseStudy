# 命令空间(namespace)

需要说明的是:`namespace`是`TS`的模块化系统

## 定义使用

```js
namespace Home {
  class Header {
    constructor() {
      const elemt = document.createElement('div');
      elemt.innerHTML = 'this is header';
      document.body.appendChild(elemt);
    }
  }
  class Footer {
    constructor() {
      const elemt = document.createElement('div');
      elemt.innerHTML = 'this is footer';
      document.body.appendChild(elemt);
    }
  }
  export class Page {
    constructor() {
      new Header();
      new Footer();
    }
  }
}
```

打包成`js`后,可以直接使用导出的内容,这样可以全局命名污染问题

```js
new Home.Page();
```



## 进一步拆分

上述代码,可以进行进一步的逻辑拆分,将`header`和`footer`拆分出出来

```js
namespace Components {
  export class Header {
    constructor() {
      const elemt = document.createElement('div');
      elemt.innerHTML = 'this is header';
      document.body.appendChild(elemt);
    }
  }
  export class Footer {
    constructor() {
      const elemt = document.createElement('div');
      elemt.innerHTML = 'this is footer';
      document.body.appendChild(elemt);
    }
  }
}

```



```js
// 下面语句是为了更好的知道引入逻辑关系
/// <reference path='./components.ts' />
namespace Home {
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Footer();
    }
  }
}
```

当然也可以有子命名空间,也可以导出接口

```js
// 导出
export namespace SubComponents {
    export interface user {
      name: string;
    }
  }
  
// 使用
export const teacher: Components.SubComponents.user = {
      name: 'mzy'
};

```

