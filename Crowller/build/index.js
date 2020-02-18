"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// ? 不可以使用导入的方法
require("./controller/CrowllerController");
require("./controller/loginController");
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
// 问题1: express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2: 当我使用中间件的时候，对 req 或者 res 做了修改之后呢，实际上类型并不能改变。
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['mzy'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(function (req, res, next) {
    // 需要自己写中间件
    req.name = 'mzy';
    next();
});
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
