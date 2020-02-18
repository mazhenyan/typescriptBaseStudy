interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: T;
}
export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data
    };
  }
  return {
    success: true,
    data
  };
};
// ! 优点问题？？？
// export const getResponseData = (data: any, errMsg?: string): Result => {
//   let result: Result;
//   if (errMsg) {
//     result.errMsg = errMsg;
//     result.data = data;
//     result.success = false;
//   } else {
//     result.success = true;
//     result.data = data;
//   }
//   return result;
// };
