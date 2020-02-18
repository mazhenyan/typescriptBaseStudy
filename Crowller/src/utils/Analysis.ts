import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';

interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [PropName: number]: Course[];
}

class Analysis implements Analyzer {
  static instance: Analysis;
  private constructor() {}
  static getInstance(): Analysis {
    if (!this.instance) {
      this.instance = new Analysis();
    }
    return this.instance;
  }
  // 提取数据
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $('.course-item');
    const courseInfos: Course[] = [];
    courseItem.map((index, element) => {
      const desc = $(element).find('.course-desc');
      const title = desc.eq(0).text();
      const count = parseInt(
        desc
          .eq(1)
          .text()
          .split('：')[1],
        10
      );
      courseInfos.push({ title, count });
    });
    const result: CourseResult = {
      time: new Date().getTime(),
      data: courseInfos
    };
    return result;
  }
  // 写入json文件中
  private JsonContent(courseInfo: CourseResult, filePath: string) {
    // 文件目录
    let fileContent: Content = {};
    // 判断是否存在
    if (fs.existsSync(filePath)) {
      if (fs.readFileSync(filePath, 'utf-8')) {
        fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html);
    const fileContent = this.JsonContent(courseResult, filePath);
    return JSON.stringify(fileContent);
  }
}

export default Analysis;
