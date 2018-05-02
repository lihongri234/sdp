import { IsNull } from '../Common/GlobalExtend';
import { EventHandler, TYEventArgsGeneric, EventHandlerGeneric, Exception, IJSONSerialize, OObject, EventArgs, IDisposable } from './System';

// ---------Class Start----------
export class KeyValuePair<TKey, TValue> extends OObject {
    private m_Key: TKey;
    private m_Value: TValue;

    get Key(): TKey {
        return this.m_Key;
    }

    get Value(): TValue {
        return this.m_Value;
    }

    constructor(key: TKey, value: TValue) {
        super();
        this.m_Key = key;
        this.m_Value = value;
    }
}

export class Dictionary<TKey, TValue> extends OObject {
    private m_Keys: Array<TKey> = new Array<TKey>();
    private m_Values: Array<TValue> = new Array<TValue>();

    constructor() {
        super();
    }

    get Count(): number {
        return this.m_Keys.length;
    }

    GetValue(key: TKey): TValue {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key)
                return this.m_Values[i];
        }
        throw new Exception(`Key[${key}]值在字典中不存在!`);
    }

    SetValue(key: TKey, value: TValue): void {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key) {
                this.m_Values[i] = value;
                return;
            }
        }
        throw new Exception(`Key[${key}]值在字典中不存在!`);
    }

    TrySetValue(key: TKey, value: TValue): void {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key) {
                this.m_Values[i] = value;
                return;
            }
        }
        this.Add(key, value);
    }

    Add(key: TKey, value: TValue): void {
        this.m_Keys.push(key);
        this.m_Values.push(value);
    }

    Remove(key: TKey): void {
        var index = this.m_Keys.indexOf(key, 0);
        this.m_Keys.splice(index, 1);
        this.m_Values.splice(index, 1);
    }

    RemoveSome(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): void {
        let delList = new Array<TKey>();
        this.ForEach((obj1) => {
            if (compareFunction(obj1))
                delList.push(obj1.Key);
        });
        for (let i = 0; i < delList.length; i++)
            this.Remove(delList[i]);
    }

    Keys(): Array<TKey> {
        return this.m_Keys;
    }

    Values(): Array<TValue> {
        return this.m_Values;
    }

    ContainsKey(key: TKey): boolean {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key)
                return true;
        }
        return false;
    }

    Clear(): void {
        this.m_Keys.Clear();
        this.m_Values.Clear();
    }

    /**
     * 参数返回true可以中断ForEach
     * @param {(obj: KeyValuePair<TKey, TValue>)} workFunction
     * @memberof Array
     */
    ForEach(workFunction: (obj: KeyValuePair<TKey, TValue>) => any): void {
        if (IsNull(workFunction))
            return;
        if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                if (workFunction(keyval))
                    break;
            }
        }
    }

    Default(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): TValue {
        if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return null;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                if (compareFunction(keyval))
                    return keyval.Value;
            }
            return null;
        }
    }

    Where(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): Array<TValue> {
        let result: Array<TValue> = new Array<TValue>();
        if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return result;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                if (compareFunction(keyval))
                    result.push(keyval.Value);
            }
            return result;
        }
    }
}

export class List<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    AfterAdd: EventHandlerGeneric<TYEventArgsGeneric<T>> = new EventHandlerGeneric<TYEventArgsGeneric<T>>();
    AfterRemove: EventHandlerGeneric<TYEventArgsGeneric<T>> = new EventHandlerGeneric<TYEventArgsGeneric<T>>();
    BeforeClear: EventHandler = new EventHandler();
    AfterClear: EventHandler = new EventHandler();

    get Count(): number {
        return this.m_Values.length;
    }

    Add(item: T): void {
        this.m_Values.push(item);
        this.AfterAdd.FireEvent(this, new TYEventArgsGeneric(item));
    }
    Remove(item: T): boolean {
        let r = this.m_Values.Remove(item);
        this.AfterRemove.FireEvent(this, new TYEventArgsGeneric(item));
        return r;
    }
    RemoveSome(compareFunction: (item: T) => boolean): void {
        let delList = new Array<T>();
        this.ForEach((item1, index1) => {
            if (compareFunction(item1))
                delList.push(item1);
        });
        for (let i = 0; i < delList.length; i++)
            this.Remove(delList[i]);
    }
    Clear(): void {
        this.BeforeClear.FireEvent(this, EventArgs.Empty);
        this.m_Values.Clear();
        this.AfterClear.FireEvent(this, EventArgs.Empty);
    }
    ToArray(): Array<T> {
        return this.m_Values.Copy();
    }
    Contains(item: T): boolean {
        return this.m_Values.Contains(item);
    }

    GetValue(index: number): T {
        return this.m_Values[index];
    }

    IndexOf(item: T): number {
        return this.m_Values.indexOf(item);
    }
    IndexOfX(compareFunction: (item: T) => boolean): number {
        return this.m_Values.IndexOfX(compareFunction);
    }
    LastIndexOfX(compareFunction: (item: T) => boolean): number {
        return this.m_Values.LastIndexOfX(compareFunction);
    }
    Default(compareFunction: (item: T) => boolean): T {
        return this.m_Values.Default(compareFunction);
    }
    Where(compareFunction: (item: T) => boolean): Array<T> {
        return this.m_Values.Where(compareFunction);
    }
    ForEach(func: (item: T, index: number) => any): void {
        this.m_Values.ForEach(func);
    }
    Replace(oldItem: T, newItem: T): boolean {
        return this.m_Values.Replace(oldItem, newItem);
    }
    GetList(indexs: Array<number>): Array<T> {
        return this.m_Values.GetList(indexs);
    }
    Max(compareFunction: (item: T) => number): T {
        return this.m_Values.Max(compareFunction);
    }
    Min(compareFunction: (item: T) => number): T {
        return this.m_Values.Min(compareFunction);
    }
}

