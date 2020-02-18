// function nameDeorator(target: any, key: string): any {
//   console.log(target, key);
//   const descriptor: PropertyDescriptor = {
//     value: '123',
//     writable: true
//   };
//   return descriptor;
// }

function nameDeorator(target: any, key: string) {
  target[key] = 'mzy2';
}

class DemoKey {
  @nameDeorator
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const demoKey = new DemoKey('mzy');
console.log(demoKey);
console.log((demoKey as any).__proto__);
