# 2-14 静态属性 Setter和Getter

## getter/setter

```js
class Person{
  // name是私有属性，外部不能直接访问，但是可以暴露一个get函数
  constructor(private _name:string){}
  get getName(){
    return 'hello '+this._name;
  }
  set setName(name : string){
    this._name = "new "+name;
  }
}

const person = new Person('mzy');
console.log(person.getName);// hello mzy
person.setName = 'mmm';
console.log(person.getName);// hello new mmm
```

## 静态属性--单例模式

1. 禁止外部使用`new`创建实例

   ```js
   class Demo {
     private constructor() {}
   }
   ```

2. 需要暴露出一个创建的接口（一个方法）

   使用`static`将方法直接挂载在`Demo`类上，即所有的由`Demo`创建出来的实例共享一个方法

   要求每次调用`getInstance`都返回同一个实例，那么需要将这个所有实例共享的属性静态出来，在第一次调用该方法时新建一个实例，之后调用只需要返回即可

   ```js
   class Demo {
     private static instance: Demo;
     private constructor() {}
     static getInstance() {
       if (!this.instance) {
         this.instance = new Demo();
       }
       return this.instance;
     }
   }
   const demo1 = Demo.getInstance();
   const demo2 = Demo.getInstance();
   console.log(demo1 === demo2); // true
   ```

   

