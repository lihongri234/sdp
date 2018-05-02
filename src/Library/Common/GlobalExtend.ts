
export const Base64EncodeChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export const Base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
export const NtInitedDateTime: Date = new Date(1900, 1, 1, 0, 0, 0, 0);
export const Y_M_D_h_m_s: string = "yyyy-MM-dd HH:mm:ss";
export const Y_M_D: string = "yyyy-MM-dd";

export var IsNull = (value: any): boolean => {
    if (value == null || value == undefined)
        return true;
    else
        return false;
}

export var IsNullOrWhiteSpace = (str: string): boolean => {
    if (IsNull(str))
        return true;
    else
        return str.IsNullOrWhiteSpace();
}

export var Random = (min: number, max: number): number => {
    min = parseInt(min + "");
    max = parseInt(max + "");
    let _min = Math.min(min, max)
    let _max = Math.max(min, max);
    return parseInt((Math.random() * (_max - _min) + _min) + "");
}

export var RandomList = (min: number, max: number, len: number): Array<number> => {
    min = parseInt(min + "");
    max = parseInt(max + "");
    let result = new Array<number>();
    if (len == 0)
        return result;
    if (len > (max - min))
        throw "参数len长度超出最大长度！";
    let _min = Math.min(min, max)
    let _max = Math.max(min, max);
    while (true) {
        let m = parseInt((Math.random() * (_max - _min) + _min) + "");
        if (!result.Contains(m))
            result.push(m);
        if (result.length == len)
            break;
    }
    return result;
}

/** 升序 */
export var AscCompareDateTimeByString = (t1: string, t2: string): number => {
    let d1 = t1.ToDate();
    let d2 = t2.ToDate();
    return (d1 as any) - (d2 as any);
}
export var AscCompareDateTimeByDate = (d1: Date, d2: Date): number => {
    return (d1 as any) - (d2 as any);
}

/** 降序 */
export var DescCompareDateTimeByString = (t1: string, t2: string): number => {
    let d1 = t1.ToDate();
    let d2 = t2.ToDate();
    return (d2 as any) - (d1 as any);
}
export var DescCompareDateTimeByDate = (d1: Date, d2: Date): number => {
    return (d2 as any) - (d1 as any);
}

/**
 * Format integers to have at least two digits.
 * 
 * @param {any} n 
 * @returns 
 */
function f(n) {
    return n < 10
        ? '0' + n
        : n;
}

function this_value() {
    return this.valueOf();
}

