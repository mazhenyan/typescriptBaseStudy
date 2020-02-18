# import对应的模块化

在浏览器中使用模块化,可以使用`amd`或者`cmd`

现在我们就把之前的代码改写成`amd`的代码,我们还需要下载`require.js`(`amd`)

```js
// test.ts
import { Header, Footer } from './component';
export default class Page {
  constructor() {
    new Header();
    new Footer();
  }
}
```

```js
// component.ts
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
```

在页面中**引用**

```html
<script>
    require(['test'], function(page) {
      new page.default();
    });
</script>
```

