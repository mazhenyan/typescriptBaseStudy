import { crowllerController, loginController } from '../controller/index';

export enum Methods {
  GET = 'get',
  POST = 'post'
}
// todo 一个工厂函数，用来生成请求方法
function getRequestDecorator(type: Methods) {
  return function(path: string) {
    return function(target: crowllerController|loginController, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}
// * 使用枚举类型
export const get = getRequestDecorator(Methods.GET);
export const post = getRequestDecorator(Methods.POST);

// export function get(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'get', target, key);
//   };
// }

// export function post(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   };
// }
