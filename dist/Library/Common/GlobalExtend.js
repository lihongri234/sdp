"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
exports.Base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
exports.NtInitedDateTime = new Date(1900, 1, 1, 0, 0, 0, 0);
exports.Y_M_D_h_m_s = "yyyy-MM-dd HH:mm:ss";
exports.Y_M_D = "yyyy-MM-dd";
exports.IsNull = function (value) {
    if (value == null || value == undefined)
        return true;
    else
        return false;
};
exports.IsNullOrWhiteSpace = function (str) {
    if (exports.IsNull(str))
        return true;
    else
        return str.IsNullOrWhiteSpace();
};
exports.Random = function (min, max) {
    min = parseInt(min + "");
    max = parseInt(max + "");
    var _min = Math.min(min, max);
    var _max = Math.max(min, max);
    return parseInt((Math.random() * (_max - _min) + _min) + "");
};
exports.RandomList = function (min, max, len) {
    min = parseInt(min + "");
    max = parseInt(max + "");
    var result = new Array();
    if (len == 0)
        return result;
    if (len > (max - min))
        throw "参数len长度超出最大长度！";
    var _min = Math.min(min, max);
    var _max = Math.max(min, max);
    while (true) {
        var m = parseInt((Math.random() * (_max - _min) + _min) + "");
        if (!result.Contains(m))
            result.push(m);
        if (result.length == len)
            break;
    }
    return result;
};
exports.AscCompareDateTimeByString = function (t1, t2) {
    var d1 = t1.ToDate();
    var d2 = t2.ToDate();
    return d1 - d2;
};
exports.AscCompareDateTimeByDate = function (d1, d2) {
    return d1 - d2;
};
exports.DescCompareDateTimeByString = function (t1, t2) {
    var d1 = t1.ToDate();
    var d2 = t2.ToDate();
    return d2 - d1;
};
exports.DescCompareDateTimeByDate = function (d1, d2) {
    return d2 - d1;
};
function f(n) {
    return n < 10
        ? '0' + n
        : n;
}
function this_value() {
    return this.valueOf();
}
function Hook() {
    if (Boolean.prototype.ToJSON != undefined)
        return;
    Boolean.prototype.ToJSON = this_value;
    Number.prototype.ToJSON = this_value;
    Number.prototype.AppendZero = function (len) {
        var strTmp = "";
        for (var i = 0; i < len; i++)
            strTmp += "0";
        return ((strTmp + this).substring((strTmp + this).length - len));
    };
    Object.defineProperty(Object.prototype, "CloneObject", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (null == _this || "object" != typeof _this)
                    return _this;
                if (_this instanceof Number)
                    return _this;
                if (_this instanceof Boolean)
                    return _this;
                if (_this instanceof String)
                    return _this.toString();
                if (_this instanceof Date) {
                    var copy_1 = new Date();
                    copy_1.setTime(_this.getTime());
                    return copy_1;
                }
                if (_this instanceof Array) {
                    var copy_2 = [];
                    var i = 0;
                    var len = _this.length;
                    for (i = 0; i < len; ++i) {
                        if (_this[i].Clone != undefined)
                            copy_2[i] = _this[i].Clone();
                        else
                            copy_2[i] = _this[i].CloneObject();
                    }
                    return copy_2;
                }
                if (_this instanceof Object) {
                    var copy = {};
                    for (var attr in _this) {
                        if (_this.hasOwnProperty(attr)) {
                            var attrV = _this[attr];
                            if (null == attrV || "object" != typeof attrV)
                                copy[attr] = attrV;
                            else
                                copy[attr] = attrV.CloneObject();
                        }
                    }
                    return copy;
                }
                throw new Error("Unable to copy obj! Its type isn't supported.");
            };
        }
    });
    Object.defineProperty(String.prototype, "ToJSON", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                return _this.valueOf();
            };
        }
    });
    Object.defineProperty(String.prototype, "ReplaceAll", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (reallyDo, replaceWith, ignoreCase) {
                if (!RegExp.prototype.isPrototypeOf(reallyDo))
                    return _this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
                else
                    return _this.replace(reallyDo, replaceWith);
            };
        }
    });
    Object.defineProperty(String.prototype, "IsNullOrWhiteSpace", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (exports.IsNull(_this))
                    return true;
                else {
                    if (_this.trim() == "")
                        return true;
                    else
                        return false;
                }
            };
        }
    });
    Object.defineProperty(String.prototype, "IsMobilePhone", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (exports.IsNull(_this))
                    return false;
                var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
                if (isMob.test(_this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsTelPhone", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (exports.IsNull(_this))
                    return false;
                var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                if (isPhone.test(_this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsID", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (exports.IsNull(_this))
                    return false;
                var isID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (isID.test(_this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsNumber", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                if (exports.IsNull(_this))
                    return false;
                return !isNaN(parseFloat(_this));
            };
        }
    });
    Object.defineProperty(String.prototype, "ToDate", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var regEx = new RegExp("\\-", "gi");
                var result = new Date();
                result.setTime(Date.parse(_this.replace(regEx, "/")));
                return result;
            };
        }
    });
    Object.defineProperty(String.prototype, "StartWith", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (str) {
                if (_this.indexOf(str) == 0)
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "EndWith", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (str) {
                if (_this.lastIndexOf(str) + str.length == _this.length)
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "Utf16to8", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var out, i, len, c;
                out = "";
                len = _this.length;
                for (i = 0; i < len; i++) {
                    c = _this.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += _this.charAt(i);
                    }
                    else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                    else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            };
        }
    });
    Object.defineProperty(String.prototype, "Utf8to16", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var out, i, len, c;
                var char2, char3;
                out = "";
                len = _this.length;
                i = 0;
                while (i < len) {
                    c = _this.charCodeAt(i++);
                    switch (c >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            out += _this.charAt(i - 1);
                            break;
                        case 12:
                        case 13:
                            char2 = _this.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                            break;
                        case 14:
                            char2 = _this.charCodeAt(i++);
                            char3 = _this.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x0F) << 12) |
                                ((char2 & 0x3F) << 6) |
                                ((char3 & 0x3F) << 0));
                            break;
                    }
                }
                return out;
            };
        }
    });
    Object.defineProperty(String.prototype, "ToBase64String", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var str = _this.Utf16to8();
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += exports.Base64EncodeChars.charAt(c1 >> 2);
                        out += exports.Base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += exports.Base64EncodeChars.charAt(c1 >> 2);
                        out += exports.Base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += exports.Base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += exports.Base64EncodeChars.charAt(c1 >> 2);
                    out += exports.Base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += exports.Base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += exports.Base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            };
        }
    });
    Object.defineProperty(String.prototype, "FromBase64String", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var c1, c2, c3, c4;
                var i, len, out;
                len = _this.length;
                i = 0;
                out = "";
                while (i < len) {
                    do {
                        c1 = exports.Base64DecodeChars[_this.charCodeAt(i++) & 0xff];
                    } while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;
                    do {
                        c2 = exports.Base64DecodeChars[_this.charCodeAt(i++) & 0xff];
                    } while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;
                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                    do {
                        c3 = _this.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = exports.Base64DecodeChars[c3];
                    } while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;
                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                    do {
                        c4 = _this.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = exports.Base64DecodeChars[c4];
                    } while (i < len && c4 == -1);
                    if (c4 == -1)
                        break;
                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
                }
                return out.Utf8to16();
            };
        }
    });
    Object.defineProperty(Date.prototype, "ToJSON", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                return isFinite(_this.valueOf())
                    ? _this.getUTCFullYear() + '年' +
                        f(_this.getUTCMonth() + 1) + '月' +
                        f(_this.getUTCDate()) + '日 ' +
                        f(_this.getUTCHours()) + '时' +
                        f(_this.getUTCMinutes()) + '分' +
                        f(_this.getUTCSeconds()) + '秒'
                    : null;
            };
        }
    });
    Object.defineProperty(Date.prototype, "IsLeapYear", {
        enumerable: false,
        get: function () {
            return function (year) {
                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
            };
        }
    });
    Object.defineProperty(Date.prototype, "GetDaysInMonth", {
        enumerable: false,
        get: function () {
            return function (year, month) {
                return [31, (new Date().IsLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
            };
        }
    });
    Object.defineProperty(Date.prototype, "Format", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (format) {
                var o = {
                    "M+": _this.getMonth() + 1,
                    "d+": _this.getDate(),
                    "h+": _this.getHours(),
                    "m+": _this.getMinutes(),
                    "s+": _this.getSeconds(),
                    "q+": Math.floor((_this.getMonth() + 3) / 3),
                    "S": _this.getMilliseconds()
                };
                var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                if (/(w+)/.test(format)) {
                    format = format.replace(RegExp.$1, week[_this.getDay()]);
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddDays", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (d) {
                var r = new Date(_this.getTime());
                r.setDate(r.getDate() + d);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddWeeks", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (w) {
                return _this.AddDays(w * 7);
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddMonths", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (m) {
                var r = new Date(_this.getTime());
                var n = r.getDate();
                r.setDate(1);
                var _y = r.getFullYear();
                var _m = r.getMonth() + m;
                if (_m > 11) {
                    _m = _m - 12;
                    _y++;
                }
                else if (_m <= -1) {
                    _m = 12 + _m;
                    _y--;
                }
                r.setFullYear(_y);
                r.setMonth(_m);
                r.setDate(Math.min(n, r.GetDaysInMonth(r.getFullYear(), r.getMonth() + 1)));
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddYears", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (y) {
                var r = new Date(_this.getTime());
                var m = r.getMonth();
                r.setFullYear(r.getFullYear() + y);
                if (m < r.getMonth()) {
                    r.setDate(0);
                }
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddHour", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (h) {
                var r = new Date(_this.getTime());
                r.setHours(r.getHours() + h);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddMinute", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (m) {
                var r = new Date(_this.getTime());
                r.setMinutes(r.getMinutes() + m);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddSecond", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (s) {
                var r = new Date(_this.getTime());
                r.setSeconds(r.getSeconds() + s);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "DiffObject", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (endTime) {
                var sTime = _this;
                var eTime = endTime;
                var AllCount = eTime.getTime() - sTime.getTime();
                if (AllCount < 0)
                    return null;
                var h = parseInt(AllCount / (1000 * 3600) + "");
                var _h = "";
                if (h >= 10)
                    _h = h + "";
                else
                    _h = "0" + h;
                var ys = AllCount % (1000 * 3600);
                var m = parseInt(ys / (1000 * 60) + "");
                var _m = "";
                if (m >= 10)
                    _m = m + "";
                else
                    _m = "0" + m;
                ys = ys % (1000 * 60);
                var s = parseInt(ys / (1000) + "");
                var _s = "";
                if (s >= 10)
                    _s = s + "";
                else
                    _s = "0" + s;
                return {
                    Hour: _h,
                    Minute: _m,
                    Second: _s
                };
            };
        }
    });
    Object.defineProperty(Date.prototype, "DiffString", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (endTime) {
                var sTime = _this;
                var eTime = endTime;
                var AllCount = eTime.getTime() - sTime.getTime();
                if (AllCount < 0)
                    return null;
                var h = parseInt(AllCount / (1000 * 3600) + "");
                var _h = "";
                if (h >= 10)
                    _h = h + "";
                else
                    _h = "0" + h;
                var ys = AllCount % (1000 * 3600);
                var m = parseInt(ys / (1000 * 60) + "");
                var _m = "";
                if (m >= 10)
                    _m = m + "";
                else
                    _m = "0" + m;
                ys = ys % (1000 * 60);
                var s = parseInt(ys / (1000) + "");
                var _s = "";
                if (s >= 10)
                    _s = s + "";
                else
                    _s = "0" + s;
                return _h + ":" + _m + ":" + _s;
            };
        }
    });
    Object.defineProperty(Array.prototype, "Remove", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (item) {
                for (var i = _this.length - 1; i >= 0; i--) {
                    if (_this[i] == item) {
                        _this.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
        }
    });
    Object.defineProperty(Array.prototype, "RemoveSome", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return;
                else {
                    for (var i = _this.length - 1; i >= 0; i--) {
                        if (compareFunction(_this[i])) {
                            _this.splice(i, 1);
                        }
                    }
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Copy", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var result = new Array();
                if (exports.IsNull(_this) || _this.length == 0)
                    return result;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        result.push(_this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Clear", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                _this.splice(0, _this.length);
            };
        }
    });
    Object.defineProperty(Array.prototype, "Clone", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                return _this.CloneObject();
            };
        }
    });
    Object.defineProperty(Array.prototype, "Contains", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (item) {
                for (var i = _this.length - 1; i >= 0; i--) {
                    if (_this[i] == item)
                        return true;
                }
                return false;
            };
        }
    });
    Object.defineProperty(Array.prototype, "IndexOfX", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return -1;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        if (compareFunction(_this[i]))
                            return i;
                    }
                    return -1;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "LastIndexOfX", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return -1;
                else {
                    var num = -1;
                    for (var i = 0; i < _this.length; i++) {
                        if (compareFunction(_this[i]))
                            num = i;
                    }
                    return num;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Last", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return null;
                else {
                    var num = -1;
                    for (var i = 0; i < _this.length; i++) {
                        if (compareFunction(_this[i]))
                            num = i;
                    }
                    if (num == -1)
                        return null;
                    else
                        return _this[num];
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Default", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return null;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        if (compareFunction(_this[i]))
                            return _this[i];
                    }
                    return null;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Where", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                var result = new Array();
                if (exports.IsNull(_this) || _this.length == 0)
                    return result;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        if (compareFunction(_this[i]))
                            result.push(_this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "ForEach", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (func) {
                for (var i = 0; i < _this.length; i++) {
                    if (func(_this[i], i))
                        break;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Replace", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (oldItem, newItem) {
                if (exports.IsNull(_this) || _this.length == 0)
                    return false;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        if (_this[i] == oldItem) {
                            _this.splice(i, 1, newItem);
                            return true;
                        }
                    }
                    return false;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "GetList", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (indexs) {
                var result = new Array();
                if (exports.IsNull(_this) || _this.length == 0)
                    return result;
                else {
                    for (var i = 0; i < _this.length; i++) {
                        if (indexs.Contains(i))
                            result.push(_this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Max", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                var result = null;
                if (exports.IsNull(_this) || _this.length == 0)
                    return result;
                else {
                    var n = undefined;
                    for (var i = 0; i < _this.length; i++) {
                        var _n = compareFunction(_this[i]);
                        if (n == undefined) {
                            n = _n;
                            result = _this[i];
                        }
                        else {
                            if (n < _n) {
                                n = _n;
                                result = _this[i];
                            }
                        }
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Min", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function (compareFunction) {
                var result = null;
                if (exports.IsNull(_this) || _this.length == 0)
                    return result;
                else {
                    var n = undefined;
                    for (var i = 0; i < _this.length; i++) {
                        var _n = compareFunction(_this[i]);
                        if (n == undefined) {
                            n = _n;
                            result = _this[i];
                        }
                        else {
                            if (n > _n) {
                                n = _n;
                                result = _this[i];
                            }
                        }
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Knuth_Shuffle", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var currentIndex = _this.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = _this[currentIndex];
                    _this[currentIndex] = _this[randomIndex];
                    _this[randomIndex] = temporaryValue;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Fast_Shuffle", {
        enumerable: false,
        get: function () {
            var _this = this;
            return function () {
                var a, b, c, d;
                a = _this;
                c = a.length;
                while (c) {
                    b = Math.random() * (--c + 1) | 0;
                    d = a[c];
                    a[c] = a[b];
                    a[b] = d;
                }
            };
        }
    });
}
exports.Hook = Hook;
Hook();
