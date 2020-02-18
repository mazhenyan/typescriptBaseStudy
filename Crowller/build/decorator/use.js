"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// todo 使用中间件
function use(middleware) {
    return function (target, key) {
        // * 首先取出原来的middlewares，如果没有就是[]，然后重新放入Reflect中
        // ! 比较可靠一些
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.use = use;
