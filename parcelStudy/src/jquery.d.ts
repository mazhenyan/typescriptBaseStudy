// es6模块化
declare module 'jquery' {
  function $(param: () => void): void;
  interface JqueryInstance {
    html: (html: string) => {};
  }
  function $(param: string): JqueryInstance;
  namespace $ {
    namespace fn {
      class init {}
    }
  }
  export = $;
}
