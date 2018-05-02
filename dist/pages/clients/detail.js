"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalExtend_1 = require("../../Library/Common/GlobalExtend");
var Entitys_1 = require("../../Common/Entitys");
var DetailPage = (function (_super) {
    __extends(DetailPage, _super);
    function DetailPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            tabIndex: 0,
            scrollHeight: 0,
            IsShowQingKun: false,
            IsShowCuiKun: false,
            IsShowSlot: false,
            IsActive: false,
            IsActive2: false,
            IsShowDingDan: false,
            startDate: "请选择",
            endDate: "请选择"
        };
        return _this;
    }
    DetailPage.prototype.InitData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                wx.getSystemInfo({
                    success: function (res) {
                        console.info(res.windowHeight);
                        _this._SetData({
                            scrollHeight: res.windowHeight
                        });
                    }
                });
                try {
                    wx.showLoading({ title: "数据加载中.....", icon: "loading" });
                    wx.hideLoading();
                }
                catch (e) {
                    this.ShowError(e);
                }
                finally {
                    wx.hideLoading();
                }
                return [2];
            });
        });
    };
    DetailPage.prototype.switchTab = function (e) {
        this._SetData({
            tabIndex: e.detail.current
        });
    };
    DetailPage.prototype.scrolltolower = function () { };
    DetailPage.prototype.FocusHandler = function () {
        this._SetData({ IsActive: true });
    };
    DetailPage.prototype.BlurHandler = function () {
        this._SetData({ IsActive: false });
    };
    DetailPage.prototype.FocusHandler2 = function () {
        this._SetData({ IsActive2: true });
    };
    DetailPage.prototype.BlurHandler2 = function () {
        this._SetData({ IsActive2: false });
    };
    DetailPage.prototype.CuiKuan = function (e) {
        this._SetData({ IsShowCuiKun: true });
    };
    DetailPage.prototype.QingKuan = function (e) {
        var type = e.currentTarget.dataset.type;
        if (GlobalExtend_1.IsNull(type)) {
            this._SetData({ IsShowQingKun: true, IsShowDingDan: true });
        }
        else
            this._SetData({ IsShowQingKun: true, IsShowDingDan: false });
    };
    DetailPage.prototype.AllQingKun = function (e) { };
    DetailPage.prototype.CanlerHandler = function (e) {
        this._SetData({
            IsShowQingKun: false,
            IsShowSlot: false,
            IsShowCuiKun: false
        });
    };
    DetailPage.prototype.ConfrimHandler = function (e) {
        this._SetData({ IsShowQingKun: true });
    };
    DetailPage.prototype.SoltHandler = function (e) {
        this._SetData({ IsShowSlot: true });
    };
    DetailPage.prototype.bindStartDateChange = function (e) {
        this._SetData({ startDate: e.detail.value });
    };
    DetailPage.prototype.bindEndDateChange = function (e) {
        this._SetData({
            endDate: e.detail.value
        });
    };
    return DetailPage;
}(Entitys_1.Wx_SDPPage));
Page(new DetailPage());
