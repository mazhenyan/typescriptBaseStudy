function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}

class DemoParam {
  getInfo(@paramDecorator name: string) {
    return name + ' hello';
  }
}

let demoParam = new DemoParam();
demoParam.getInfo('mzy');
