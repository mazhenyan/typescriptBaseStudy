// 普通方法
// target：对应类的prototype(原型Test2)
// key：装饰方法的名字

// 静态方法
// target:类的构造函数
// key：装饰方法的名字

// descriptor类似于Object.defineProperty的第三个参数，控制函数的一些内容

function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log(target, key, descriptor);
  // 方法是否可以被重写
  descriptor.writable = false;
  descriptor.value = () => {
    return 'name';
  };
}

class Test2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}

let test2 = new Test2('mzy');
console.log(test2.getName());
