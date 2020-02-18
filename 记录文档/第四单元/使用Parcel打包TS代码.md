# 使用Parcel打包TS代码

Parcel是一个比较小型的打包工具,而且比较方便配置

## 下载

```js
npm install parcel -D
```

## 配置环境

将地址改写成自己的`.html`即可,这个`html`中,可以直接引入`ts`文件

```js
  "scripts": {
    "build": "parcel ./src/index.html"
  },
```

## 启动

运行命令,然后`parcel`会帮我们起一个端口,我们直接打开即可

```js
npm run build
```

其实我们查看源码,发现`parcel`已经帮我们把我们引入的`ts`打包成了`js`文件