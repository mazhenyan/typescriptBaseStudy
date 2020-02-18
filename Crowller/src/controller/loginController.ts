import { Router, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator/index';
import { getResponseData } from '../utils/util';

const router = Router();
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller('/api')
export class loginController {
  static isLogin(req: Request) {
    return !!(req.session ? req.session.login : false);
  }
  @get('/loginOut')
  loginOut(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseResult.loginout>(true));
  }
  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body;
    const isLogin = loginController.isLogin(req);

    if (isLogin) {
      res.json(getResponseData<responseResult.login>(true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData<responseResult.login>(true));
      } else {
        res.json(getResponseData<responseResult.login>(false));
      }
    }
  }
  @get('/isLogin')
  isLogin(req: RequestWithBody, res: Response): void {
    const result = getResponseData<responseResult.isLogin>(
      loginController.isLogin(req)
    );
    res.json(result);
  }
}
