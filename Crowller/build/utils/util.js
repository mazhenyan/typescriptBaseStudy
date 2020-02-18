"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data
        };
    }
    return {
        success: true,
        data: data
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
