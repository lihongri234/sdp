import * as NS from "./NetServiceBase";
import { Config } from "../Config";
import {} from "./Entitys";
import { IsNull } from "../Library/Common/GlobalExtend";
import { OObject } from "../Library/System/System";
import { WX_requestDES, WX_request } from "./NetServiceBase";
import { decrypt, encrypt } from "./DES3";

// ==============接口列表==============
//用户登录
export var user_login = (userName, userPwd): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let str = `${Config.commonargs}&userName=${userName}&userPwd=${userPwd}`;
      console.log("str",str);
      
      let r = await WX_requestDES("login", str);
      resolve(r);
    } catch (e) {
      reject(e);
    }
  });
};
//获取用户的默认配置
export var user_getDefaultCofing = (merchantCode, token): Promise<any> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      let infoStr = `authencode=${Config.authencode}&visitChannel=${
        Config.visitChannel
      }&merchantCode=${merchantCode}&token=${token}`;
      let r = await WX_requestDES("sellerservice", "getDefaultCofing", infoStr);
      resolve(r);
    } catch (e) {
      reject(e);
    }
  });
};
