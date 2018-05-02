import { IsNull } from "../Common/GlobalExtend";


// ---------Interface Start------
/**
 * 定义一种释放分配的资源的方法。
 * 
 * @export
 * @interface IDisposable
 */
export interface IDisposable {

    /**
     * 执行与释放或重置非托管资源相关的应用程序定义的任务。
     * 
     * @memberof IDisposable
     */
    Dispose(): void;
}
export interface IJSONSerialize {
    ToJson(): string;
    FromJson(str: string): void;
}
// ---------Interface End--------

// ---------Class Start----------
export abstract class Guid {
    static NewGuid(): string {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
}

export abstract class Thread {
    static Sleep(timeout: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
}

/**
 * 所有对象的基类
 * 
 * @export
 * @abstract
 * @class OObject
 */
export abstract class OObject {

    Clone(): any {
        return (this as Object).CloneObject()
    }
}

/**
 * 事件体
 * 
 * @export
 * @class EventArgs
 * @extends {OObject}
 */
export class EventArgs extends OObject {
    static Empty: EventArgs = new EventArgs();
}
export class TYEventArgsGeneric<T> extends EventArgs {
    private m_Value: T;

    get Value(): T {
        return this.m_Value;
    }

    constructor(value: T) {
        super();
        this.m_Value = value;
    }
}
export class TYEventArgsGeneric2<T1, T2> extends EventArgs {
    private m_Value1: T1;
    private m_Value2: T2;

    get Value1(): T1 {
        return this.m_Value1;
    }
    get Value2(): T2 {
        return this.m_Value2;
    }

    constructor(value1: T1, value2: T2) {
        super();
        this.m_Value1 = value1;
        this.m_Value2 = value2;
    }
}
export class TYEventArgsGeneric3<T1, T2, T3> extends EventArgs {
    private m_Value1: T1;
    private m_Value2: T2;
    private m_Value3: T3;

    get Value1(): T1 {
        return this.m_Value1;
    }
    get Value2(): T2 {
        return this.m_Value2;
    }
    get Value3(): T3 {
        return this.m_Value3;
    }

    constructor(value1: T1, value2: T2, value3: T3) {
        super();
        this.m_Value1 = value1;
        this.m_Value2 = value2;
        this.m_Value3 = value3;
    }
}
export class TYDataChangedEventArgs<T1, T2> extends EventArgs {
    private m_OldValue: T1;
    private m_NewValue: T2;

    get OldValue(): T1 {
        return this.m_OldValue;
    }
    get NewValue(): T2 {
        return this.m_NewValue;
    }

    Cancel: boolean = false;

    constructor(oldValue: T1, newValue: T2) {
        super();
        this.m_OldValue = oldValue;
        this.m_NewValue = newValue;
    }
}

/**
 * 事件句柄
 * 
 * @export
 * @class EventHandler
 * @extends {OObject}
 */
export class EventHandler extends OObject {
    private m_FuncList = new Array<(sender: OObject, evtArgs: EventArgs) => void>();

    get HaveEvent(): boolean {
        if (this.m_FuncList.length === 0)
            return false;
        else
            return true;
    }

    AddEventListener(fn: (sender: OObject, evtArgs: EventArgs) => void): void {
        if (typeof (fn) === "function") {
            if (this.m_FuncList.indexOf(fn) === -1)
                this.m_FuncList.push(fn);
        }
    }
    RemoveEventListener(fn: (sender: OObject, evtArgs: EventArgs) => void): void {
        if (typeof (fn) === "function") {
            var index = this.m_FuncList.indexOf(fn);
            if (index !== -1)
                this.m_FuncList.splice(index, 1);
        }
    }
    Clear(): void {
        this.m_FuncList.splice(0, this.m_FuncList.length);
    }
    FireEvent<TSender extends OObject>(sender: TSender, eventArgs: EventArgs): void {
        let funcs = this.m_FuncList.Copy();
        for (var i = 0; i < funcs.length; i++) {
            var fn = funcs[i];
            fn(sender, eventArgs);
        }
    }
}

/**
 * 事件句柄（泛型）
 * 
 * @export
 * @class EventHandlerGeneric
 * @extends {OObject}
 * @template T 
 */
export class EventHandlerGeneric<T extends EventArgs> extends OObject {
    private m_FuncList = new Array<(sender: OObject, evtArgs: EventArgs) => void>();

    get HaveEvent(): boolean {
        if (this.m_FuncList.length === 0)
            return false;
        else
            return true;
    }

