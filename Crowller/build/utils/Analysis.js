"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analysis = /** @class */ (function () {
    function Analysis() {
    }
    Analysis.getInstance = function () {
        if (!this.instance) {
            this.instance = new Analysis();
        }
        return this.instance;
    };
    // 提取数据
    Analysis.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $('.course-item');
        var courseInfos = [];
        courseItem.map(function (index, element) {
            var desc = $(element).find('.course-desc');
            var title = desc.eq(0).text();
            var count = parseInt(desc
                .eq(1)
                .text()
                .split('：')[1], 10);
            courseInfos.push({ title: title, count: count });
        });
        var result = {
            time: new Date().getTime(),
            data: courseInfos
        };
        return result;
    };
    // 写入json文件中
    Analysis.prototype.JsonContent = function (courseInfo, filePath) {
        // 文件目录
        var fileContent = {};
        // 判断是否存在
        if (fs_1.default.existsSync(filePath)) {
            if (fs_1.default.readFileSync(filePath, 'utf-8')) {
                fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            }
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    Analysis.prototype.analyze = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var fileContent = this.JsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return Analysis;
}());
exports.default = Analysis;
