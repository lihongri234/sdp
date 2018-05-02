"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entitys_1 = require("./Entitys");
exports.GetDateDiff = function (d) {
    var minute = 1000 * 60, hour = minute * 60, day = hour * 24, halfamonth = day * 15, month = day * 30, now = new Date().getTime(), diffValue = now - d, monthC = diffValue / month, weekC = diffValue / (7 * day), dayC = diffValue / day, hourC = diffValue / hour, minC = diffValue / minute, date = new Date(d);
    if (diffValue < 0)
        return "不久前";
    if (monthC > 12) {
        return (date.getFullYear() +
            "年" +
            exports.Zero(date.getMonth() + 1) +
            "月" +
            exports.Zero(date.getDate()) +
            "日");
    }
    else if (monthC >= 1)
        return parseInt(monthC) + "月前";
    else if (weekC >= 1)
        return parseInt(weekC) + "周前";
    else if (dayC >= 1)
        return parseInt(dayC) + "天前";
    else if (hourC >= 1)
        return parseInt(hourC) + "小时前";
    else if (minC >= 1)
        return parseInt(minC) + "分钟前";
    return "刚刚";
};
exports.FormatTime = function (date, type) {
    if (type === void 0) { type = Entitys_1.DateType.JT; }
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), _day = date.getDay(), hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
    if (type == Entitys_1.DateType.JT)
        return [year, month, day].map(exports.Zero).join("-");
    else if (type == Entitys_1.DateType.ZT)
        return [year, month, day - 1].map(exports.Zero).join("-");
    else {
        return [year, month, new Date(year, month, 0).getDate()]
            .map(exports.Zero)
            .join("-");
    }
};
exports.formartDate = function (y, m, d, symbol) {
    if (symbol === void 0) { symbol = "-"; }
    m = m.toString()[1] ? m : "0" + m;
    d = d.toString()[1] ? d : "0" + d;
    return y + symbol + m + symbol + d;
};
exports.Zero = function (v) {
    if (v < 10)
        return "0" + v;
    return v;
};
exports.CompileStr = function (code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
};
exports.UnCompileStr = function (code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};
