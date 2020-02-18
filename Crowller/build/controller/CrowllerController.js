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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var index_1 = require("../decorator/index");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var Analysis_1 = __importDefault(require("../utils/Analysis"));
var checkLogin = function (req, res, next) {
    console.log('checkLogin: ');
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.send(util_1.getResponseData(false, 'please login'));
    }
};
var test = function (req, res, next) {
    console.log('test: ');
    next();
};
var crowllerController = /** @class */ (function () {
    function crowllerController() {
    }
    crowllerController.prototype.getData = function (req, res) {
        var secret = 'secretKey';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = Analysis_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send(util_1.getResponseData(true));
    };
    crowllerController.prototype.showData = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, '../../data/course.json');
            var result = fs_1.default.readFileSync(position, 'utf-8');
            res.json(util_1.getResponseData(JSON.parse(result)));
        }
        catch (e) {
            res.send(util_1.getResponseData(false, 'no data'));
        }
    };
    __decorate([
        index_1.get('/getData'),
        index_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], crowllerController.prototype, "getData", null);
    __decorate([
        index_1.get('/showData'),
        index_1.use(test),
        index_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], crowllerController.prototype, "showData", null);
    crowllerController = __decorate([
        index_1.controller('/api')
    ], crowllerController);
    return crowllerController;
}());
exports.crowllerController = crowllerController;
