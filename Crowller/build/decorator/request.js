"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
// todo 一个工厂函数，用来生成请求方法
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
// * 使用枚举类型
exports.get = getRequestDecorator(Methods.GET);
exports.post = getRequestDecorator(Methods.POST);
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
