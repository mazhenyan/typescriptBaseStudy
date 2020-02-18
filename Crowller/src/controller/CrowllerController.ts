import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import { controller, use, get } from '../decorator/index';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/Analysis';

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  console.log('checkLogin: ');
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.send(getResponseData<responseResult.isLogin>(false, 'please login'));
  }
};
const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('test: ');
  next();
};
@controller('/api')
export class crowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: Request, res: Response): void {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url);
    res.send(getResponseData<responseResult.getData>(true));
  }
  @get('/showData')
  @use(test)
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf-8');
      res.json(getResponseData<responseResult.showData>(JSON.parse(result)));
    } catch (e) {
      res.send(getResponseData<responseResult.showData>(false, 'no data'));
    }
  }
}
