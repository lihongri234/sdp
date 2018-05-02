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
var Guid = (function () {
    function Guid() {
    }
    Guid.NewGuid = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    };
    return Guid;
}());
exports.Guid = Guid;
var Thread = (function () {
    function Thread() {
    }
    Thread.Sleep = function (timeout) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    };
    return Thread;
}());
exports.Thread = Thread;
var OObject = (function () {
    function OObject() {
    }
    OObject.prototype.Clone = function () {
        return this.CloneObject();
    };
    return OObject;
}());
exports.OObject = OObject;
var EventArgs = (function (_super) {
    __extends(EventArgs, _super);
    function EventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventArgs.Empty = new EventArgs();
    return EventArgs;
}(OObject));
exports.EventArgs = EventArgs;
var TYEventArgsGeneric = (function (_super) {
    __extends(TYEventArgsGeneric, _super);
    function TYEventArgsGeneric(value) {
        var _this = _super.call(this) || this;
        _this.m_Value = value;
        return _this;
    }
    Object.defineProperty(TYEventArgsGeneric.prototype, "Value", {
        get: function () {
            return this.m_Value;
        },
        enumerable: true,
        configurable: true
    });
    return TYEventArgsGeneric;
}(EventArgs));
exports.TYEventArgsGeneric = TYEventArgsGeneric;
var TYEventArgsGeneric2 = (function (_super) {
    __extends(TYEventArgsGeneric2, _super);
    function TYEventArgsGeneric2(value1, value2) {
        var _this = _super.call(this) || this;
        _this.m_Value1 = value1;
        _this.m_Value2 = value2;
        return _this;
    }
    Object.defineProperty(TYEventArgsGeneric2.prototype, "Value1", {
        get: function () {
            return this.m_Value1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYEventArgsGeneric2.prototype, "Value2", {
        get: function () {
            return this.m_Value2;
        },
        enumerable: true,
        configurable: true
    });
    return TYEventArgsGeneric2;
}(EventArgs));
exports.TYEventArgsGeneric2 = TYEventArgsGeneric2;
var TYEventArgsGeneric3 = (function (_super) {
    __extends(TYEventArgsGeneric3, _super);
    function TYEventArgsGeneric3(value1, value2, value3) {
        var _this = _super.call(this) || this;
        _this.m_Value1 = value1;
        _this.m_Value2 = value2;
        _this.m_Value3 = value3;
        return _this;
    }
    Object.defineProperty(TYEventArgsGeneric3.prototype, "Value1", {
        get: function () {
            return this.m_Value1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYEventArgsGeneric3.prototype, "Value2", {
        get: function () {
            return this.m_Value2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYEventArgsGeneric3.prototype, "Value3", {
        get: function () {
            return this.m_Value3;
        },
        enumerable: true,
        configurable: true
    });
    return TYEventArgsGeneric3;
}(EventArgs));
exports.TYEventArgsGeneric3 = TYEventArgsGeneric3;
var TYDataChangedEventArgs = (function (_super) {
    __extends(TYDataChangedEventArgs, _super);
    function TYDataChangedEventArgs(oldValue, newValue) {
        var _this = _super.call(this) || this;
        _this.Cancel = false;
        _this.m_OldValue = oldValue;
        _this.m_NewValue = newValue;
        return _this;
    }
    Object.defineProperty(TYDataChangedEventArgs.prototype, "OldValue", {
        get: function () {
            return this.m_OldValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDataChangedEventArgs.prototype, "NewValue", {
        get: function () {
            return this.m_NewValue;
        },
        enumerable: true,
        configurable: true
    });
    return TYDataChangedEventArgs;
}(EventArgs));
exports.TYDataChangedEventArgs = TYDataChangedEventArgs;
var EventHandler = (function (_super) {
    __extends(EventHandler, _super);
    function EventHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_FuncList = new Array();
        return _this;
    }
    Object.defineProperty(EventHandler.prototype, "HaveEvent", {
        get: function () {
            if (this.m_FuncList.length === 0)
                return false;
            else
                return true;
        },
        enumerable: true,
        configurable: true
    });
    EventHandler.prototype.AddEventListener = function (fn) {
        if (typeof (fn) === "function") {
            if (this.m_FuncList.indexOf(fn) === -1)
                this.m_FuncList.push(fn);
        }
    };
    EventHandler.prototype.RemoveEventListener = function (fn) {
        if (typeof (fn) === "function") {
            var index = this.m_FuncList.indexOf(fn);
            if (index !== -1)
                this.m_FuncList.splice(index, 1);
        }
    };
    EventHandler.prototype.Clear = function () {
        this.m_FuncList.splice(0, this.m_FuncList.length);
    };
    EventHandler.prototype.FireEvent = function (sender, eventArgs) {
        var funcs = this.m_FuncList.Copy();
        for (var i = 0; i < funcs.length; i++) {
            var fn = funcs[i];
            fn(sender, eventArgs);
        }
    };
    return EventHandler;
}(OObject));
exports.EventHandler = EventHandler;
var EventHandlerGeneric = (function (_super) {
    __extends(EventHandlerGeneric, _super);
    function EventHandlerGeneric() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_FuncList = new Array();
        return _this;
    }
    Object.defineProperty(EventHandlerGeneric.prototype, "HaveEvent", {
        get: function () {
            if (this.m_FuncList.length === 0)
                return false;
            else
                return true;
        },
        enumerable: true,
        configurable: true
    });
    EventHandlerGeneric.prototype.AddEventListener = function (fn) {
        if (typeof (fn) === "function") {
            if (this.m_FuncList.indexOf(fn) === -1)
                this.m_FuncList.push(fn);
        }
    };
    EventHandlerGeneric.prototype.RemoveEventListener = function (fn) {
        if (typeof (fn) === "function") {
            var index = this.m_FuncList.indexOf(fn);
            if (index !== -1)
                this.m_FuncList.splice(index, 1);
        }
    };
    EventHandlerGeneric.prototype.Clear = function () {
        this.m_FuncList.splice(0, this.m_FuncList.length);
    };
    EventHandlerGeneric.prototype.FireEvent = function (sender, eventArgs) {
        for (var i = 0; i < this.m_FuncList.length; i++) {
            var fn = this.m_FuncList[i];
            fn(sender, eventArgs);
        }
    };
    return EventHandlerGeneric;
}(OObject));
exports.EventHandlerGeneric = EventHandlerGeneric;
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(message, code, innerException) {
        if (code === void 0) { code = null; }
        if (innerException === void 0) { innerException = null; }
        var _this = _super.call(this) || this;
        _this.m_Code = "";
        _this.m_Message = "";
        _this.m_InnerException = null;
        if (innerException == null) {
            _this.m_Code = code;
            _this.m_Message = message;
            _this.m_InnerException = null;
        }
        else {
            if (message == null)
                _this.m_Message = innerException.Message;
            else
                _this.m_Message = message;
            if (code == null)
                _this.m_Code = innerException.Code;
            else
                _this.m_Code = code;
            _this.m_InnerException = innerException;
        }
        return _this;
    }
    Object.defineProperty(Exception.prototype, "Code", {
        get: function () {
            return this.m_Code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "Message", {
        get: function () {
            return this.m_Message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "InnerException", {
        get: function () {
            return this.m_InnerException;
        },
        enumerable: true,
        configurable: true
    });
    return Exception;
}(OObject));
exports.Exception = Exception;
var UnHandlerExceptionEventArgs = (function (_super) {
    __extends(UnHandlerExceptionEventArgs, _super);
    function UnHandlerExceptionEventArgs(error) {
        var _this = _super.call(this) || this;
        _this.m_Error = null;
        _this.m_Error = error;
        return _this;
    }
    Object.defineProperty(UnHandlerExceptionEventArgs.prototype, "Error", {
        get: function () {
            return this.m_Error;
        },
        enumerable: true,
        configurable: true
    });
    return UnHandlerExceptionEventArgs;
}(EventArgs));
exports.UnHandlerExceptionEventArgs = UnHandlerExceptionEventArgs;
var Nullable = (function (_super) {
    __extends(Nullable, _super);
    function Nullable(value) {
        var _this = _super.call(this) || this;
        _this.Value = value;
        return _this;
    }
    Object.defineProperty(Nullable.prototype, "HasValue", {
        get: function () {
            if (this.Value == null && this.Value === undefined)
                return false;
            else
                return true;
        },
        enumerable: true,
        configurable: true
    });
    return Nullable;
}(OObject));
exports.Nullable = Nullable;
var TimeSpan = (function (_super) {
    __extends(TimeSpan, _super);
    function TimeSpan(days, hours, minutes, seconds, milliseconds) {
        if (days === void 0) { days = 0; }
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        var _this = _super.call(this) || this;
        seconds += parseInt(milliseconds / 1000 + "");
        milliseconds = milliseconds % 1000;
        minutes += parseInt(seconds / 60 + "");
        seconds = seconds % 60;
        hours += parseInt(minutes / 60 + "");
        minutes = minutes % 60;
        days += parseInt(hours / 24 + "");
        hours = hours % 24;
        _this.m_Days = days;
        _this.m_Hours = hours;
        _this.m_Minutes = minutes;
        _this.m_Seconds = seconds;
        _this.m_Milliseconds = milliseconds;
        return _this;
    }
    Object.defineProperty(TimeSpan.prototype, "Days", {
        get: function () {
            return this.m_Days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Hours", {
        get: function () {
            return this.m_Hours;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Minutes", {
        get: function () {
            return this.m_Minutes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Seconds", {
        get: function () {
            return this.m_Seconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
        get: function () {
            return this.m_Milliseconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalDays", {
        get: function () {
            return this.TotalHours / 24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalHours", {
        get: function () {
            return this.TotalMinutes / 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMinutes", {
        get: function () {
            return this.TotalSeconds / 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalSeconds", {
        get: function () {
            return this.TotalMilliseconds / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMilliseconds", {
        get: function () {
            return (((this.Days * 24 + this.Hours) * 60 + this.Minutes) * 60 + this.Seconds) * 1000 + this.Milliseconds;
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan.Subtract = function (d1, d2) {
        return new TimeSpan(0, 0, 0, 0, d2 - d1);
    };
    return TimeSpan;
}(OObject));
exports.TimeSpan = TimeSpan;
var Hashids = (function (_super) {
    __extends(Hashids, _super);
    function Hashids(salt, minLength, alphabet) {
        if (salt === void 0) { salt = ""; }
        if (minLength === void 0) { minLength = 0; }
        if (alphabet === void 0) { alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; }
        var _this = _super.call(this) || this;
        _this.m_seps = 'cfhistuCFHISTU';
        _this.m_salt = "";
        _this.m_minLength = 0;
        _this.m_alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        _this.m_guards = "";
        _this.m_salt = salt;
        _this.m_minLength = minLength;
        _this.m_alphabet = alphabet;
        var minAlphabetLength = 16;
        var sepDiv = 3.5;
        var guardDiv = 12;
        var errorAlphabetLength = 'error: alphabet must contain at least X unique characters';
        var errorAlphabetSpace = 'error: alphabet cannot contain spaces';
        var uniqueAlphabet = '', sepsLength = void 0, diff = void 0;
        for (var i = 0; i !== _this.m_alphabet.length; i++) {
            if (uniqueAlphabet.indexOf(_this.m_alphabet.charAt(i)) === -1) {
                uniqueAlphabet += _this.m_alphabet.charAt(i);
            }
        }
        _this.m_alphabet = uniqueAlphabet;
        if (_this.m_alphabet.length < minAlphabetLength) {
            throw errorAlphabetLength.replace("X", minAlphabetLength + "");
        }
        if (_this.m_alphabet.search(' ') !== -1) {
            throw errorAlphabetSpace;
        }
        for (var _i = 0; _i !== _this.m_seps.length; _i++) {
            var j = _this.m_alphabet.indexOf(_this.m_seps.charAt(_i));
            if (j === -1)
                _this.m_seps = _this.m_seps.substr(0, _i) + ' ' + _this.m_seps.substr(_i + 1);
            else
                _this.m_alphabet = _this.m_alphabet.substr(0, j) + ' ' + _this.m_alphabet.substr(j + 1);
        }
        _this.m_alphabet = _this.m_alphabet.replace(/ /g, '');
        _this.m_seps = _this.m_seps.replace(/ /g, '');
        _this.m_seps = _this._shuffle(_this.m_seps, _this.m_salt);
        if (!_this.m_seps.length || _this.m_alphabet.length / _this.m_seps.length > sepDiv) {
            sepsLength = Math.ceil(_this.m_alphabet.length / sepDiv);
            if (sepsLength > _this.m_seps.length) {
                diff = sepsLength - _this.m_seps.length;
                _this.m_seps += _this.m_alphabet.substr(0, diff);
                _this.m_alphabet = _this.m_alphabet.substr(diff);
            }
        }
        _this.m_alphabet = _this._shuffle(_this.m_alphabet, _this.m_salt);
        var guardCount = Math.ceil(_this.m_alphabet.length / guardDiv);
        if (_this.m_alphabet.length < 3) {
            _this.m_guards = _this.m_seps.substr(0, guardCount);
            _this.m_seps = _this.m_seps.substr(guardCount);
        }
        else {
            _this.m_guards = _this.m_alphabet.substr(0, guardCount);
            _this.m_alphabet = _this.m_alphabet.substr(guardCount);
        }
        return _this;
    }
    Hashids.prototype._escapeRegExp = function (s) {
        return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    ;
    Hashids.prototype._parseInt = function (v, radix) {
        return (/^(\-|\+)?([0-9]+|Infinity)$/.test(v) ? parseInt(v, radix) : NaN);
    };
    ;
    Hashids.prototype._encode = function (numbers) {
        var ret = void 0, alphabet = this.m_alphabet, numbersIdInt = 0;
        for (var i = 0; i !== numbers.length; i++) {
            numbersIdInt += numbers[i] % (i + 100);
        }
        ret = alphabet.charAt(numbersIdInt % alphabet.length);
        var lottery = ret;
        for (var _i2 = 0; _i2 !== numbers.length; _i2++) {
            var number = numbers[_i2];
            var buffer = lottery + this.m_salt + alphabet;
            alphabet = this._shuffle(alphabet, buffer.substr(0, alphabet.length));
            var last = this._toAlphabet(number, alphabet);
            ret += last;
            if (_i2 + 1 < numbers.length) {
                number %= last.charCodeAt(0) + _i2;
                var sepsIndex = number % this.m_seps.length;
                ret += this.m_seps.charAt(sepsIndex);
            }
        }
        if (ret.length < this.m_minLength) {
            var guardIndex = (numbersIdInt + ret[0].charCodeAt(0)) % this.m_guards.length;
            var guard = this.m_guards[guardIndex];
            ret = guard + ret;
            if (ret.length < this.m_minLength) {
                guardIndex = (numbersIdInt + ret[2].charCodeAt(0)) % this.m_guards.length;
                guard = this.m_guards[guardIndex];
                ret += guard;
            }
        }
        var halfLength = parseInt(alphabet.length / 2 + "", 10);
        while (ret.length < this.m_minLength) {
            alphabet = this._shuffle(alphabet, alphabet);
            ret = alphabet.substr(halfLength) + ret + alphabet.substr(0, halfLength);
            var excess = ret.length - this.m_minLength;
            if (excess > 0) {
                ret = ret.substr(excess / 2, this.m_minLength);
            }
        }
        return ret;
    };
    Hashids.prototype._decode = function (id, alphabet) {
        var ret = [], i = 0, r = new RegExp('[' + this._escapeRegExp(this.m_guards) + ']', 'g'), idBreakdown = id.replace(r, ' '), idArray = idBreakdown.split(' ');
        if (idArray.length === 3 || idArray.length === 2) {
            i = 1;
        }
        idBreakdown = idArray[i];
        if (typeof idBreakdown[0] !== 'undefined') {
            var lottery = idBreakdown[0];
            idBreakdown = idBreakdown.substr(1);
            r = new RegExp('[' + this._escapeRegExp(this.m_seps) + ']', 'g');
            idBreakdown = idBreakdown.replace(r, ' ');
            idArray = idBreakdown.split(' ');
            for (var j = 0; j !== idArray.length; j++) {
                var subId = idArray[j];
                var buffer = lottery + this.m_salt + alphabet;
                alphabet = this._shuffle(alphabet, buffer.substr(0, alphabet.length));
                ret.push(this._fromAlphabet(subId, alphabet));
            }
            if (this._encode(ret) !== id) {
                ret = [];
            }
        }
        return ret;
    };
    Hashids.prototype._shuffle = function (alphabet, salt) {
        var integer = void 0;
        if (!salt.length) {
            return alphabet;
        }
        for (var i = alphabet.length - 1, v = 0, p = 0, j = 0; i > 0; i--, v++) {
            v %= salt.length;
            p += integer = salt.charAt(v).charCodeAt(0);
            j = (integer + v + p) % i;
            var tmp = alphabet[j];
            alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
            alphabet = alphabet.substr(0, i) + tmp + alphabet.substr(i + 1);
        }
        return alphabet;
    };
    Hashids.prototype._toAlphabet = function (input, alphabet) {
        var id = '';
        do {
            id = alphabet.charAt(input % alphabet.length) + id;
            input = parseInt(input / alphabet.length + "", 10);
        } while (input);
        return id;
    };
    Hashids.prototype._fromAlphabet = function (input, alphabet) {
        var number = 0;
        for (var i = 0; i < input.length; i++) {
            var pos = alphabet.indexOf(input[i]);
            number += pos * Math.pow(alphabet.length, input.length - i - 1);
        }
        return number;
    };
    Hashids.prototype.Encode = function (number) {
        return this._encode([number]);
    };
    Hashids.prototype.Decode = function (id) {
        var ret;
        if (!id || !id.length || typeof id !== 'string') {
            return ret;
        }
        return this._decode(id, this.m_alphabet)[0];
    };
    return Hashids;
}(OObject));
exports.Hashids = Hashids;
var MD5 = (function (_super) {
    __extends(MD5, _super);
    function MD5(data) {
        var _this = _super.call(this) || this;
        var databytes = null;
        var type_mismatch = null;
        if (typeof data == 'string') {
            databytes = _this.str_to_bytes(data);
        }
        else if (data.constructor == Array) {
            if (data.length === 0) {
                databytes = _this.cloneArray(data);
            }
            else if (typeof data[0] == 'string') {
                databytes = _this.chars_to_bytes(data);
            }
            else if (typeof data[0] == 'number') {
                databytes = _this.cloneArray(data);
            }
            else {
                type_mismatch = typeof data[0];
            }
        }
        else if (typeof ArrayBuffer != 'undefined') {
            if (data instanceof ArrayBuffer) {
                databytes = _this.typed_to_plain(new Uint8Array(data));
            }
            else if ((data instanceof Uint8Array) || (data instanceof Int8Array)) {
                databytes = _this.typed_to_plain(data);
            }
            else if ((data instanceof Uint32Array) || (data instanceof Int32Array) ||
                (data instanceof Uint16Array) || (data instanceof Int16Array) ||
                (data instanceof Float32Array) || (data instanceof Float64Array)) {
                databytes = _this.typed_to_plain(new Uint8Array(data.buffer));
            }
            else {
                type_mismatch = typeof data;
            }
        }
        else {
            type_mismatch = typeof data;
        }
        if (type_mismatch) {
            throw ('MD5 type mismatch, cannot process ' + type_mismatch);
        }
        function do_digest() {
            function updateRun(nf, sin32, dw32, b32) {
                var temp = d;
                d = c;
                c = b;
                b = this._add(b, this.rol(this._add(a, this._add(nf, this._add(sin32, dw32))), b32));
                a = temp;
            }
            var org_len = databytes.length;
            databytes.push(0x80);
            var tail = databytes.length % 64;
            if (tail > 56) {
                for (var i = 0; i < (64 - tail); i++) {
                    databytes.push(0x0);
                }
                tail = databytes.length % 64;
            }
            for (i = 0; i < (56 - tail); i++) {
                databytes.push(0x0);
            }
            databytes = databytes.concat(this.int64_to_bytes(org_len * 8));
            var h0 = 0x67452301;
            var h1 = 0xEFCDAB89;
            var h2 = 0x98BADCFE;
            var h3 = 0x10325476;
            var a = 0, b = 0, c = 0, d = 0;
            for (i = 0; i < databytes.length / 64; i++) {
                a = h0;
                b = h1;
                c = h2;
                d = h3;
                var ptr = i * 64;
                updateRun(this.fF(b, c, d), 0xd76aa478, this.bytes_to_int32(databytes, ptr), 7);
                updateRun(this.fF(b, c, d), 0xe8c7b756, this.bytes_to_int32(databytes, ptr + 4), 12);
                updateRun(this.fF(b, c, d), 0x242070db, this.bytes_to_int32(databytes, ptr + 8), 17);
                updateRun(this.fF(b, c, d), 0xc1bdceee, this.bytes_to_int32(databytes, ptr + 12), 22);
                updateRun(this.fF(b, c, d), 0xf57c0faf, this.bytes_to_int32(databytes, ptr + 16), 7);
                updateRun(this.fF(b, c, d), 0x4787c62a, this.bytes_to_int32(databytes, ptr + 20), 12);
                updateRun(this.fF(b, c, d), 0xa8304613, this.bytes_to_int32(databytes, ptr + 24), 17);
                updateRun(this.fF(b, c, d), 0xfd469501, this.bytes_to_int32(databytes, ptr + 28), 22);
                updateRun(this.fF(b, c, d), 0x698098d8, this.bytes_to_int32(databytes, ptr + 32), 7);
                updateRun(this.fF(b, c, d), 0x8b44f7af, this.bytes_to_int32(databytes, ptr + 36), 12);
                updateRun(this.fF(b, c, d), 0xffff5bb1, this.bytes_to_int32(databytes, ptr + 40), 17);
                updateRun(this.fF(b, c, d), 0x895cd7be, this.bytes_to_int32(databytes, ptr + 44), 22);
                updateRun(this.fF(b, c, d), 0x6b901122, this.bytes_to_int32(databytes, ptr + 48), 7);
                updateRun(this.fF(b, c, d), 0xfd987193, this.bytes_to_int32(databytes, ptr + 52), 12);
                updateRun(this.fF(b, c, d), 0xa679438e, this.bytes_to_int32(databytes, ptr + 56), 17);
                updateRun(this.fF(b, c, d), 0x49b40821, this.bytes_to_int32(databytes, ptr + 60), 22);
                updateRun(this.fG(b, c, d), 0xf61e2562, this.bytes_to_int32(databytes, ptr + 4), 5);
                updateRun(this.fG(b, c, d), 0xc040b340, this.bytes_to_int32(databytes, ptr + 24), 9);
                updateRun(this.fG(b, c, d), 0x265e5a51, this.bytes_to_int32(databytes, ptr + 44), 14);
                updateRun(this.fG(b, c, d), 0xe9b6c7aa, this.bytes_to_int32(databytes, ptr), 20);
                updateRun(this.fG(b, c, d), 0xd62f105d, this.bytes_to_int32(databytes, ptr + 20), 5);
                updateRun(this.fG(b, c, d), 0x2441453, this.bytes_to_int32(databytes, ptr + 40), 9);
                updateRun(this.fG(b, c, d), 0xd8a1e681, this.bytes_to_int32(databytes, ptr + 60), 14);
                updateRun(this.fG(b, c, d), 0xe7d3fbc8, this.bytes_to_int32(databytes, ptr + 16), 20);
                updateRun(this.fG(b, c, d), 0x21e1cde6, this.bytes_to_int32(databytes, ptr + 36), 5);
                updateRun(this.fG(b, c, d), 0xc33707d6, this.bytes_to_int32(databytes, ptr + 56), 9);
                updateRun(this.fG(b, c, d), 0xf4d50d87, this.bytes_to_int32(databytes, ptr + 12), 14);
                updateRun(this.fG(b, c, d), 0x455a14ed, this.bytes_to_int32(databytes, ptr + 32), 20);
                updateRun(this.fG(b, c, d), 0xa9e3e905, this.bytes_to_int32(databytes, ptr + 52), 5);
                updateRun(this.fG(b, c, d), 0xfcefa3f8, this.bytes_to_int32(databytes, ptr + 8), 9);
                updateRun(this.fG(b, c, d), 0x676f02d9, this.bytes_to_int32(databytes, ptr + 28), 14);
                updateRun(this.fG(b, c, d), 0x8d2a4c8a, this.bytes_to_int32(databytes, ptr + 48), 20);
                updateRun(this.fH(b, c, d), 0xfffa3942, this.bytes_to_int32(databytes, ptr + 20), 4);
                updateRun(this.fH(b, c, d), 0x8771f681, this.bytes_to_int32(databytes, ptr + 32), 11);
                updateRun(this.fH(b, c, d), 0x6d9d6122, this.bytes_to_int32(databytes, ptr + 44), 16);
                updateRun(this.fH(b, c, d), 0xfde5380c, this.bytes_to_int32(databytes, ptr + 56), 23);
                updateRun(this.fH(b, c, d), 0xa4beea44, this.bytes_to_int32(databytes, ptr + 4), 4);
                updateRun(this.fH(b, c, d), 0x4bdecfa9, this.bytes_to_int32(databytes, ptr + 16), 11);
                updateRun(this.fH(b, c, d), 0xf6bb4b60, this.bytes_to_int32(databytes, ptr + 28), 16);
                updateRun(this.fH(b, c, d), 0xbebfbc70, this.bytes_to_int32(databytes, ptr + 40), 23);
                updateRun(this.fH(b, c, d), 0x289b7ec6, this.bytes_to_int32(databytes, ptr + 52), 4);
                updateRun(this.fH(b, c, d), 0xeaa127fa, this.bytes_to_int32(databytes, ptr), 11);
                updateRun(this.fH(b, c, d), 0xd4ef3085, this.bytes_to_int32(databytes, ptr + 12), 16);
                updateRun(this.fH(b, c, d), 0x4881d05, this.bytes_to_int32(databytes, ptr + 24), 23);
                updateRun(this.fH(b, c, d), 0xd9d4d039, this.bytes_to_int32(databytes, ptr + 36), 4);
                updateRun(this.fH(b, c, d), 0xe6db99e5, this.bytes_to_int32(databytes, ptr + 48), 11);
                updateRun(this.fH(b, c, d), 0x1fa27cf8, this.bytes_to_int32(databytes, ptr + 60), 16);
                updateRun(this.fH(b, c, d), 0xc4ac5665, this.bytes_to_int32(databytes, ptr + 8), 23);
                updateRun(this.fI(b, c, d), 0xf4292244, this.bytes_to_int32(databytes, ptr), 6);
                updateRun(this.fI(b, c, d), 0x432aff97, this.bytes_to_int32(databytes, ptr + 28), 10);
                updateRun(this.fI(b, c, d), 0xab9423a7, this.bytes_to_int32(databytes, ptr + 56), 15);
                updateRun(this.fI(b, c, d), 0xfc93a039, this.bytes_to_int32(databytes, ptr + 20), 21);
                updateRun(this.fI(b, c, d), 0x655b59c3, this.bytes_to_int32(databytes, ptr + 48), 6);
                updateRun(this.fI(b, c, d), 0x8f0ccc92, this.bytes_to_int32(databytes, ptr + 12), 10);
                updateRun(this.fI(b, c, d), 0xffeff47d, this.bytes_to_int32(databytes, ptr + 40), 15);
                updateRun(this.fI(b, c, d), 0x85845dd1, this.bytes_to_int32(databytes, ptr + 4), 21);
                updateRun(this.fI(b, c, d), 0x6fa87e4f, this.bytes_to_int32(databytes, ptr + 32), 6);
                updateRun(this.fI(b, c, d), 0xfe2ce6e0, this.bytes_to_int32(databytes, ptr + 60), 10);
                updateRun(this.fI(b, c, d), 0xa3014314, this.bytes_to_int32(databytes, ptr + 24), 15);
                updateRun(this.fI(b, c, d), 0x4e0811a1, this.bytes_to_int32(databytes, ptr + 52), 21);
                updateRun(this.fI(b, c, d), 0xf7537e82, this.bytes_to_int32(databytes, ptr + 16), 6);
                updateRun(this.fI(b, c, d), 0xbd3af235, this.bytes_to_int32(databytes, ptr + 44), 10);
                updateRun(this.fI(b, c, d), 0x2ad7d2bb, this.bytes_to_int32(databytes, ptr + 8), 15);
                updateRun(this.fI(b, c, d), 0xeb86d391, this.bytes_to_int32(databytes, ptr + 36), 21);
                h0 = this._add(h0, a);
                h1 = this._add(h1, b);
                h2 = this._add(h2, c);
                h3 = this._add(h3, d);
            }
            return this.int128le_to_hex(h3, h2, h1, h0);
        }
        return do_digest();
    }
    MD5.prototype.to_zerofilled_hex = function (n) {
        var t1 = (n >>> 0).toString(16);
        return "00000000".substr(0, 8 - t1.length) + t1;
    };
    MD5.prototype.chars_to_bytes = function (ac) {
        var retval = [];
        for (var i = 0; i < ac.length; i++) {
            retval = retval.concat(this.str_to_bytes(ac[i]));
        }
        return retval;
    };
    MD5.prototype.int64_to_bytes = function (num) {
        var retval = [];
        for (var i = 0; i < 8; i++) {
            retval.push(num & 0xFF);
            num = num >>> 8;
        }
        return retval;
    };
    MD5.prototype.rol = function (num, places) {
        return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
    };
    MD5.prototype.fF = function (b, c, d) {
        return (b & c) | (~b & d);
    };
    MD5.prototype.fG = function (b, c, d) {
        return (d & b) | (~d & c);
    };
    MD5.prototype.fH = function (b, c, d) {
        return b ^ c ^ d;
    };
    MD5.prototype.fI = function (b, c, d) {
        return c ^ (b | ~d);
    };
    MD5.prototype.bytes_to_int32 = function (arr, off) {
        return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
    };
    MD5.prototype.str_to_bytes = function (str) {
        var retval = [];
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) <= 0x7F) {
                retval.push(str.charCodeAt(i));
            }
            else {
                var tmp = encodeURIComponent(str.charAt(i)).substr(1).split('%');
                for (var j = 0; j < tmp.length; j++) {
                    retval.push(parseInt(tmp[j], 0x10));
                }
            }
        return retval;
    };
    MD5.prototype.int128le_to_hex = function (a, b, c, d) {
        var ra = "";
        var t = 0;
        var ta = 0;
        for (var i = 3; i >= 0; i--) {
            ta = arguments[i];
            t = (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | ta;
            ra = ra + this.to_zerofilled_hex(t);
        }
        return ra;
    };
    MD5.prototype.typed_to_plain = function (tarr) {
        var retval = new Array(tarr.length);
        for (var i = 0; i < tarr.length; i++) {
            retval[i] = tarr[i];
        }
        return retval;
    };
    MD5.prototype.cloneArray = function (inpArr) {
        return inpArr.slice();
    };
    MD5.prototype._add = function (n1, n2) {
        return 0x0FFFFFFFF & (n1 + n2);
    };
    return MD5;
}(OObject));
exports.MD5 = MD5;
var Hashs = (function () {
    function Hashs() {
    }
    Hashs.RSHash = function (str) {
        var b = 378551;
        var a = 63689;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = hash * a + str.charAt(i).charCodeAt(0);
            a = a * b;
        }
        return hash;
    };
    Hashs.JSHash = function (str) {
        var hash = 1315423911;
        for (var i = 0; i < str.length; i++)
            hash ^= ((hash << 5) + str.charAt(i).charCodeAt(0) + (hash >> 2));
        return hash;
    };
    Hashs.PJWHash = function (str) {
        var BitsInUnsignedInt = 4 * 8;
        var ThreeQuarters = (BitsInUnsignedInt * 3) / 4;
        var OneEighth = BitsInUnsignedInt / 8;
        var HighBits = (0xFFFFFFFF) << (BitsInUnsignedInt - OneEighth);
        var hash = 0;
        var test = 0;
        for (var i = 0; i < str.length; i++) {
            hash = (hash << OneEighth) + str.charAt(i).charCodeAt(0);
            if ((test = hash & HighBits) != 0)
                hash = ((hash ^ (test >> ThreeQuarters)) & (~HighBits));
        }
        return hash;
    };
    Hashs.ELFHash = function (str) {
        var hash = 0;
        var x = 0;
        for (var i = 0; i < str.length; i++) {
            hash = (hash << 4) + str.charAt(i).charCodeAt(0);
            x = hash & 0xF0000000;
            if (x != 0)
                hash ^= (x >> 24);
            hash &= ~x;
        }
        return hash;
    };
    Hashs.BKDRHash = function (str) {
        var seed = 131;
        var hash = 0;
        for (var i = 0; i < str.length; i++)
            hash = (hash * seed) + str.charAt(i).charCodeAt(0);
        return hash;
    };
    Hashs.SDBMHash = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++)
            hash = str.charAt(i).charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
        return hash;
    };
    Hashs.DJBHash = function (str) {
        var hash = 5381;
        for (var i = 0; i < str.length; i++)
            hash = ((hash << 5) + hash) + str.charAt(i).charCodeAt(0);
        return hash;
    };
    Hashs.DEKHash = function (str) {
        var hash = str.length;
        for (var i = 0; i < str.length; i++)
            hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i).charCodeAt(0);
        return hash;
    };
    Hashs.BPHash = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++)
            hash = hash << 7 ^ str.charAt(i).charCodeAt(0);
        return hash;
    };
    Hashs.FNVHash = function (str) {
        var fnv_prime = 0x811C9DC5;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash *= fnv_prime;
            hash ^= str.charAt(i).charCodeAt(0);
        }
        return hash;
    };
    Hashs.APHash = function (str) {
        var hash = 0xAAAAAAAA;
        for (var i = 0; i < str.length; i++) {
            if ((i & 1) == 0)
                hash ^= ((hash << 7) ^ str.charAt(i).charCodeAt(0) ^ (hash >> 3));
            else
                hash ^= (~((hash << 11) ^ str.charAt(i).charCodeAt(0) ^ (hash >> 5)));
        }
        return hash;
    };
    return Hashs;
}());
exports.Hashs = Hashs;
