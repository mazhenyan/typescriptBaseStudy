import router from '../router';
import { RequestHandler } from 'express';
import { Methods } from './request';
// * 生成完需要的路由，需要进行导出          ! 构造函数
export function controller(root: string) {
  return function(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);

      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      );

      // * 如果有get的装饰器，就需要生成对应的路由放到router中
      if (path && method) {
        let fullPath = root === '/' ? `${path}` : `${root}${path}`;
        if (middlewares && middlewares.length) {
          // 使用中间件
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
