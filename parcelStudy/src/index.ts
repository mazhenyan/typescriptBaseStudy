import 'reflect-metadata';
// const user = {
//   name: 'mzy'
// };
// // 定义元数据
// Reflect.defineMetadata('data', 'test', user);
// let data = Reflect.getMetadata('data', user);
// console.log(user, data);

function showData(target: typeof User) {
  for (let key in target.prototype) {
    let data = Reflect.getMetadata('data', target.prototype, key);
    console.log(data);
  }
}
function setData(msg: string) {
  return function(target: User, key: string) {
    Reflect.defineMetadata('data', msg, target, key);
  };
}
// 类的装饰器最后执行
@showData
class User {
  @Reflect.metadata('data', 'OK1')
  getName() {}
  @Reflect.metadata('data', 'OK2')
  getAge() {}
  @setData('ok3')
  getGender() {}
}
