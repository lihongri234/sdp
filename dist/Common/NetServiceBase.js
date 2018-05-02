"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalExtend_1 = require("../Library/Common/GlobalExtend");
var Config_1 = require("../Config");
var DES3_1 = require("./DES3");
exports.ConvertToBoolean = function (b) {
    if (b == "true" || b == 1)
        return true;
    else
        return false;
};
exports.WX_request = function (url, data, method) {
    if (method === void 0) { method = "POST"; }
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                wx.request({
                    url: url,
                    data: data,
                    method: method,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log("res2", res);
                            resolve(res.data);
                            return [2];
                        });
                    }); },
                    fail: function (res) {
                        reject("获取服务器数据错误！");
                    }
                });
            }
            catch (e) {
                reject(e);
            }
            return [2];
        });
    }); });
};
exports.WX_uploadFile = function (url, data, Folder) {
    if (Folder === void 0) { Folder = "dynamic"; }
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
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
                        Folder: "uploadFile/" + Folder
                    },
                    success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var data, r;
                        return __generator(this, function (_a) {
                            data = res.data;
                            r = JSON.parse(data).RESULT;
                            resolve(r);
                            return [2];
                        });
                    }); },
                    fail: function (res) {
                        reject("获取服务器数据错误！");
                    }
                });
            }
            catch (e) {
                reject(e);
            }
            return [2];
        });
    }); });
};
exports.WX_login = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                wx.login({
                    success: function (res) {
                        resolve(res.code);
                    },
                    fail: function (res) {
                        reject("登录失败！");
                    }
                });
            }
            catch (e) {
                reject(e);
            }
            return [2];
        });
    }); });
};
exports.WX_getUserInfo = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                wx.getUserInfo({
                    success: function (res) {
                        var iv = res.iv;
                        resolve({ encryptedData: res.encryptedData, iv: iv });
                    },
                    fail: function (res) {
                        reject("获取用户信息失败");
                    }
                });
            }
            catch (e) {
                reject(e);
            }
            return [2];
        });
    }); });
};
exports.Login = function (loginUrl) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var code, u, r, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    wx.showToast({
                        title: "登陆中...",
                        icon: "loading",
                        duration: -1
                    });
                    return [4, exports.WX_login()];
                case 1:
                    code = _a.sent();
                    return [4, exports.WX_getUserInfo()];
                case 2:
                    u = _a.sent();
                    return [4, exports.WX_request(loginUrl, {
                            code: code,
                            encryptedData: u.encryptedData,
                            iv: u.iv
                        })];
                case 3:
                    r = _a.sent();
                    wx.hideToast();
                    console.log("r", r);
                    wx.setStorageSync("UnionId", r.USERINFO.UNIONID);
                    wx.setStorageSync("EncryptStr", r.ENCRYPTSTR);
                    resolve(r.USERINFO);
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    reject(e_1);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); });
};
exports.WX_requestDES = function (cmd, data, service) {
    if (service === void 0) { service = "sellerservice"; }
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var d, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(Config_1.Config.MAINKEY == "")) return [3, 2];
                    return [4, exports.authen_login()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    d = "service=" + service + "&cmd=" + cmd + "&" + data;
                    console.log("data", d);
                    wx.request({
                        url: Config_1.Config.GatewayUrl,
                        data: {
                            executor: "http",
                            channel: 2,
                            data: DES3_1.encrypt(Config_1.Config.DES3KEY, d)
                        },
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log("e", res);
                                resolve(res.data);
                                return [2];
                            });
                        }); },
                        fail: function (res) {
                            reject("获取服务器数据错误！");
                        }
                    });
                    return [3, 4];
                case 3:
                    e_2 = _a.sent();
                    reject(e_2);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
};
exports.authen_login = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var postData, key, r, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postData = "service=authen&cmd=login&authencode=" + Config_1.Config.authencode + "&password=" + Config_1.Config.password;
                    key = "";
                    return [4, exports.WX_request(Config_1.Config.GatewayUrl, {
                            executor: "http",
                            channel: 2,
                            data: DES3_1.encrypt(Config_1.Config.DES3KEY, postData)
                        })];
                case 1:
                    r = _a.sent();
                    console.log("key");
                    if (!GlobalExtend_1.IsNull(r.datakey)) {
                        key = r.datakey;
                        Config_1.Config.MAINKEY = r.datakey;
                    }
                    return [3, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log("获取密钥出错：", e_3);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
};
exports.authen_logins = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var postData, key, r, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postData = "service=authen&cmd=login&authencode=" + Config_1.Config.authencode + "&password=" + Config_1.Config.password;
                    key = "";
                    return [4, exports.WX_request(Config_1.Config.GatewayUrl, {
                            executor: "http",
                            channel: 2,
                            data: DES3_1.encrypt(Config_1.Config.DES3KEY, postData)
                        })];
                case 1:
                    r = _a.sent();
                    if (!GlobalExtend_1.IsNull(r.datakey)) {
                        key = r.datakey;
                        Config_1.Config.MAINKEY = r.datakey;
                    }
                    return [3, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log("获取密钥出错：", e_4);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
};
exports.authen_relogin = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var postData, key, r, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postData = "service=authen&cmd=relogin&authencode=" + Config_1.Config.authencode + "&password=" + Config_1.Config.password;
                    key = "";
                    return [4, exports.WX_request(Config_1.Config.GatewayUrl, {
                            executor: "http",
                            channel: 2,
                            data: DES3_1.encrypt(Config_1.Config.DES3KEY, postData)
                        })];
                case 1:
                    r = _a.sent();
                    if (!GlobalExtend_1.IsNull(r.datakey)) {
                        key = r.datakey;
                        Config_1.Config.MAINKEY = r.datakey;
                    }
                    return [3, 3];
                case 2:
                    e_5 = _a.sent();
                    console.log("获取密钥出错：", e_5);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
};
exports.authen_logout = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var postData, r, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postData = "service=authen&cmd=logout&authencode=" + Config_1.Config.authencode + "&password=" + Config_1.Config.password;
                    return [4, exports.WX_request(Config_1.Config.GatewayUrl, {
                            executor: "http",
                            channel: 2,
                            data: DES3_1.encrypt(Config_1.Config.DES3KEY, postData)
                        })];
                case 1:
                    r = _a.sent();
                    return [3, 3];
                case 2:
                    e_6 = _a.sent();
                    reject(e_6);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
};
