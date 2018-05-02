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
var Entitys_1 = require("../../Common/Entitys");
var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p_audioCtx = null;
        _this.data = {
            current: 0,
            pageIndex: 1,
            pageSize: 10,
            goodsList: [],
            audioCtx: null,
            audioUrl: "",
            IsOperat: false,
            IsSearch: false,
            IsEditAmount: false,
            IsSettleAccounts: false,
            Isatvice: 2,
            SumMoney: 0,
            preferential: 0,
            PriceStr: "0",
            QuantityStr: "0"
        };
        return _this;
    }
    IndexPage.prototype.InitData = function (options) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    IndexPage.prototype.InitFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    wx.showLoading({
                        title: "数据加载中.....",
                        icon: "loading"
                    });
                    wx.hideLoading();
                }
                catch (e) {
                    this.ShowError(e);
                }
                return [2];
            });
        });
    };
    IndexPage.prototype.onReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.p_audioCtx = wx.createAudioContext("numAudio");
                return [2];
            });
        });
    };
    IndexPage.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, i;
            return __generator(this, function (_a) {
                list = [];
                for (i = 0; i < 10; i++) {
                    list.push({
                        id: i,
                        name: "新疆小核桃" + i,
                        unit: "2kg/包",
                        standard: "80",
                        origin: "吐鲁番",
                        brandName: "样品",
                        price: 100.0,
                        qty: 0,
                        isAtvice: false
                    });
                }
                this._SetData({ goodsList: list });
                return [2];
            });
        });
    };
    IndexPage.prototype.Operating = function () {
        if (this.data.IsOperat) {
            this._SetData({ IsOperat: false });
        }
        else {
            this._SetData({ IsOperat: true });
        }
    };
    IndexPage.prototype.ShowSearch = function () {
        this._SetData({ IsSearch: true });
    };
    IndexPage.prototype.HiedwSearch = function () {
        this._SetData({ IsSearch: false });
    };
    IndexPage.prototype.selectGoods = function (event) {
        console.log(event);
        var index = event.currentTarget.dataset.id;
        console.log(index);
        var list = this.data.goodsList;
        for (var i = 0; i < list.length; i++) {
            list[i].isAtvice = false;
        }
        list[index].isAtvice = true;
        this._SetData({ current: index });
        this._SetData({ PriceStr: list[index].price + "" });
        this._SetData({ QuantityStr: list[index].qty + "" });
        this._SetData({ goodsList: list });
    };
    IndexPage.prototype.EditAmount = function () {
        this._SetData({ IsEditAmount: true });
    };
    IndexPage.prototype.cancelAmount = function () {
        this._SetData({ IsEditAmount: false });
    };
    IndexPage.prototype.SettleAccounts = function () {
        this._SetData({ IsSettleAccounts: true });
    };
    IndexPage.prototype.cancelSettleAccounts = function () {
        this._SetData({ IsSettleAccounts: false });
    };
    IndexPage.prototype.FocusHandler = function (event) {
        this._SetData({ Isatvice: event.target.dataset.id });
    };
    IndexPage.prototype.NumberClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var num, url, str, patt, list, sumMoney, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = event.currentTarget.dataset.num;
                        url = "../../audio/" + num + ".wav";
                        if (num == ".") {
                            url = "../../audio/dot.wav";
                        }
                        return [4, this._SetData({ audioUrl: url })];
                    case 1:
                        _a.sent();
                        console.log(this.data.audioUrl);
                        return [4, this.p_audioCtx.play()];
                    case 2:
                        _a.sent();
                        str = "";
                        patt = /^(\d{1,5}|\d{1,5}.|\d{1,5}.\d{1,2})$/;
                        if (!(this.data.Isatvice == 1)) return [3, 5];
                        if (num == "del") {
                            if (this.data.PriceStr.length > 1) {
                                str = this.data.PriceStr.substring(0, this.data.PriceStr.length - 1);
                            }
                            else {
                                str = "0";
                            }
                        }
                        else {
                            if (num == ".") {
                                if (this.data.PriceStr.indexOf(".") == -1)
                                    str =
                                        this.data.PriceStr == "0"
                                            ? "0" + num
                                            : this.data.PriceStr + num;
                            }
                            else {
                                str =
                                    this.data.PriceStr == "0"
                                        ? num
                                        : this.data.PriceStr + num;
                            }
                        }
                        if (!patt.test(str)) return [3, 4];
                        return [4, this._SetData({ PriceStr: str })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3, 7];
                    case 5:
                        if (num == "del") {
                            if (this.data.QuantityStr.length > 1) {
                                str = this.data.QuantityStr.substring(0, this.data.QuantityStr.length - 1);
                            }
                            else {
                                str = "0";
                            }
                        }
                        else {
                            if (num == ".") {
                                if (this.data.QuantityStr.indexOf(".") == -1)
                                    str =
                                        this.data.QuantityStr == "0"
                                            ? "0" + num
                                            : this.data.QuantityStr + num;
                            }
                            else {
                                str =
                                    this.data.QuantityStr == "0"
                                        ? num
                                        : this.data.QuantityStr + num;
                            }
                        }
                        if (!patt.test(str)) return [3, 7];
                        return [4, this._SetData({ QuantityStr: str })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        list = this.data.goodsList;
                        list[this.data.current].price = parseInt(this.data.PriceStr);
                        list[this.data.current].qty = parseInt(this.data.QuantityStr);
                        sumMoney = 0;
                        for (i = 0; i < list.length; i++) {
                            sumMoney += list[i].price * list[i].qty;
                        }
                        this._SetData({ SumMoney: sumMoney });
                        this._SetData({ goodsList: list });
                        return [2];
                }
            });
        });
    };
    return IndexPage;
}(Entitys_1.Wx_SDPPage));
Page(new IndexPage());
