"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("reflect-metadata");
var index_1 = require("../decorator/index");
var util_1 = require("../utils/util");
var router = express_1.Router();
var loginController = /** @class */ (function () {
    function loginController() {
    }
    loginController_1 = loginController;
    loginController.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    loginController.prototype.loginOut = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json(util_1.getResponseData(true));
    };
    loginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = loginController_1.isLogin(req);
        if (isLogin) {
            res.json(util_1.getResponseData(true));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(true));
            }
            else {
                res.json(util_1.getResponseData(false));
            }
        }
    };
    loginController.prototype.isLogin = function (req, res) {
        var result = util_1.getResponseData(loginController_1.isLogin(req));
        res.json(result);
    };
    var loginController_1;
    __decorate([
        index_1.get('/loginOut'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], loginController.prototype, "loginOut", null);
    __decorate([
        index_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], loginController.prototype, "login", null);
    __decorate([
        index_1.get('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], loginController.prototype, "isLogin", null);
    loginController = loginController_1 = __decorate([
        index_1.controller('/api')
    ], loginController);
    return loginController;
}());
exports.loginController = loginController;
