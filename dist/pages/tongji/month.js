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
var MonthPage = (function (_super) {
    __extends(MonthPage, _super);
    function MonthPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p_monthArr = [];
        _this.data = {
            monthArr: [],
            month: 0,
            date: "请选择",
            IsShowMonth: false,
            width: 0
        };
        return _this;
    }
    MonthPage.prototype.InitData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.getSystemInfo({
                            success: function (res) {
                                console.info(res.windowWidth);
                                _this._SetData({ width: res.windowWidth });
                            }
                        });
                        return [4, this.InitMonth()];
                    case 1:
                        _a.sent();
                        return [4, this.check()];
                    case 2:
                        _a.sent();
                        this.init();
                        return [2];
                }
            });
        });
    };
    MonthPage.prototype.InitFriends = function () {
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
    MonthPage.prototype.InitMonth = function () {
        var curDate = new Date();
        this.p_month = curDate.getMonth();
        this.p_month++;
        for (var i = this.p_month; i < this.p_month + 6; i--) {
            if (i < 1) {
                return;
            }
            else {
                this.p_monthArr.push(i);
                this._SetData({ monthArr: this.p_monthArr });
            }
        }
    };
    MonthPage.prototype.check = function () {
        if (this.data.monthArr.length <= 3)
            this.p_monthArr.push(12, 11, 10);
        else if (this.data.monthArr.length <= 4)
            this.p_monthArr.push(12, 11);
        else if (this.data.monthArr.length <= 5)
            this.p_monthArr.push(12);
        this._SetData({ monthArr: this.p_monthArr, month: this.p_month });
    };
    MonthPage.prototype.selectMonth = function (e) {
        var index = e.currentTarget.dataset.index;
        if (!GlobalExtend_1.IsNull(index)) {
            var item = this.data.monthArr[index];
            this._SetData({
                month: item
            });
            console.log("月份", item);
        }
    };
    MonthPage.prototype.bindDateChange = function (e) {
        this._SetData({ date: e.detail.value });
    };
    MonthPage.prototype.Cheak = function () {
        if (this.data.IsShowMonth)
            this._SetData({ IsShowMonth: false });
        else
            this._SetData({ IsShowMonth: true });
    };
    MonthPage.prototype.ConfrimHandler = function () {
        this.Cheak();
    };
    MonthPage.prototype.drawCircle = function (ctx, data_arr, color_arr, text_arr) {
        var radius = this.data.width / 2 - 90;
        console.log("radius", radius);
        var ox = radius + 90, oy = radius + 40;
        var width = 30, height = 10;
        var posX = 20, posY = 5;
        var textX = posX + width + 10, textY = posY + 5;
        var startAngle = 0;
        var endAngle = 0;
        if (data_arr.length == 0) {
            ctx.beginPath();
            ctx.fillStyle = "#999";
            ctx.moveTo(ox, oy);
            ctx.arc(ox, oy, radius, startAngle, Math.PI * 2, false);
            ctx.fill();
        }
        else {
            for (var i = 0; i < data_arr.length; i++) {
                ctx.beginPath();
                endAngle = endAngle + data_arr[i] * Math.PI * 2;
                ctx.fillStyle = color_arr[i];
                ctx.moveTo(ox, oy);
                ctx.arc(ox, oy, radius, startAngle, endAngle, false);
                startAngle = endAngle;
                ctx.setLineWidth(2);
                ctx.fillStyle = color_arr[i];
                ctx.fillRect(posX, posY + 20 * i, width, height);
                ctx.moveTo(posX + 300 * i, posY + 270 * i);
                ctx.setFontSize(14);
                ctx.setTextBaseline("middle");
                ctx.fillStyle = color_arr[i];
                var percent = text_arr[i] + "：" + 100 * data_arr[i] + "%";
                ctx.fillText(percent, textX, textY + 20 * i);
                ctx.fill();
            }
        }
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.moveTo(ox, oy);
        ctx.arc(ox, oy, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.draw();
    };
    MonthPage.prototype.init = function () {
        var ctx = wx.createCanvasContext("Canvas");
        console.log("ctx", ctx);
        var min = Math.min.apply(null, [1, 10]);
        var max = Math.max.apply(null, [1, 10]);
        console.log("min", min);
        console.log("max", max);
        var data_arr = [0.1, 0.9];
        var color_arr = ["#18cebd", "#ff683e"];
        var text_arr = ["挂账", "已支付"];
        this.drawCircle(ctx, data_arr, color_arr, text_arr);
    };
    return MonthPage;
}(Entitys_1.Wx_SDPPage));
Page(new MonthPage());
