
interface Object {
    CloneObject(): Object;
    //assign(target: any, ...source: any): Object;
    //getOwnPropertySymbols(obj: any): Array<any>;
}
interface Window {
    Reflect: any;
}
interface Boolean {
    ToJSON(key?: any): string;
}
interface Number {
    ToJSON(key?: any): string;
    AppendZero(len: number): string;
}
interface String {
    ToJSON(key?: any): string;
    ReplaceAll(reallyDo: string, replaceWith: string, ignoreCase: boolean): string;
    IsNullOrWhiteSpace(): boolean;
    IsMobilePhone(): boolean;
    IsTelPhone(): boolean;
    /** 验证身份证号码 **/
    IsID(): boolean;
    IsNumber(): boolean;
    StartWith(str: string): boolean;
    EndWith(str: string): boolean;
    Format(args?: any): string;
    /**
     * 本函数只能解析 yyyy-MM-dd HH:mm:ss 格式
     * 
     * @returns {Date} 
     * 
     * @memberof String
     */
    ToDate(): Date;

    Utf16to8(): string;
    Utf8to16(): string;

    /**
     * Base64编码
     * 
     * @returns {string} 
     * 
     * @memberof String
     */
    ToBase64String(): string;

    /**
     * Base64解码.
     * 
     * @returns {string} 
     * 
     * @memberof String
     */
    FromBase64String(): string;
}
interface Date {
    IsLeapYear(y: number): boolean;
    GetDaysInMonth(y: number, m: number): number;

    /**
     * 
     * 
     * @param {string} fmt y年,M月,d日,h时,m分,s秒,S毫秒,q季度,w星期？
     * @returns {string} 
     * 
     * @memberof Date
     */
    Format(fmt: string): string;
    AddYears(y: number): Date;
    AddMonths(m: number): Date;
    AddWeeks(w: number): Date;
    AddDays(d: number): Date;

    AddHour(h: number): Date;
    AddMinute(m: number): Date;
    AddSecond(s: number): Date;

    DiffObject(endTime: Date): {
        Hour: string,
        Minute: string,
        Second: string
    };
    DiffString(endTime: Date): string;
}

interface Array<T> {
    Remove(item: T): boolean;
    RemoveSome(compareFunction: (item: T) => boolean): void;
    Clear(): void;
    Copy(): Array<T>;
    Clone(): Array<T>;
    Contains(item: T): boolean;
    IndexOfX(compareFunction: (item: T) => boolean): number;
    LastIndexOfX(compareFunction: (item: T) => boolean): number;
    Last(compareFunction: (item: T) => boolean): T;
    Default(compareFunction: (item: T) => boolean): T;
    Where(compareFunction: (item: T) => boolean): Array<T>;
    /**
     * 参数返回true可以中断ForEach
     * @param {(item: T, index: number)} func 
     * @memberof Array
     */
    ForEach(func: (item: T, index: number) => any): void;
    Replace(oldItem: T, newItem: T): boolean;
    GetList(indexs: Array<number>): Array<T>;
    Max(compareFunction: (item: T) => number): T;
    Min(compareFunction: (item: T) => number): T;

    /**
     * 随机打乱
     * @memberof Array
     */
    Knuth_Shuffle(): void;
    /**
     * 快速随机打乱
     * @memberof Array
     */
    Fast_Shuffle(): void;
}