declare namespace responseResult {
  interface CouseItem {
    title: string;
    count: number;
  }
  interface DataStruct {
    [key: string]: CouseItem[];
  }
  type isLogin = boolean;
  type login = boolean;
  type loginout = boolean;
  type getData = boolean;
  type showData = boolean | DataStruct;
}