    AddEventListener(fn: (sender: OObject, evtArgs: T) => void): void {
        if (typeof (fn) === "function") {
            if (this.m_FuncList.indexOf(fn) === -1)
                this.m_FuncList.push(fn);
        }
    }

    RemoveEventListener(fn: (sender: OObject, evtArgs: T) => void): void {
        if (typeof (fn) === "function") {
            var index = this.m_FuncList.indexOf(fn);
            if (index !== -1)
                this.m_FuncList.splice(index, 1);
        }
    }

    Clear(): void {
        this.m_FuncList.splice(0, this.m_FuncList.length);
    }

    FireEvent<TSender extends OObject>(sender: TSender, eventArgs: T): void {
        for (var i = 0; i < this.m_FuncList.length; i++) {
            var fn = this.m_FuncList[i];
            fn(sender, eventArgs);
        }
    }
}

/**
 * 异常类
 * 
 * @export
 * @class Exception
 * @extends {OObject}
 */
export class Exception extends OObject {
    private m_Code: string = "";
    private m_Message: string = "";
    private m_InnerException: Exception = null;

    get Code(): string {
        return this.m_Code;
    }

    get Message(): string {
        return this.m_Message;
    }

    get InnerException(): Exception {
        return this.m_InnerException;
    }

    constructor(message: string, code: string = null, innerException: Exception = null) {
        super();
        if (innerException == null) {
            this.m_Code = code;
            this.m_Message = message;
            this.m_InnerException = null;
        }
        else {
            if (message == null)
                this.m_Message = innerException.Message;
            else
                this.m_Message = message;
            if (code == null)
                this.m_Code = innerException.Code;
            else
                this.m_Code = code;
            this.m_InnerException = innerException;
        }
    }
}


/**
 * 未处理异常事件体
 * 
 * @export
 * @class UnHandlerExceptionEventArgs
 * @extends {EventArgs}
 */
export class UnHandlerExceptionEventArgs extends EventArgs {
    private m_Error: Exception = null;

    get Error(): Exception {
        return this.m_Error;
    }

    constructor(error: Exception) {
        super();
        this.m_Error = error;
    }
}

export class Nullable<T> extends OObject {
    Value: T;

    get HasValue(): boolean {
        if (this.Value == null && this.Value === undefined)
            return false;
        else
            return true;
    }

    constructor(value: T) {
        super();
        this.Value = value;
    }
}

export class TimeSpan extends OObject {
    private m_Days: number;
    private m_Hours: number;
    private m_Minutes: number;
    private m_Seconds: number;
    private m_Milliseconds: number;

    get Days(): number {
        return this.m_Days;
    }
    get Hours(): number {
        return this.m_Hours;
    }
    get Minutes(): number {
        return this.m_Minutes;
    }
    get Seconds(): number {
        return this.m_Seconds;
    }
    get Milliseconds(): number {
        return this.m_Milliseconds;
    }

    get TotalDays(): number {
        return this.TotalHours / 24;
    }
    get TotalHours(): number {
        return this.TotalMinutes / 60;
    }
    get TotalMinutes(): number {
        return this.TotalSeconds / 60;
    }
    get TotalSeconds(): number {
        return this.TotalMilliseconds / 1000;
    }
    get TotalMilliseconds(): number {
        return (((this.Days * 24 + this.Hours) * 60 + this.Minutes) * 60 + this.Seconds) * 1000 + this.Milliseconds;
    }

    constructor(days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0) {
        super();
        seconds += parseInt(milliseconds / 1000 + "");
        milliseconds = milliseconds % 1000;

        minutes += parseInt(seconds / 60 + "");
        seconds = seconds % 60;

        hours += parseInt(minutes / 60 + "");
        minutes = minutes % 60;

        days += parseInt(hours / 24 + "");
        hours = hours % 24;

        this.m_Days = days;
        this.m_Hours = hours;
        this.m_Minutes = minutes;
        this.m_Seconds = seconds;
        this.m_Milliseconds = milliseconds;
    }

    public static Subtract(d1: Date, d2: Date): TimeSpan {
        return new TimeSpan(0, 0, 0, 0, (d2 as any) - (d1 as any));
    }
}

/**
 * http://hashids.org/javascript/ 
 * 
 * var hashids = new Hashids("this is my salt"),
 *   id = hashids.encode(1, 2, 3),
 *   numbers = hashids.decode(id);
 * 
 * @export
 * @class Hashids
 * @extends {OObject}
 * 
 */
export class Hashids extends OObject {
    private m_seps = 'cfhistuCFHISTU';
    private m_salt: string = "";
    private m_minLength: number = 0;
    private m_alphabet: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    private m_guards: string = "";