/**
 * 堆栈，先进后出
 * 
 * @export
 * @class Stack
 * @extends {OObject}
 * @template T 
 */
export class Stack<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    constructor() {
        super();
    }

    get Count(): number {
        return this.m_Values.length;
    }

    Clear(): void {
        this.m_Values.Clear();
    }

    Contains(item: T): boolean {
        return this.m_Values.Contains(item);
    }

    /**
     * 移除并返回位于 Stack 顶部的对象。
     */
    Pop(): T {
        return this.m_Values.shift();
    }

    /**
     * 将对象插入 Stack 的顶部
     * @param item
     */
    Push(item: T): void {
        this.m_Values.unshift(item);
    }

    /**
     * 返回位于 Stack 顶部的对象但不将其移除。
     */
    Peek(): T {
        if (this.m_Values.length > 0)
            return this.m_Values[0];
        else
            return null;
    }

    /**
     * 将 Stack 复制到新数组中
     */
    ToArray(): Array<T> {
        let result = new Array<T>();
        for (let i = 0; i < this.m_Values.length; i++)
            result.push(this.m_Values[i]);
        return result;
    }
}

/**
 * 队列，先进先出
 * 
 * @export
 * @class Queue
 * @extends {OObject}
 * @template T 
 */
export class Queue<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    constructor() {
        super();
    }

    get Count(): number {
        return this.m_Values.length;
    }

    Clear(): void {
        this.m_Values.Clear();
    }

    Contains(item: T): boolean {
        return this.m_Values.Contains(item);
    }

    /**
     * 移除并返回在 Queue 的开头的对象
     */
    Dequeue(): T {
        return this.m_Values.shift();
    }

    /**
     * 向 Queue 的末尾添加一个对象
     * @param item
     */
    Enqueue(item: T): void {
        this.m_Values.push(item);
    }

    /**
     * 返回位于 Queue 顶部的对象但不将其移除。
     */
    Peek(): T {
        if (this.m_Values.length > 0)
            return this.m_Values[0];
        else
            return null;
    }

    /**
     * 将 Queue 复制到新数组中
     */
    ToArray(): Array<T> {
        let result = new Array<T>();
        for (let i = 0; i < this.m_Values.length; i++)
            result.push(this.m_Values[i]);
        return result;
    }
}

export class ConcurrentLock extends OObject implements IDisposable {
    private m_Work: (resolv: any, reject: any) => void = null;
    private m_Resolve: any = null;
    private m_Reject: any = null;

    constructor(_Work: (resolve: any, reject: any) => void, _Resolve: any, _Reject: any) {
        super();
        this.m_Work = _Work;
        this.m_Resolve = _Resolve;
        this.m_Reject = _Reject;
    }

    public Work(): void {
        this.m_Work(this.m_Resolve, this.m_Reject);
    }

    public Dispose(): void {
        this.m_Work = null;
        this.m_Resolve = null;
        this.m_Reject = null;
    }
}

export class Locker extends OObject {
    private static m_Disposeing: boolean = false;
    private static m_LockList: Queue<ConcurrentLock> = new Queue<ConcurrentLock>();

