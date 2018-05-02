import { IsNull } from "../Library/Common/GlobalExtend";
import { Config } from "../Config";
import { encrypt, decrypt } from "./DES3";

export var ConvertToBoolean = (b: string | number): boolean => {
    if (b == "true" || b == 1) return true;
    else return false;
};

export var WX_request = (
    url: string,
    data?: any,
    method: string = "POST"
): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            wx.request({
                url: url,
                data: data,
                method: method,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: async res => {
                    console.log("res2", res);
                    // if (res.statusCode == 200) {
                    resolve(res.data);
                    // } else reject("获取服务器数据错误！");
                },
                fail: res => {
                    reject("获取服务器数据错误！");
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

export var WX_uploadFile = (
    url: string,
    data?: any,
    Folder: string = "dynamic"
): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            wx.uploadFile({
                url: url,
                filePath: data,
                header: {
                    "content-type": "application/json",
                    EncryptStr: wx.getStorageSync("EncryptStr") || "",
                    UnionId: wx.getStorageSync("UnionId") || ""
                },
                name: "file",
                formData: {
                    Folder: `uploadFile/${Folder}`
                },
                success: async res => {
                    let data: any = res.data;
                    let r = JSON.parse(data).RESULT;
                    resolve(r);
                },
                fail: res => {
                    reject("获取服务器数据错误！");
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};
export var WX_login = (): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            wx.login({
                success: res => {
                    resolve(res.code);
                },
                fail: res => {
                    reject("登录失败！");
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

export var WX_getUserInfo = (): Promise<{
    encryptedData: string;
    iv: string;
}> => {
    return new Promise<{ encryptedData: string; iv: string }>(
        async (resolve, reject) => {
            try {
                wx.getUserInfo({
                    success: res => {
                        //一定要把加密串转成URI编码
                        //let encryptedData = encodeURIComponent(res.encryptedData);
                        let iv = res.iv;
                        resolve({ encryptedData: res.encryptedData, iv: iv });
                    },
                    fail: res => {
                        reject("获取用户信息失败");
                    }
                });
            } catch (e) {
                reject(e);
            }
        }
    );
};

export var Login = (loginUrl: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            wx.showToast({
                title: "登陆中...",
                icon: "loading",
                duration: -1
            });
            let code = await WX_login();
            let u = await WX_getUserInfo();
            let r = await WX_request(loginUrl, {
                code: code,
                encryptedData: u.encryptedData,
                iv: u.iv
            });
            wx.hideToast();
            console.log("r", r);
            wx.setStorageSync("UnionId", r.USERINFO.UNIONID);
            wx.setStorageSync("EncryptStr", r.ENCRYPTSTR);
            resolve(r.USERINFO);
        } catch (e) {
            reject(e);
        }
    });
};

//=======================================================
/*
* service:交易驱动名称
* cmd:接口名
* data:业务参数
*/
export var WX_requestDES = (cmd: string, data?: string, service: string = "sellerservice"): Promise<any> => {
           return new Promise<any>(async (resolve, reject) => {
               try {
                   if (Config.MAINKEY == "") {
                       //第一次为空，请求密钥
                       await authen_login();
                   }
                   let d = `service=${service}&cmd=${cmd}&` + data;
                   console.log("data", d);
                   wx.request({
                       url: Config.GatewayUrl,
                       data: {
                           executor: "http",
                           channel: 2,
                           data: encrypt(Config.DES3KEY, d)
                       },
                       header: {
                           "content-type": "application/x-www-form-urlencoded"
                       },
                       method: "POST",
                       success: async res => {
                           console.log("e", res);
                           resolve(res.data);
                       },
                       fail: res => {
                           reject("获取服务器数据错误！");
                       }
                   });
               } catch (e) {
                   reject(e);
               }
           });
       };

//=================请求密钥===================
//用户签到
export var authen_login = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            let postData = `service=authen&cmd=login&authencode=${
                Config.authencode
            }&password=${Config.password}`;
            let key = "";
            let r = await WX_request(Config.GatewayUrl, {
                executor: "http",
                channel: 2,
                data: encrypt(Config.DES3KEY, postData)
            });
            console.log("key");
            if (!IsNull(r.datakey)) {
                key = r.datakey;
                Config.MAINKEY = r.datakey;
            }
        } catch (e) {
            console.log("获取密钥出错：", e);
        }
    });
};
export var authen_logins = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            let postData = `service=authen&cmd=login&authencode=${
                Config.authencode
            }&password=${Config.password}`;
            let key = "";
            let r = await WX_request(Config.GatewayUrl, {
                executor: "http",
                channel: 2,
                data: encrypt(Config.DES3KEY, postData)
            });
            if (!IsNull(r.datakey)) {
                key = r.datakey;
                Config.MAINKEY = r.datakey;
            }
        } catch (e) {
            console.log("获取密钥出错：", e);
        }
    });
};

//用户重新签到
export var authen_relogin = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            let postData = `service=authen&cmd=relogin&authencode=${
                Config.authencode
            }&password=${Config.password}`;
            let key = "";
            let r = await WX_request(Config.GatewayUrl, {
                executor: "http",
                channel: 2,
                data: encrypt(Config.DES3KEY, postData)
            });
            if (!IsNull(r.datakey)) {
                key = r.datakey;
                Config.MAINKEY = r.datakey;
            }
        } catch (e) {
            console.log("获取密钥出错：", e);
        }
    });
};
//用户注销签到
export var authen_logout = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            let postData = `service=authen&cmd=logout&authencode=${
                Config.authencode
            }&password=${Config.password}`;
            let r = await WX_request(Config.GatewayUrl, {
                executor: "http",
                channel: 2,
                data: encrypt(Config.DES3KEY, postData)
            });
        } catch (e) {
            reject(e);
        }
    });
};