    /**
     * Creates an instance of Hashids.
     * @param {string} [salt=""] 
     * @param {number} [minLength=0] 
     * @param {string} [alphabet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"] 
     * 
     * @memberof Hashids
     */
    constructor(
        salt: string = "",
        minLength: number = 0,
        alphabet: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    ) {
        super();
        this.m_salt = salt;
        this.m_minLength = minLength;
        this.m_alphabet = alphabet;

        let minAlphabetLength = 16;
        let sepDiv = 3.5;
        let guardDiv = 12;

        let errorAlphabetLength = 'error: alphabet must contain at least X unique characters';
        let errorAlphabetSpace = 'error: alphabet cannot contain spaces';

        let uniqueAlphabet = '',
            sepsLength = void 0,
            diff = void 0;

        /* alphabet vars */
        for (var i = 0; i !== this.m_alphabet.length; i++) {
            if (uniqueAlphabet.indexOf(this.m_alphabet.charAt(i)) === -1) {
                uniqueAlphabet += this.m_alphabet.charAt(i);
            }
        }

        this.m_alphabet = uniqueAlphabet;

        if (this.m_alphabet.length < minAlphabetLength) {
            throw errorAlphabetLength.replace("X", minAlphabetLength + "");
        }

        if (this.m_alphabet.search(' ') !== -1) {
            throw errorAlphabetSpace;
        }

        /*
      `this.m_seps` should contain only characters present in `this.m_alphabet`
      `this.m_alphabet` should not contains `this.seps`
        */
        for (var _i = 0; _i !== this.m_seps.length; _i++) {
            var j = this.m_alphabet.indexOf(this.m_seps.charAt(_i));
            if (j === -1)
                this.m_seps = this.m_seps.substr(0, _i) + ' ' + this.m_seps.substr(_i + 1);
            else
                this.m_alphabet = this.m_alphabet.substr(0, j) + ' ' + this.m_alphabet.substr(j + 1);
        }
        this.m_alphabet = this.m_alphabet.replace(/ /g, '');

        this.m_seps = this.m_seps.replace(/ /g, '');
        this.m_seps = this._shuffle(this.m_seps, this.m_salt);

        if (!this.m_seps.length || this.m_alphabet.length / this.m_seps.length > sepDiv) {
            sepsLength = Math.ceil(this.m_alphabet.length / sepDiv);
            if (sepsLength > this.m_seps.length) {
                diff = sepsLength - this.m_seps.length;
                this.m_seps += this.m_alphabet.substr(0, diff);
                this.m_alphabet = this.m_alphabet.substr(diff);
            }
        }

        this.m_alphabet = this._shuffle(this.m_alphabet, this.m_salt);
        var guardCount = Math.ceil(this.m_alphabet.length / guardDiv);

        if (this.m_alphabet.length < 3) {
            this.m_guards = this.m_seps.substr(0, guardCount);
            this.m_seps = this.m_seps.substr(guardCount);
        } else {
            this.m_guards = this.m_alphabet.substr(0, guardCount);
            this.m_alphabet = this.m_alphabet.substr(guardCount);
        }
    }