    private static _Dispose(): void {
        if (Locker.m_Disposeing)
            return;
        Locker.m_Disposeing = true;
        while (Locker.m_LockList.Count > 0) {
            let w = Locker.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        Locker.m_Disposeing = false;
    }

    public static Lock(work: () => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Locker.m_LockList.Enqueue(new ConcurrentLock((_resolve, _reject) => {
                if (!IsNull(work))
                    work();
                _resolve();
            }, resolve, reject));
            Locker._Dispose();
        });
    }
}

/**
 * 线程安全字典
 */
export class ConcurrentDictionary<TKey, TValue> extends OObject {
    private m_Keys: Array<TKey> = new Array<TKey>();
    private m_Values: Array<TValue> = new Array<TValue>();

    private m_Disposeing: boolean = false;
    private m_LockList: Queue<ConcurrentLock> = new Queue<ConcurrentLock>();

    private _Dispose(): void {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            let w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    }

    constructor() {
        super();
    }

    GetCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Keys.length);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    GetValue(key: TKey): Promise<TValue> {
        return new Promise<TValue>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    for (var i = 0; i < this.m_Keys.length; i++) {
                        if (this.m_Keys[i] === key) {
                            _resolve(this.m_Values[i]);
                            return;
                        }
                    }
                    _reject(new Exception(`Key[${key}]值在字典中不存在!`));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    SetValue(key: TKey, value: TValue): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    for (var i = 0; i < this.m_Keys.length; i++) {
                        if (this.m_Keys[i] === key) {
                            this.m_Values[i] = value;
                            _resolve();
                            return;
                        }
                    }
                    _reject(new Exception(`Key[${key}]值在字典中不存在!`));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    TrySetValue(key: TKey, value: TValue): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    for (var i = 0; i < this.m_Keys.length; i++) {
                        if (this.m_Keys[i] === key) {
                            this.m_Values[i] = value;
                            _resolve();
                            return;
                        }
                    }
                    try {
                        this.Add(key, value);
                        _resolve();
                    }
                    catch (e) {
                        _reject(e);
                    }
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Add(key: TKey, value: TValue): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Keys.push(key);
                    this.m_Values.push(value);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Remove(key: TKey): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let index = this.m_Keys.indexOf(key, 0);
                    this.m_Keys.splice(index, 1);
                    this.m_Values.splice(index, 1);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    RemoveSome(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let delList = new Array<TKey>();
                    this.ForEach((obj1) => {
                        if (compareFunction(obj1))
                            delList.push(obj1.Key);
                    });
                    for (let i = 0; i < delList.length; i++)
                        this.Remove(delList[i]);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Keys(): Promise<Array<TKey>> {
        return new Promise<Array<TKey>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Keys);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Values(): Promise<Array<TValue>> {
        return new Promise<Array<TValue>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    ContainsKey(key: TKey): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    for (var i = 0; i < this.m_Keys.length; i++) {
                        if (this.m_Keys[i] === key) {
                            _resolve(true);
                            return;
                        }
                    }
                    _resolve(false);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Clear(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Keys.Clear();
                    this.m_Values.Clear();
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    ForEach(workFunction: (obj: KeyValuePair<TKey, TValue>) => any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    if (IsNull(workFunction))
                        _resolve();
                    if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
                        _resolve();
                    else {
                        for (var i = 0; i < this.m_Keys.length; i++) {
                            let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                            if (workFunction(keyval))
                                break;
                        }
                        _resolve();
                    }
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Default(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): Promise<TValue> {
        return new Promise<TValue>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
                        _resolve(null);
                    else {
                        for (var i = 0; i < this.m_Keys.length; i++) {
                            let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                            if (compareFunction(keyval)) {
                                _resolve(keyval.Value);
                                return;
                            }
                        }
                        _resolve(null);
                    }
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Where(compareFunction: (obj: KeyValuePair<TKey, TValue>) => boolean): Promise<Array<TValue>> {
        return new Promise<Array<TValue>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let result: Array<TValue> = new Array<TValue>();
                    if (IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
                        _resolve(result);
                    else {
                        for (var i = 0; i < this.m_Keys.length; i++) {
                            let keyval: KeyValuePair<TKey, TValue> = new KeyValuePair<TKey, TValue>(this.m_Keys[i], this.m_Values[i]);
                            if (compareFunction(keyval))
                                result.push(keyval.Value);
                        }
                        _resolve(result);
                    }
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
}

/**
 * 线程安全集合
 */
export class ConcurrentList<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    private m_Disposeing: boolean = false;
    private m_LockList: Queue<ConcurrentLock> = new Queue<ConcurrentLock>();

    AfterAdd: EventHandlerGeneric<TYEventArgsGeneric<T>> = new EventHandlerGeneric<TYEventArgsGeneric<T>>();
    AfterRemove: EventHandlerGeneric<TYEventArgsGeneric<T>> = new EventHandlerGeneric<TYEventArgsGeneric<T>>();
    BeforeClear: EventHandler = new EventHandler();
    AfterClear: EventHandler = new EventHandler();

    private _Dispose(): void {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            let w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    }

    GetCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.length);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Add(item: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.push(item);
                    this.AfterAdd.FireEvent(this, new TYEventArgsGeneric(item));
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Remove(item: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let r = this.m_Values.Remove(item);
                    this.AfterRemove.FireEvent(this, new TYEventArgsGeneric(item));
                    _resolve(r);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    RemoveSome(compareFunction: (item: T) => boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let delList = new Array<T>();
                    this.ForEach((item1, index1) => {
                        if (compareFunction(item1))
                            delList.push(item1);
                    });
                    for (let i = 0; i < delList.length; i++)
                        this.Remove(delList[i]);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Clear(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.BeforeClear.FireEvent(this, EventArgs.Empty);
                    this.m_Values.Clear();
                    this.AfterClear.FireEvent(this, EventArgs.Empty);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    ToArray(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Copy());
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Contains(item: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Contains(item));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    GetValue(index: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values[index]);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    IndexOf(item: T): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.indexOf(item));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    IndexOfX(compareFunction: (item: T) => boolean): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.IndexOfX(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    LastIndexOfX(compareFunction: (item: T) => boolean): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.LastIndexOfX(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Default(compareFunction: (item: T) => boolean): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Default(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Where(compareFunction: (item: T) => boolean): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Where(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    ForEach(func: (item: T, index: number) => any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.ForEach(func);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Replace(oldItem: T, newItem: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Replace(oldItem, newItem));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    GetList(indexs: Array<number>): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.GetList(indexs));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Max(compareFunction: (item: T) => number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Max(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
    Min(compareFunction: (item: T) => number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Min(compareFunction));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
}

/**
 * 线程安全堆栈，先进后出
 * 
 * @export
 * @class Stack
 * @extends {OObject}
 * @template T 
 */
export class ConcurrentStack<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    private m_Disposeing: boolean = false;
    private m_LockList: Queue<ConcurrentLock> = new Queue<ConcurrentLock>();

    private _Dispose(): void {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            let w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    }

    constructor() {
        super();
    }

    GetCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.length);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Clear(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.Clear();
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Contains(item: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Contains(item));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 移除并返回位于 Stack 顶部的对象。
     */
    Pop(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.shift());
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 将对象插入 Stack 的顶部
     * @param item
     */
    Push(item: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.unshift(item);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 返回位于 Stack 顶部的对象但不将其移除。
     */
    Peek(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    if (this.m_Values.length > 0)
                        _resolve(this.m_Values[0]);
                    else
                        _resolve(null);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 将 Stack 复制到新数组中
     */
    ToArray(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let result = new Array<T>();
                    for (let i = 0; i < this.m_Values.length; i++)
                        result.push(this.m_Values[i]);
                    _resolve(result);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
}

/**
 * 线程安全队列，先进先出
 * 
 * @export
 * @class Queue
 * @extends {OObject}
 * @template T 
 */
export class ConcurrentQueue<T> extends OObject {
    private m_Values: Array<T> = new Array<T>();

    private m_Disposeing: boolean = false;
    private m_LockList: Queue<ConcurrentLock> = new Queue<ConcurrentLock>();

    private _Dispose(): void {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            let w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    }

    constructor() {
        super();
    }

    GetCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.length);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Clear(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.Clear();
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    Contains(item: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.Contains(item));
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 移除并返回在 Queue 的开头的对象
     */
    Dequeue(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    _resolve(this.m_Values.shift());
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 向 Queue 的末尾添加一个对象
     * @param item
     */
    Enqueue(item: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    this.m_Values.push(item);
                    _resolve();
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 返回位于 Queue 顶部的对象但不将其移除。
     */
    Peek(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    if (this.m_Values.length > 0)
                        _resolve(this.m_Values[0]);
                    else
                        _resolve(null);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }

    /**
     * 将 Queue 复制到新数组中
     */
    ToArray(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.m_LockList.Enqueue(new ConcurrentLock(
                (_resolve, _reject) => {
                    let result = new Array<T>();
                    for (let i = 0; i < this.m_Values.length; i++)
                        result.push(this.m_Values[i]);
                    _resolve(result);
                },
                resolve,
                reject
            ));
            this._Dispose();
        });
    }
}
// ---------Class End------------


