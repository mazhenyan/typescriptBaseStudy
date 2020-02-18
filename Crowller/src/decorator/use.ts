import { RequestHandler } from 'express';
import { crowllerController, loginController } from '../controller/index';
import 'reflect-metadata';
// todo 使用中间件
export function use(middleware: RequestHandler) {
  return function(target: crowllerController | loginController, key: string) {
    // * 首先取出原来的middlewares，如果没有就是[]，然后重新放入Reflect中
    // ! 比较可靠一些
    const originMiddlewares =
      Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
  };
}
