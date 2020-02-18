# 2-11 interface接口

## 定义一个接口

```javascript
interface Person {
  name: string;
  age: number;
}
```

其实可以看到，这样的定义和我们之前使用`type`和`class`定义接口性对象差不多

```js
// 使用type
type Person = {
  name: string;
  age: number;
};
// 使用class
class Person {
  name: string;
  age: number;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

但是`class`和`interface`和`type`的使用场景不一样（需要`new`返回的对象），所以暂且不讨论其与另外两者的区别

## interface 和 type的区别

**type的特殊场景**

`type`可以代表基本数据类型，`interface`只能代表一个对象，在TS中，如果可以用接口（`interface`）表述就用接口表述，如果不可以再用类型别名（`type`）

```js
type sstring = string;
let name : sstring = 'mzy';
```

------

**interface的特殊场景**

1. 某些数据可有可无

   ```js
   // Person接口中，salary是可选属性
   interface Person {
     name:string,
     salary?:number
   }
   ```

2. 数据只读属性

   ```js
   // name属性只可以读取，不可以修改
   interface Person {
     readonly name: string;
     age: number;
   }
   ```

3. 不确定存在的数据

   ```js
   // 所有不确定的属性都会匹配上最后一行，而且它的值也可以任意
   interface Person {
     name: string;
     age: number;
     [peopName: string]: any;
   }
   ```

4. 存在方法

   ```js
   // 接口中存在方法，并且返回值是string
   interface Person {
     name: string;
     getName(name: string): string;
   }
   ```

5. 类中实现接口，如果某个`class`需要实现某个接口，那么一定需要拥有接口所定义的属性和方法

   ```js
   interface Person {
     name: string;
     getName(name: string): string;
   }
   class Teacher implements Person {
     name: string;
     age: number;
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
     getName(name) {
       return this.name;
     }
     getAge(age: string) {
       return this.age;
     }
   }
   
   ```

6. 接口可以继承接口

   ```js
   interface Student extends Person {
     readonly schoolID: string;
     getSchoolID(name: string): string;
   }
   ```

7. 接口函数

   ```js
   // 该接口是一个接口函数，所有是implements改接口的class或者是类型是sayHi的都需要实现这个函数
   interface sayHi {
     (saySth: string): string;
   }
   ```

   ...

详细文档可以查看：https://www.tslang.cn/docs/handbook/interfaces.html