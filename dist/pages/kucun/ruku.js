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
var Utils_1 = require("../../Common/Utils");
var RuKunPage = (function (_super) {
    __extends(RuKunPage, _super);
    function RuKunPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            dayArr: [],
            day: 0,
            fulldata: "",
            isgray: true,
            isshowdate: false,
            Type: 0
        };
        return _this;
    }
    RuKunPage.prototype.InitData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options.type == 0)
                    this._SetData({ Type: 0 });
                else
                    this._SetData({ Type: 1 });
                this.InitDay();
                return [2];
            });
        });
    };
    RuKunPage.prototype.InitFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    wx.showLoading({ title: "数据加载中.....", icon: "loading" });
                    wx.hideLoading();
                }
                catch (e) {
                    this.ShowError(e);
                }
                return [2];
            });
        });
    };
    RuKunPage.prototype.InitDay = function () {
        var curDate = new Date();
        this.p_year = curDate.getFullYear();
        this.p_month = curDate.getMonth();
        this.p_date = curDate.getDate();
        this.p_day = curDate.getDay();
        this.InitDate();
    };
    RuKunPage.prototype.InitDate = function () {
        var fullDay = new Date(this.p_year, this.p_month + 1, 0).getDate(), startWeek = new Date(this.p_year, this.p_month, 1).getDay();
        var arr = [];
        for (var j = 0; j < startWeek; j++) {
            arr.unshift("");
        }
        for (var i = 1; i <= fullDay; i++) {
            arr.push(i);
        }
        this._SetData({
            dayArr: arr,
            day: this.p_date,
            fullData: Utils_1.formartDate(this.p_year, this.p_month + 1, this.p_date, "-")
        });
    };
    RuKunPage.prototype.selectday = function (e) {
        var index = e.currentTarget.dataset.index;
        if (!GlobalExtend_1.IsNull(index)) {
            var item = this.data.dayArr[index];
            this._SetData({
                day: item,
                fullData: Utils_1.formartDate(this.p_year, this.p_month + 1, item, "-")
            });
        }
    };
    RuKunPage.prototype.nextMonth = function () {
        if (this.p_month + 1 > 11) {
            this.p_year += 1;
            this.p_month = 0;
        }
        else {
            if (this.p_month == new Date().getMonth()) {
                this.p_month = this.p_month;
                this.ShowError("最迟只能选这个月的日期！");
                this._SetData({ isgray: true });
            }
            else {
                this.p_month += 1;
                this._SetData({ isgray: false });
            }
        }
        this.InitDate();
    };
    RuKunPage.prototype.prevMonth = function () {
        if (this.p_month - 1 < 0) {
            this.p_year -= 1;
            this.p_month = 11;
        }
        else {
            this.p_month -= 1;
        }
        this._SetData({ isgray: false });
        this.InitDate();
    };
    RuKunPage.prototype.selectHandler = function () {
        if (this.data.isshowdate)
            this._SetData({ isshowdate: false });
        else
            this._SetData({ isshowdate: true });
    };
    return RuKunPage;
}(Entitys_1.Wx_SDPPage));
Page(new RuKunPage());
