# TS的编译运转过程中的进一步理解

## 打包项目的ts文件

如果需要将`ts`文件转换成`js`文件，可以在`package.json`中添加一项配置

```js
  "scripts": {
    // 如果需要自动感知到代码的更改进行打包可以修改为"tsc -w"
    "build": "tsc"
  },      
```

其主要的作用就是自动寻找文件目录下的`ts`文件，并且把他们转换成`js`文件，而且如果进行转换是根据`tsconfig.json`配置来进行。

因为是默认的配置项，所以生成的有关文件会存放到和`ts`的同一个目录下，其实我们可以对`tsconfig.json`进行配置，按照我们的要求去打包`ts`文件

## 将有关ts文件统一打包到一个文件下

修改`tsconfig.json`，（其他配置项之后会进行介绍）

## 自动运行js文件

以上过程**只是**自动的进行**编译转换**，并不会自动的运行，如果需要自动的运行，需要如下依赖包和配置

```js
// 安装依赖包 nodemon
npm install -D nodemon

// 相关的配置
  "scripts": {
    "start": "nodemon node ./build/crowller.js"
  },    
```

`nodemon`能够监控整个项目的变化，如果发生变化就会执行`node ./build/crowller.js`命令

## nodemon忽略有关文件的变化

但是针对这个项目有一个问题，那么就是，每次执行`npm run start`的时候，都会默认执行一次`node ./build/crowller.js`，这样，目录下的`./data/course.json`就会进行更新，这样项目发生了改变，又会执行`node ./build/crowller.js`，这样就是一个**死循环**，现在我们需要忽略`./data`目录下内容的改变，需要在`package.json`中添加配置项

```js
  "nodemonConfig": {
    "ignore": [
      "data/*"
    ]
  },
```

## 一条语句完成编译和运行

但是我们注意到，如果需要监控项目的变化，并且将`ts`转换成`js`，并且执行`js`,需要在终端开启**两个监控项**，我们希望只使用一条语句，就能完成，如果项目发生了变化就就将`ts`---> `js`并且运行有关的`js`

```js
// 需要安装依赖包
npm install -D concurrently
// 需要修改的配置
  "scripts": {
    "dev:build": "tsc -w",
    "dev:run": "nodemon node ./build/crowller.js",
    "dev": "concurrently npm:dev:*"
  },
```

上述的配置就是，使用`concurrently`帮助我们并行的去执行`tec -w`和`nodemon node ./build/crowller.js`两条命令。