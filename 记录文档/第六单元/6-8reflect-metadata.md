# reflect-metadata

## 基本说明

官网：[reflect-metadata](https://github.com/rbuckton/reflect-metadata)

安装：`npm install reflect-metadata --save`

## 基本使用

```js
const user = {
  name: 'mzy'
};
// 定义元数据
Reflect.defineMetadata('data', 'test', user);
let data = Reflect.getMetadata('data', user);
console.log(user, data);
```

## 在类上使用

```js
@Reflect.metadata('data', 'mzy')
class User {
  name = 'mzy';
}
console.log(Reflect.getMetadata('data', User));
```

## 在类的属性/方法上使用

```js
class User {
  @Reflect.metadata('data', 'mzy')
  name = 'mzy';
  @Reflect.metadata('getname', 'OK')
  getName() {}
}
console.log(Reflect.getMetadata('data', User.prototype, 'name'));
console.log(Reflect.getMetadata('getname', User.prototype, 'getName'));
```

## 元数据的继承性

如果某个类**继承**了另外一个定义了元数据的类，那么改类**也是能够访问到**父类定义的元数据

```js
class Student extends User {}
console.log(Reflect.getMetadata('getname', Student.prototype, 'getName'));// OK
```

如果需要验证是否是**自身定义**的属性而不是继承而来

```js
console.log(Reflect.hasOwnMetadata('getname', Student.prototype, 'getName'));//false
```



还有一些其他`api`可以查看官方文档