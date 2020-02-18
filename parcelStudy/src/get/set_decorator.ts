// 访问器的装饰器
function visitDecorator(
  target: any,
  key: string,
  decorator: PropertyDescriptor
) {
  console.log(target, key, decorator);
  decorator.writable = false;
}

class DemoGetSet {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const demoGetSet = new DemoGetSet('mzy');
// demo.name = '123';
