import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import Analysis from './Analysis';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private rawHtml: string = '';
  private filePath = path.resolve(__dirname, '../../data/course.json');

  // 发送请求
  async getRawHtml() {
    // 返回请求发送之后，页面的信息
    const result = await superagent.get(this.url);
    return result.text;
  }

  wirteFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.Analyze.analyze(html, this.filePath);
    this.wirteFile(fileContent);
  }
  constructor(private Analyze: Analyzer, private url: string) {
    this.initSpiderProcess();
  }
}

export default Crowller;