export function Hook() {
    if (Boolean.prototype.ToJSON != undefined)
        return;
    Boolean.prototype.ToJSON = this_value;

    Number.prototype.ToJSON = this_value;
    Number.prototype.AppendZero = function (len: number): string {
        var strTmp = "";
        for (var i = 0; i < len; i++)
            strTmp += "0";
        return ((strTmp + this).substring((strTmp + this).length - len));
    }

    Object.defineProperty(Object.prototype, "CloneObject", {
        enumerable: false,
        get: function () {
            return (): Object => {
                // Handle the 3 simple types, and null or undefined
                if (null == this || "object" != typeof this) return this;

                if (this instanceof Number)
                    return this;
                if (this instanceof Boolean)
                    return this;
                if (this instanceof String)
                    return this.toString();

                // Handle Date
                if (this instanceof Date) {
                    let copy = new Date();
                    copy.setTime(this.getTime());
                    return copy;
                }

                // Handle Array
                if (this instanceof Array) {
                    let copy = [];
                    let i = 0;
                    let len = this.length;
                    for (i = 0; i < len; ++i) {
                        if (this[i].Clone != undefined)
                            copy[i] = this[i].Clone();
                        else
                            copy[i] = this[i].CloneObject();
                    }
                    return copy;
                }

                // Handle Object
                if (this instanceof Object) {
                    var copy = {};
                    for (let attr in this) {
                        if (this.hasOwnProperty(attr)) {
                            let attrV = this[attr];
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
            return (): string => {
                return this.valueOf();
            };
        }
    });
    Object.defineProperty(String.prototype, "ReplaceAll", {
        enumerable: false,
        get: function () {
            return (reallyDo: string, replaceWith: string, ignoreCase: boolean): string => {
                if (!RegExp.prototype.isPrototypeOf(reallyDo))
                    return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
                else
                    return this.replace(reallyDo, replaceWith);
            };
        }
    });
    Object.defineProperty(String.prototype, "IsNullOrWhiteSpace", {
        enumerable: false,
        get: function () {
            return (): boolean => {
                if (IsNull(this))
                    return true;
                else {
                    if (this.trim() == "")
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
            return (): boolean => {
                if (IsNull(this))
                    return false;
                let isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
                if (isMob.test(this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsTelPhone", {
        enumerable: false,
        get: function () {
            return (): boolean => {
                if (IsNull(this))
                    return false;
                let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                if (isPhone.test(this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsID", {
        enumerable: false,
        get: function () {
            return (): boolean => {
                if (IsNull(this))
                    return false;
                let isID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (isID.test(this.trim()))
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "IsNumber", {
        enumerable: false,
        get: function () {
            return (): boolean => {
                if (IsNull(this))
                    return false;
                return !isNaN(parseFloat(this));
            };
        }
    });
    //本函数只能解析 yyyy-MM-dd HH:mm:ss 格式
    Object.defineProperty(String.prototype, "ToDate", {
        enumerable: false,
        get: function () {
            return (): Date => {
                var regEx = new RegExp("\\-", "gi");
                let result = new Date();
                result.setTime(Date.parse(this.replace(regEx, "/")));
                return result;
            };
        }
    });
    Object.defineProperty(String.prototype, "StartWith", {
        enumerable: false,
        get: function () {
            return (str: string): boolean => {
                if (this.indexOf(str) == 0)
                    return true;
                else
                    return false;
            };
        }
    });
    Object.defineProperty(String.prototype, "EndWith", {
        enumerable: false,
        get: function () {
            return (str: string): boolean => {
                if (this.lastIndexOf(str) + str.length == this.length)
                    return true;
                else
                    return false;
            };
        }
    });

    Object.defineProperty(String.prototype, "Utf16to8", {
        enumerable: false,
        get: function () {
            return (): string => {
                let out, i, len, c;

                out = "";
                len = this.length;
                for (i = 0; i < len; i++) {
                    c = this.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += this.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    } else {
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
            return (): string => {
                let out, i, len, c;
                let char2, char3;

                out = "";
                len = this.length;
                i = 0;
                while (i < len) {
                    c = this.charCodeAt(i++);
                    switch (c >> 4) {
                        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                            // 0xxxxxxx
                            out += this.charAt(i - 1);
                            break;
                        case 12: case 13:
                            // 110x xxxx   10xx xxxx
                            char2 = this.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                            break;
                        case 14:
                            // 1110 xxxx  10xx xxxx  10xx xxxx
                            char2 = this.charCodeAt(i++);
                            char3 = this.charCodeAt(i++);
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
            return (): string => {
                let str = this.Utf16to8();
                let out, i, len;
                let c1, c2, c3;

                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += Base64EncodeChars.charAt(c1 >> 2);
                        out += Base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += Base64EncodeChars.charAt(c1 >> 2);
                        out += Base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += Base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += Base64EncodeChars.charAt(c1 >> 2);
                    out += Base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += Base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += Base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            };
        }
    });
    Object.defineProperty(String.prototype, "FromBase64String", {
        enumerable: false,
        get: function () {
            return (): string => {
                let c1, c2, c3, c4;
                let i, len, out;

                len = this.length;
                i = 0;
                out = "";
                while (i < len) {
                    /* c1 */
                    do {
                        c1 = Base64DecodeChars[this.charCodeAt(i++) & 0xff];
                    } while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;

                    /* c2 */
                    do {
                        c2 = Base64DecodeChars[this.charCodeAt(i++) & 0xff];
                    } while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;

                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                    /* c3 */
                    do {
                        c3 = this.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = Base64DecodeChars[c3];
                    } while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;

                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                    /* c4 */
                    do {
                        c4 = this.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = Base64DecodeChars[c4];
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
            return (): string => {
                return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + '年' +
                    f(this.getUTCMonth() + 1) + '月' +
                    f(this.getUTCDate()) + '日 ' +
                    f(this.getUTCHours()) + '时' +
                    f(this.getUTCMinutes()) + '分' +
                    f(this.getUTCSeconds()) + '秒'
                    : null;
            };
        }
    });

    Object.defineProperty(Date.prototype, "IsLeapYear", {
        enumerable: false,
        get: function () {
            return (year: number): boolean => {
                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
            };
        }
    });
    Object.defineProperty(Date.prototype, "GetDaysInMonth", {
        enumerable: false,
        get: function () {
            return (year: number, month: number): number => {
                return [31, (new Date().IsLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
            };
        }
    });
    Object.defineProperty(Date.prototype, "Format", {
        enumerable: false,
        get: function () {
            return (format: string): string => {
                var o = {
                    "M+": this.getMonth() + 1,  //month 
                    "d+": this.getDate(),     //day 
                    "h+": this.getHours(),    //hour 
                    "m+": this.getMinutes(),  //minute 
                    "s+": this.getSeconds(), //second 
                    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
                    "S": this.getMilliseconds() //millisecond 
                }
                var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                if (/(w+)/.test(format)) {
                    format = format.replace(RegExp.$1, week[this.getDay()]);
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
            return (d: number): Date => {
                var r = new Date(this.getTime());
                r.setDate(r.getDate() + d);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddWeeks", {
        enumerable: false,
        get: function () {
            return (w: number): Date => {
                return this.AddDays(w * 7);
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddMonths", {
        enumerable: false,
        get: function () {
            return (m: number): Date => {
                var r = new Date(this.getTime());
                var n = r.getDate();
                r.setDate(1);
                let _y = r.getFullYear();
                let _m = r.getMonth() + m;
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
                r.setDate(Math.min(n, (r as any).GetDaysInMonth(r.getFullYear(), r.getMonth() + 1)));
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddYears", {
        enumerable: false,
        get: function () {
            return (y: number): Date => {
                var r = new Date(this.getTime());
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
            return (h: number): Date => {
                var r = new Date(this.getTime());
                r.setHours(r.getHours() + h);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddMinute", {
        enumerable: false,
        get: function () {
            return (m: number): Date => {
                var r = new Date(this.getTime());
                r.setMinutes(r.getMinutes() + m);
                return r;
            };
        }
    });
    Object.defineProperty(Date.prototype, "AddSecond", {
        enumerable: false,
        get: function () {
            return (s: number): Date => {
                var r = new Date(this.getTime());
                r.setSeconds(r.getSeconds() + s);
                return r;
            };
        }
    });

    Object.defineProperty(Date.prototype, "DiffObject", {
        enumerable: false,
        get: function () {
            return (endTime: Date): {
                Hour: string,
                Minute: string,
                Second: string
            } => {
                let sTime = this;     //开始时间
                let eTime = endTime;  //结束时间
                let AllCount = eTime.getTime() - sTime.getTime();
                if (AllCount < 0)
                    return null;
                let h = parseInt(AllCount / (1000 * 3600) + "");
                let _h = "";
                if (h >= 10)
                    _h = h + "";
                else
                    _h = "0" + h;
                let ys = AllCount % (1000 * 3600);
                let m = parseInt(ys / (1000 * 60) + "");
                let _m = "";
                if (m >= 10)
                    _m = m + "";
                else
                    _m = "0" + m;
                ys = ys % (1000 * 60);
                let s = parseInt(ys / (1000) + "");
                let _s = "";
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
            return (endTime: Date): string => {
                let sTime = this;     //开始时间
                let eTime = endTime;  //结束时间
                let AllCount = eTime.getTime() - sTime.getTime();
                if (AllCount < 0)
                    return null;
                let h = parseInt(AllCount / (1000 * 3600) + "");
                let _h = "";
                if (h >= 10)
                    _h = h + "";
                else
                    _h = "0" + h;
                let ys = AllCount % (1000 * 3600);
                let m = parseInt(ys / (1000 * 60) + "");
                let _m = "";
                if (m >= 10)
                    _m = m + "";
                else
                    _m = "0" + m;
                ys = ys % (1000 * 60);
                let s = parseInt(ys / (1000) + "");
                let _s = "";
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
            return (item: any): boolean => {
                for (let i = this.length - 1; i >= 0; i--) {
                    if (this[i] == item) {
                        this.splice(i, 1);
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
            return (compareFunction: (item: any) => boolean): void => {
                if (IsNull(this) || this.length == 0)
                    return;
                else {
                    for (let i = this.length - 1; i >= 0; i--) {
                        if (compareFunction(this[i])) {
                            this.splice(i, 1);
                        }
                    }
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Copy", {
        enumerable: false,
        get: function () {
            return (): Array<any> => {
                let result: Array<any> = new Array<any>();
                if (IsNull(this) || this.length == 0)
                    return result;
                else {
                    for (let i = 0; i < this.length; i++) {
                        result.push(this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Clear", {
        enumerable: false,
        get: function () {
            return (): void => {
                this.splice(0, this.length);
            };
        }
    });
    Object.defineProperty(Array.prototype, "Clone", {
        enumerable: false,
        get: function () {
            return (): Array<any> => {
                return this.CloneObject();
            };
        }
    });
    Object.defineProperty(Array.prototype, "Contains", {
        enumerable: false,
        get: function () {
            return (item: any): boolean => {
                for (let i = this.length - 1; i >= 0; i--) {
                    if (this[i] == item)
                        return true;
                }
                return false;
            };
        }
    });
    Object.defineProperty(Array.prototype, "IndexOfX", {
        enumerable: false,
        get: function () {
            return (compareFunction: (item: any) => boolean): number => {
                if (IsNull(this) || this.length == 0)
                    return -1;
                else {
                    for (let i = 0; i < this.length; i++) {
                        if (compareFunction(this[i]))
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
            return (compareFunction: (item: any) => boolean): number => {
                if (IsNull(this) || this.length == 0)
                    return -1;
                else {
                    let num = -1;
                    for (let i = 0; i < this.length; i++) {
                        if (compareFunction(this[i]))
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
            return (compareFunction: (item: any) => boolean): number => {
                if (IsNull(this) || this.length == 0)
                    return null;
                else {
                    let num = -1;
                    for (let i = 0; i < this.length; i++) {
                        if (compareFunction(this[i]))
                            num = i;
                    }
                    if (num == -1)
                        return null;
                    else
                        return this[num];
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Default", {
        enumerable: false,
        get: function () {
            return (compareFunction: (item: any) => boolean): any => {
                if (IsNull(this) || this.length == 0)
                    return null;
                else {
                    for (let i = 0; i < this.length; i++) {
                        if (compareFunction(this[i]))
                            return this[i];
                    }
                    return null;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Where", {
        enumerable: false,
        get: function () {
            return (compareFunction: (item: any) => boolean): Array<any> => {
                let result: Array<any> = new Array<any>();
                if (IsNull(this) || this.length == 0)
                    return result;
                else {
                    for (let i = 0; i < this.length; i++) {
                        if (compareFunction(this[i]))
                            result.push(this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "ForEach", {
        enumerable: false,
        get: function () {
            return (func: (item: any, index: number) => boolean): void => {
                for (let i = 0; i < this.length; i++) {
                    if (func(this[i], i))
                        break;
                }
            };
        }
    });

    Object.defineProperty(Array.prototype, "Replace", {
        enumerable: false,
        get: function () {
            return (oldItem: any, newItem: any): boolean => {
                if (IsNull(this) || this.length == 0)
                    return false;
                else {
                    for (let i = 0; i < this.length; i++) {
                        if (this[i] == oldItem) {
                            this.splice(i, 1, newItem);
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
            return (indexs: Array<number>): Array<any> => {
                let result: Array<any> = new Array<any>();
                if (IsNull(this) || this.length == 0)
                    return result;
                else {
                    for (let i = 0; i < this.length; i++) {
                        if (indexs.Contains(i))
                            result.push(this[i]);
                    }
                    return result;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Max", {
        enumerable: false,
        get: function () {
            return (compareFunction: (item: any) => number): any => {
                let result: any = null;
                if (IsNull(this) || this.length == 0)
                    return result;
                else {
                    let n = undefined;
                    for (let i = 0; i < this.length; i++) {
                        let _n = compareFunction(this[i]);
                        if (n == undefined) {
                            n = _n;
                            result = this[i];
                        }
                        else {
                            if (n < _n) {
                                n = _n;
                                result = this[i];
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
            return (compareFunction: (item: any) => number): any => {
                let result: any = null;
                if (IsNull(this) || this.length == 0)
                    return result;
                else {
                    let n = undefined;
                    for (let i = 0; i < this.length; i++) {
                        let _n = compareFunction(this[i]);
                        if (n == undefined) {
                            n = _n;
                            result = this[i];
                        }
                        else {
                            if (n > _n) {
                                n = _n;
                                result = this[i];
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
            return (): void => {
                let currentIndex = this.length
                    , temporaryValue
                    , randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = this[currentIndex];
                    this[currentIndex] = this[randomIndex];
                    this[randomIndex] = temporaryValue;
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, "Fast_Shuffle", {
        enumerable: false,
        get: function () {
            return (): void => {
                let a, b, c, d;
                a = this;
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

    // Object.defineProperty(Window.prototype, "GetQueryString", {
    //     enumerable: false,
    //     get: function () {
    //         return (name: string): string => {
    //             let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //             let r = window.location.search.substr(1).match(reg);
    //             if (r != null)
    //                 return encodeURIComponent(r[2]);
    //             return "";
    //         };
    //     }
    // });

}
Hook();


