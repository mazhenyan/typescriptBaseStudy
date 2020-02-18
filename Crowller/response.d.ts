interface CouseItem {
  title: string;
  count: number;
}
interface DataStruct {
  [key: string]: CouseItem[];
}

declare namespace responseResult {
  export type isLogin = boolean;
  export type login = boolean;
  export type loginout = boolean;
  export type getData = boolean;
  export type showData = boolean | DataStruct;
}
