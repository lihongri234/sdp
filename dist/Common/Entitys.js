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
Object.defineProperty(exports, "__esModule", { value: true });
var EntityBase_1 = require("./EntityBase");
var Wx_SDP_Application = (function (_super) {
    __extends(Wx_SDP_Application, _super);
    function Wx_SDP_Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Wx_SDP_Application;
}(EntityBase_1.Wx_Application));
exports.Wx_SDP_Application = Wx_SDP_Application;
var Wx_SDPPage = (function (_super) {
    __extends(Wx_SDPPage, _super);
    function Wx_SDPPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.App = null;
        return _this;
    }
    return Wx_SDPPage;
}(EntityBase_1.Wx_Page));
exports.Wx_SDPPage = Wx_SDPPage;
var DateType;
(function (DateType) {
    DateType[DateType["JT"] = 0] = "JT";
    DateType[DateType["ZT"] = 1] = "ZT";
    DateType[DateType["BY"] = 2] = "BY";
})(DateType = exports.DateType || (exports.DateType = {}));
var ReceivablesType;
(function (ReceivablesType) {
    ReceivablesType[ReceivablesType["XJ"] = 0] = "XJ";
    ReceivablesType[ReceivablesType["WX"] = 1] = "WX";
    ReceivablesType[ReceivablesType["ZFB"] = 2] = "ZFB";
    ReceivablesType[ReceivablesType["YL"] = 3] = "YL";
})(ReceivablesType = exports.ReceivablesType || (exports.ReceivablesType = {}));
