# Express项目基础构建

## 需要的依赖

1. express

   作用：一个比较好用的后端框架

   官网文档：[express](http://www.expressjs.com.cn/4x/api.html)

2. cookie-session

   作用：可以在项目中使用`cookie`和`session`

   GitHub网址：[cookie-session](https://github.com/expressjs/cookie-session)

3. body-parser

   作用：获取请求体中的内容

   GitHub网址：[body-parser](https://github.com/expressjs/body-parser)

## 开始编写

### 搭建服务器

`index.ts`页面内容

```js
import express from 'express';

const app = express();

app.listen(7001, () => {
  console.log('server is running');
});
```

搭建了一个监听在7001端口的`Node`服务器

### 编写路由

因为编写接口的内容以及代码量可能会越来越多，我们需要进行接口代码的分离，将接口代码放置在`router.ts`，那么需要在`index.ts`的需要添加

```js
// index.ts
import router from './router';
app.use(router);
// router.ts
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

export default router;
```

编写一个`get`的接口

```js
router.get('/', (req: Request, res: Response) => {
    res.send('hello.');
});
```

访问：`http:127.0.0.1:7001`就可以看到`hello.`的内容

### 对接口返回内容进行统一

返回的内容一般都会有固定的格式，这样我们可以将其写成一个`接口`，里面包含一个`success`是一个，还有一个`data`，还有一个可选信息`errMsg`

```
interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}
```

```js
// 导出一个方法，可以进行统一管理
export const getResponseData = (data: any, errMsg?: string): Result => {
  let result: Result;
  if (errMsg) {
    result.errMsg = errMsg;
    (result.data = data), (result.success = false);
  } else {
    result.success = true;
    result.data = data;
  }
  return result;
};
```

### 对于Request进行进一步加工

有些地方，对于`Request`需要固定的内容，例如：在登录、注册的时候，需要在`Request`的`body`中，需要有一定的内容，例如：`userName`，`password`等，这个样我们可以对`Resquest`进行加工

```js
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
```

