# 泛型中keyof

看看这个例子：

```js
interface Person {
  name: string;
  age: number;
}

class People {
  constructor(private info: Person) {}
  // 因为不确定返回类型，但是编译器会提示错误
  getInfo(key: string) {
    return this.info[key];
  }
}

let person: Person = {
  name: 'mzy',
  age: 20
};
let me = new People(person);
console.log(me.getInfo('name')); // mzy
```

在`TS`中，我们应该避免使用`any`类型

我们可以将`getInfo`函数进行修改

```js
  getInfo(key: string) {
    if (key === 'name' || key === 'age') {
      return this.info[key];
    }
  }
```

这是我们将鼠标放在使用`getInfo`函数的地方，发现上面**类型推断**出来的返回类型是`'number'|'string'|'undefine'`，这也是能够理解的，毕竟我们也不是知道我们传过来的是什么类型，但是我们有希望在传过去的之后需要将类型提示清楚，这个时候就需要使用到`keyof`

## keyof

首先我们需要认识到，任何字符串或者使数字都可以作为一个类型使用

```js
type NAME = 'name';
const typeName:NAME = 'name';
```

而且`typeName`只能使`'name'`，如果使其他内容都会报错

那么对于一个对象，我们想让某个变量的对象是对象里的`key`中的类型，这个时候就需要使用到`keyof`

`keyof`：顾名思义，能够知道对象的`key`的类型

```js
interface Person {
  name: string;
  age: number;
}
type PersonKeys = keyof Person;
const nameM: PersonKeys = 'name';
const ageM: PersonKeys = 'age';
```

将鼠标放在`PersonKeys`上是，会出现`'name'|'age'`

现在我们需要使用`keyof`继续改装上述的`getInfo`函数

```js
interface Person {
  name: string;
  age: number;
}
...
getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
```

首先我们知道：

```js
keyof Person // 'name' | 'age'
```

那么，在使用`getInfo`函数的时候，泛型`T`继承了该内容，那么`T`的类型只能是`'string'|'number'`，这样就限制了传过来的内容，再看返回值是`Person[T]`，因为`T`是可变的，所以导致返回值应该跟随传入的内容进行改变，这这样就完成了该函数按照我们定义的`key`进行传参，并且如果不是传入定义的内容，编译器会报错。