    private _escapeRegExp(s: string): string {
        return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    private _parseInt(v: string, radix: number): number {
        return (/^(\-|\+)?([0-9]+|Infinity)$/.test(v) ? parseInt(v, radix) : NaN);
    };
    private _encode(numbers: Array<number>): string {
        let ret: string = void 0,
            alphabet = this.m_alphabet,
            numbersIdInt = 0;

        for (let i = 0; i !== numbers.length; i++) {
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

        let halfLength = parseInt(alphabet.length / 2 + "", 10);
        while (ret.length < this.m_minLength) {
            alphabet = this._shuffle(alphabet, alphabet);
            ret = alphabet.substr(halfLength) + ret + alphabet.substr(0, halfLength);

            let excess = ret.length - this.m_minLength;
            if (excess > 0) {
                ret = ret.substr(excess / 2, this.m_minLength);
            }
        }
        return ret;
    }

    private _decode(id: string, alphabet: string): Array<number> {
        let ret: Array<number> = [],
            i = 0,
            r = new RegExp('[' + this._escapeRegExp(this.m_guards) + ']', 'g'),
            idBreakdown = id.replace(r, ' '),
            idArray = idBreakdown.split(' ');

        if (idArray.length === 3 || idArray.length === 2) {
            i = 1;
        }

        idBreakdown = idArray[i];
        if (typeof idBreakdown[0] !== 'undefined') {
            let lottery = idBreakdown[0];
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
    }

    private _shuffle(alphabet: string, salt: string): string {
        let integer = void 0;

        if (!salt.length) {
            return alphabet;
        }

        for (let i = alphabet.length - 1, v = 0, p = 0, j = 0; i > 0; i-- , v++) {

            v %= salt.length;
            p += integer = salt.charAt(v).charCodeAt(0);
            j = (integer + v + p) % i;

            let tmp = alphabet[j];
            alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
            alphabet = alphabet.substr(0, i) + tmp + alphabet.substr(i + 1);
        }
        return alphabet;
    }

    private _toAlphabet(input, alphabet: string): string {
        let id = '';

        do {
            id = alphabet.charAt(input % alphabet.length) + id;
            input = parseInt(input / alphabet.length + "", 10);
        } while (input);
        return id;
    }

    private _fromAlphabet(input, alphabet: string): number {
        let number: number = 0;

        for (var i = 0; i < input.length; i++) {
            var pos = alphabet.indexOf(input[i]);
            number += pos * Math.pow(alphabet.length, input.length - i - 1);
        }
        return number;
    }

    Encode(number: number): string {
        return this._encode([number]);
    }

    Decode(id: string): number {
        let ret: 0;
        if (!id || !id.length || typeof id !== 'string') {
            return ret;
        }
        return this._decode(id, this.m_alphabet)[0];
    }
}


/*
 Javascript MD5 library - version 0.6    
 Coded (2011-2016) by Luigi Galli - the running geek LG@THLG.NL - http://THLG.NL    
 Thanks for feedback/tips/suggestions/comments: Roberto Viola, Lucien Nel, Gahl Saraf, Saqib Dareshani, Philip Peterson.    
 The below code is PUBLIC DOMAIN - NO WARRANTY!    
 Changelog: Version 0.6   - 2016-06-26
            ** FIXED: processing an array as input could result in the size of the array changing.
            - new email/website
            Version 0.4   - 2011-06-19
            + added compact version (md5_compact_min.js), this is a slower but smaller version 
              (more than 4KB lighter before stripping/minification)
            + added preliminary support for Typed Arrays (see: 
              https://developer.mozilla.org/en/JavaScript_typed_arrays and 
              http://www.khronos.org/registry/typedarray/specs/latest/)
              MD5() now accepts input data as ArrayBuffer, Float32Array, Float64Array, 
              Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array or Uint8Array 
            - moved unit tests to md5_test.js
            - minor refactoring 
 
            Version 0.3.* - 2011-06-##
            - Internal dev versions
 
            Version 0.2 - 2011-05-22 
            ** FIXED: serious integer overflow problems which could cause a wrong MD5 hash being returned
 
            Version 0.1 - 2011
            -Initial version
*/
/*
   MD5()   
    Computes the MD5 hash for the given input data    
    input :  data as String - (Assumes Unicode code points are encoded as UTF-8. If you 
                               attempt to digest Unicode strings using other encodings 
                               you will get incorrect results!)    
             data as array of characters - (Assumes Unicode code points are encoded as UTF-8. If you 
                              attempt to digest Unicode strings using other encodings 
                              you will get incorrect results!)    
             data as array of bytes (plain javascript array of integer numbers)    
             data as ArrayBuffer (see: https://developer.mozilla.org/en/JavaScript_typed_arrays)                
             data as Float32Array, Float64Array, Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array or Uint8Array (see: https://developer.mozilla.org/en/JavaScript_typed_arrays)                 
             (DataView is not supported yet)    
   output: MD5 hash (as Hex Uppercase String)
*/

export class MD5 extends OObject {
    constructor(data) {
        super();

        // check input data type and perform conversions if needed
        var databytes = null;

        // String
        var type_mismatch = null;
        if (typeof data == 'string') {
            // convert string to array bytes
            databytes = this.str_to_bytes(data);
        } else if (data.constructor == Array) {
            if (data.length === 0) {
                // if it's empty, just assume array of bytes
                databytes = this.cloneArray(data);
            } else if (typeof data[0] == 'string') {
                databytes = this.chars_to_bytes(data);
            } else if (typeof data[0] == 'number') {
                databytes = this.cloneArray(data);
            } else {
                type_mismatch = typeof data[0];
            }
        } else if (typeof ArrayBuffer != 'undefined') {
            if (data instanceof ArrayBuffer) {
                databytes = this.typed_to_plain(new Uint8Array(data));
            } else if ((data instanceof Uint8Array) || (data instanceof Int8Array)) {
                databytes = this.typed_to_plain(data);
            } else if ((data instanceof Uint32Array) || (data instanceof Int32Array) ||
                (data instanceof Uint16Array) || (data instanceof Int16Array) ||
                (data instanceof Float32Array) || (data instanceof Float64Array)
            ) {
                databytes = this.typed_to_plain(new Uint8Array(data.buffer));
            } else {
                type_mismatch = typeof data;
            }
        } else {
            type_mismatch = typeof data;
        }

        if (type_mismatch) {
            throw ('MD5 type mismatch, cannot process ' + type_mismatch);
        }
        function do_digest() {

            // function update partial state for each run
            function updateRun(nf, sin32, dw32, b32) {
                var temp = d;
                d = c;
                c = b;
                //b = b + rol(a + (nf + (sin32 + dw32)), b32)
                b = this._add(b,
                    this.rol(
                        this._add(a,
                            this._add(nf, this._add(sin32, dw32))
                        ), b32
                    )
                );
                a = temp;
            }

            // save original length
            var org_len = databytes.length;

            // first append the "1" + 7x "0"
            databytes.push(0x80);

            // determine required amount of padding
            var tail = databytes.length % 64
            // no room for msg length?
            if (tail > 56) {
                // pad to next 512 bit block
                for (var i = 0; i < (64 - tail); i++) {
                    databytes.push(0x0);
                }
                tail = databytes.length % 64;
            }
            for (i = 0; i < (56 - tail); i++) {
                databytes.push(0x0);
            }
            // message length in bits mod 512 should now be 448
            // append 64 bit, little-endian original msg length (in *bits*!)
            databytes = databytes.concat(this.int64_to_bytes(org_len * 8));

            // initialize 4x32 bit state
            var h0 = 0x67452301;
            var h1 = 0xEFCDAB89;
            var h2 = 0x98BADCFE;
            var h3 = 0x10325476;

            // temp buffers
            var a = 0, b = 0, c = 0, d = 0;

            // Digest message
            for (i = 0; i < databytes.length / 64; i++) {
                // initialize run
                a = h0;
                b = h1;
                c = h2;
                d = h3;

                var ptr = i * 64;

                // do 64 runs
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

                // update buffers
                h0 = this._add(h0, a);
                h1 = this._add(h1, b);
                h2 = this._add(h2, c);
                h3 = this._add(h3, d);
            }
            // Done! Convert buffers to 128 bit (LE)
            return this.int128le_to_hex(h3, h2, h1, h0);
        }
        return do_digest();
    }

    // convert number to (unsigned) 32 bit hex, zero filled string
    private to_zerofilled_hex(n) {
        var t1 = (n >>> 0).toString(16);
        return "00000000".substr(0, 8 - t1.length) + t1;
    }

    // convert array of chars to array of bytes 
    private chars_to_bytes(ac) {
        var retval = [];
        for (var i = 0; i < ac.length; i++) {
            retval = retval.concat(this.str_to_bytes(ac[i]));
        }
        return retval;
    }


    // convert a 64 bit unsigned number to array of bytes. Little endian
    private int64_to_bytes(num) {
        var retval = [];
        for (var i = 0; i < 8; i++) {
            retval.push(num & 0xFF);
            num = num >>> 8;
        }
        return retval;
    }

    //  32 bit left-rotation
    private rol(num, places) {
        return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
    }

    // The 4 MD5 functions
    private fF(b, c, d) {
        return (b & c) | (~b & d);
    }

    private fG(b, c, d) {
        return (d & b) | (~d & c);
    }

    private fH(b, c, d) {
        return b ^ c ^ d;
    }

    private fI(b, c, d) {
        return c ^ (b | ~d);
    }

    // pick 4 bytes at specified offset. Little-endian is assumed
    private bytes_to_int32(arr, off) {
        return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
    }

    /*
    Conver string to array of bytes in UTF-8 encoding
    See: 
    http://www.dangrossman.info/2007/05/25/handling-utf-8-in-javascript-php-and-non-utf8-databases/
    http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
    How about a String.getBytes(<ENCODING>) for Javascript!? Isn't it time to add it?
    */
    private str_to_bytes(str) {
        var retval = [];
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) <= 0x7F) {
                retval.push(str.charCodeAt(i));
            } else {
                var tmp = encodeURIComponent(str.charAt(i)).substr(1).split('%')
                for (var j = 0; j < tmp.length; j++) {
                    retval.push(parseInt(tmp[j], 0x10));
                }
            }
        return retval;
    }


    // convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
    private int128le_to_hex(a, b, c, d) {
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
    }

    // conversion from typed byte array to plain javascript array 
    private typed_to_plain(tarr) {
        var retval = new Array(tarr.length);
        for (var i = 0; i < tarr.length; i++) {
            retval[i] = tarr[i];
        }
        return retval;
    }

    private cloneArray(inpArr) {
        return inpArr.slice();
    }

    private _add(n1, n2) {
        return 0x0FFFFFFFF & (n1 + n2);
    }

    // ---------Class End------------
}

export abstract class Hashs {
    /*RSHash*/
    public static RSHash(str: string): number {
        let b: number = 378551;
        let a: number = 63689;
        let hash: number = 0;
        for (let i = 0; i < str.length; i++) {
            hash = hash * a + str.charAt(i).charCodeAt(0);
            a = a * b;
        }
        return hash;
    }
    /*JSHash*/
    public static JSHash(str: string): number {
        let hash: number = 1315423911;
        for (let i = 0; i < str.length; i++)
            hash ^= ((hash << 5) + str.charAt(i).charCodeAt(0) + (hash >> 2));
        return hash;
    }
    /*PJWHash*/
    public static PJWHash(str: string): number {
        let BitsInUnsignedInt: number = 4 * 8;
        let ThreeQuarters: number = (BitsInUnsignedInt * 3) / 4;
        let OneEighth: number = BitsInUnsignedInt / 8;
        let HighBits: number = (0xFFFFFFFF) << (BitsInUnsignedInt - OneEighth);
        let hash: number = 0;
        let test: number = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << OneEighth) + str.charAt(i).charCodeAt(0);
            if ((test = hash & HighBits) != 0)
                hash = ((hash ^ (test >> ThreeQuarters)) & (~HighBits));
        }
        return hash;
    }
    /*ELFHash*/
    public static ELFHash(str: string): number {
        let hash: number = 0;
        let x: number = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 4) + str.charAt(i).charCodeAt(0);
            x = hash & 0xF0000000;
            if (x != 0)
                hash ^= ( x >> 24);
            hash &= ~x;
        }
        return hash;
    }
    /*BKDRHash*/
    public static BKDRHash(str: string): number {
        let seed: number = 131;//31131131313131131313etc..
        let hash: number = 0;
        for (let i = 0; i < str.length; i++)
            hash = (hash * seed) + str.charAt(i).charCodeAt(0);
        return hash;
    }
    /*SDBMHash*/
    public static SDBMHash( str: string): number {
        let hash: number = 0;
        for (let i = 0; i < str.length; i++)
            hash = str.charAt(i).charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
        return hash;
    }
    /*DJBHash*/
    public static DJBHash(str: string): number {
        let hash: number = 5381;
        for (let i = 0; i < str.length; i++)
            hash = ((hash << 5) + hash) + str.charAt(i).charCodeAt(0);
        return hash;
    }
    /*DEKHash*/
    public static DEKHash( str: string): number {
        let hash: number = str.length;
        for (let i = 0; i < str.length; i++)
            hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i).charCodeAt(0);
        return hash;
    }
    /*BPHash*/
    public static BPHash(str: string): number {
        let hash: number = 0;
        for (let i = 0; i < str.length; i++)
            hash = hash << 7 ^ str.charAt(i).charCodeAt(0);
        return hash;
    }
    /*FNVHash*/
    public static FNVHash( str: string): number {
        let fnv_prime: number = 0x811C9DC5;
        let hash: number = 0;
        for (let i = 0; i < str.length; i++) {
            hash *= fnv_prime;
            hash ^= str.charAt(i).charCodeAt(0);
        }
        return hash;
    }
    /*APHash*/
    public static APHash(str: string): number {
        let hash: number = 0xAAAAAAAA;
        for (let i = 0; i < str.length; i++) {
            if ((i & 1) == 0)
                hash ^= ((hash << 7) ^ str.charAt(i).charCodeAt(0) ^ (hash >> 3));
            else
                hash ^= (~((hash << 11) ^ str.charAt(i).charCodeAt(0) ^ (hash >> 5)));
        }
        return hash;
    }
}
