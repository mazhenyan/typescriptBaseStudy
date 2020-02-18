# TypeScript中的配置

中文文档：[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

## 使用配置项去编译条件

需要说明，如果使用`tsc ${file}.ts`是不会按照`tsconfig.json`去运行的，只有去编译整个项目的时候才会按照`tsconfig.json`的配置去运行

接下来主要说明下`tsconfig.json`文件中有关的配置

## 默认配置

```js
{
  "compilerOptions": {
      "target": "es5"
      "module": "commonjs"
      "strict": true
      "esModuleInterop": true
      "forceConsistentCasingInFileNames": true
  }
}
```

## 只包含想要编译的文件

在该配置项中，只要在`include`数组中的内容，才会被打包编译（支持正则）

```js
"include": ["./src/crowller.ts"],
 // 或者是
"files":["./src/crowller.ts"]
```

## compilerOptions

中文文档：[compilerOptions](https://www.tslang.cn/docs/handbook/compiler-options.html)

下面介绍一些简单常用的`compilerOptions`配置

### 增量编译

表示已经编译过的文件不再编译，会多处一个`tsconfig.tsbuildinfo`，里面包含上次编译过的信息

```js
"incremental": true,
```

### 是否编译JS文件

```js
"allowJs": true,
```

### 是否生成SourceMap

文件进行压缩之后，`SourceMap`可以看到转换后的代码的每一个位置，所对应的转换前的位置。

```js
"sourceMap": true,
```

### 指定打包文件夹

开启该配置项后，会将所有的`ts`文件打包到指定目录下

```js
"outDir": "./build"
```

### 打包成一个输出文件

指定路径,这样所有的内容都会打包到指定文件夹

```js
"outFile": "./build/index.js"
```

但是,这样就不支持`commonjs`的规范,需要修改成

```js
"module": "amd"
```

### 指定输入文件的地址

```js
"rootDir": "./src"
```

### 编译时去掉注释

开启改配置项，那么整个项目中所有的注释都不会进行打包

```js
"removeComments": true,
```

### 定义但是未使用

如果未`true`，如果定义了没有使用会报错

```js
"noUnusedLocals": true,
```

### "strict": true

如果有该配置项，下面所有的配置相关都默认是`true`

```js
	"noImplicitAny": true,
    "strictNullChecks": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
```

#### 是否明确指明any类型

```
"noImplicitAny": true
```

如果是`true`，则在`ts`中，需要明确的指明`any`的类型是`any`

```js
let person:any; // 如果开启需要明确的指明
```

#### 是否强制检查null校验

```js
"strictNullChecks": true,
```

如果是`true`，会报错

```js
let personName:string = null;
```

