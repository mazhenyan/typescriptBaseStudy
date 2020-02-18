function testDecorator() {
  return function<T extends new (...args: any[]) => any>(constractor: T) {
    return class extends constractor {
      name = 'mzy';
      getName() {
        return this.name;
      }
    };
  };
}
const Test = testDecorator()(
  class {
    constructor(private name: string) {
      console.log(this.name);
    }
  }
);

let test = new Test('name');
test.getName();
console.log(test);
