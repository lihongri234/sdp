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
var GlobalExtend_1 = require("../Common/GlobalExtend");
var System_1 = require("./System");
var KeyValuePair = (function (_super) {
    __extends(KeyValuePair, _super);
    function KeyValuePair(key, value) {
        var _this = _super.call(this) || this;
        _this.m_Key = key;
        _this.m_Value = value;
        return _this;
    }
    Object.defineProperty(KeyValuePair.prototype, "Key", {
        get: function () {
            return this.m_Key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyValuePair.prototype, "Value", {
        get: function () {
            return this.m_Value;
        },
        enumerable: true,
        configurable: true
    });
    return KeyValuePair;
}(System_1.OObject));
exports.KeyValuePair = KeyValuePair;
var Dictionary = (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary() {
        var _this = _super.call(this) || this;
        _this.m_Keys = new Array();
        _this.m_Values = new Array();
        return _this;
    }
    Object.defineProperty(Dictionary.prototype, "Count", {
        get: function () {
            return this.m_Keys.length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.GetValue = function (key) {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key)
                return this.m_Values[i];
        }
        throw new System_1.Exception("Key[" + key + "]\u503C\u5728\u5B57\u5178\u4E2D\u4E0D\u5B58\u5728!");
    };
    Dictionary.prototype.SetValue = function (key, value) {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key) {
                this.m_Values[i] = value;
                return;
            }
        }
        throw new System_1.Exception("Key[" + key + "]\u503C\u5728\u5B57\u5178\u4E2D\u4E0D\u5B58\u5728!");
    };
    Dictionary.prototype.TrySetValue = function (key, value) {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key) {
                this.m_Values[i] = value;
                return;
            }
        }
        this.Add(key, value);
    };
    Dictionary.prototype.Add = function (key, value) {
        this.m_Keys.push(key);
        this.m_Values.push(value);
    };
    Dictionary.prototype.Remove = function (key) {
        var index = this.m_Keys.indexOf(key, 0);
        this.m_Keys.splice(index, 1);
        this.m_Values.splice(index, 1);
    };
    Dictionary.prototype.RemoveSome = function (compareFunction) {
        var delList = new Array();
        this.ForEach(function (obj1) {
            if (compareFunction(obj1))
                delList.push(obj1.Key);
        });
        for (var i = 0; i < delList.length; i++)
            this.Remove(delList[i]);
    };
    Dictionary.prototype.Keys = function () {
        return this.m_Keys;
    };
    Dictionary.prototype.Values = function () {
        return this.m_Values;
    };
    Dictionary.prototype.ContainsKey = function (key) {
        for (var i = 0; i < this.m_Keys.length; i++) {
            if (this.m_Keys[i] === key)
                return true;
        }
        return false;
    };
    Dictionary.prototype.Clear = function () {
        this.m_Keys.Clear();
        this.m_Values.Clear();
    };
    Dictionary.prototype.ForEach = function (workFunction) {
        if (GlobalExtend_1.IsNull(workFunction))
            return;
        if (GlobalExtend_1.IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                var keyval = new KeyValuePair(this.m_Keys[i], this.m_Values[i]);
                if (workFunction(keyval))
                    break;
            }
        }
    };
    Dictionary.prototype.Default = function (compareFunction) {
        if (GlobalExtend_1.IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return null;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                var keyval = new KeyValuePair(this.m_Keys[i], this.m_Values[i]);
                if (compareFunction(keyval))
                    return keyval.Value;
            }
            return null;
        }
    };
    Dictionary.prototype.Where = function (compareFunction) {
        var result = new Array();
        if (GlobalExtend_1.IsNull(this) || this.m_Values.length == 0 || this.m_Keys.length == 0)
            return result;
        else {
            for (var i = 0; i < this.m_Keys.length; i++) {
                var keyval = new KeyValuePair(this.m_Keys[i], this.m_Values[i]);
                if (compareFunction(keyval))
                    result.push(keyval.Value);
            }
            return result;
        }
    };
    return Dictionary;
}(System_1.OObject));
exports.Dictionary = Dictionary;
var List = (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_Values = new Array();
        _this.AfterAdd = new System_1.EventHandlerGeneric();
        _this.AfterRemove = new System_1.EventHandlerGeneric();
        _this.BeforeClear = new System_1.EventHandler();
        _this.AfterClear = new System_1.EventHandler();
        return _this;
    }
    Object.defineProperty(List.prototype, "Count", {
        get: function () {
            return this.m_Values.length;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.Add = function (item) {
        this.m_Values.push(item);
        this.AfterAdd.FireEvent(this, new System_1.TYEventArgsGeneric(item));
    };
    List.prototype.Remove = function (item) {
        var r = this.m_Values.Remove(item);
        this.AfterRemove.FireEvent(this, new System_1.TYEventArgsGeneric(item));
        return r;
    };
    List.prototype.RemoveSome = function (compareFunction) {
        var delList = new Array();
        this.ForEach(function (item1, index1) {
            if (compareFunction(item1))
                delList.push(item1);
        });
        for (var i = 0; i < delList.length; i++)
            this.Remove(delList[i]);
    };
    List.prototype.Clear = function () {
        this.BeforeClear.FireEvent(this, System_1.EventArgs.Empty);
        this.m_Values.Clear();
        this.AfterClear.FireEvent(this, System_1.EventArgs.Empty);
    };
    List.prototype.ToArray = function () {
        return this.m_Values.Copy();
    };
    List.prototype.Contains = function (item) {
        return this.m_Values.Contains(item);
    };
    List.prototype.GetValue = function (index) {
        return this.m_Values[index];
    };
    List.prototype.IndexOf = function (item) {
        return this.m_Values.indexOf(item);
    };
    List.prototype.IndexOfX = function (compareFunction) {
        return this.m_Values.IndexOfX(compareFunction);
    };
    List.prototype.LastIndexOfX = function (compareFunction) {
        return this.m_Values.LastIndexOfX(compareFunction);
    };
    List.prototype.Default = function (compareFunction) {
        return this.m_Values.Default(compareFunction);
    };
    List.prototype.Where = function (compareFunction) {
        return this.m_Values.Where(compareFunction);
    };
    List.prototype.ForEach = function (func) {
        this.m_Values.ForEach(func);
    };
    List.prototype.Replace = function (oldItem, newItem) {
        return this.m_Values.Replace(oldItem, newItem);
    };
    List.prototype.GetList = function (indexs) {
        return this.m_Values.GetList(indexs);
    };
    List.prototype.Max = function (compareFunction) {
        return this.m_Values.Max(compareFunction);
    };
    List.prototype.Min = function (compareFunction) {
        return this.m_Values.Min(compareFunction);
    };
    return List;
}(System_1.OObject));
exports.List = List;
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super.call(this) || this;
        _this.m_Values = new Array();
        return _this;
    }
    Object.defineProperty(Stack.prototype, "Count", {
        get: function () {
            return this.m_Values.length;
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.Clear = function () {
        this.m_Values.Clear();
    };
    Stack.prototype.Contains = function (item) {
        return this.m_Values.Contains(item);
    };
    Stack.prototype.Pop = function () {
        return this.m_Values.shift();
    };
    Stack.prototype.Push = function (item) {
        this.m_Values.unshift(item);
    };
    Stack.prototype.Peek = function () {
        if (this.m_Values.length > 0)
            return this.m_Values[0];
        else
            return null;
    };
    Stack.prototype.ToArray = function () {
        var result = new Array();
        for (var i = 0; i < this.m_Values.length; i++)
            result.push(this.m_Values[i]);
        return result;
    };
    return Stack;
}(System_1.OObject));
exports.Stack = Stack;
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        var _this = _super.call(this) || this;
        _this.m_Values = new Array();
        return _this;
    }
    Object.defineProperty(Queue.prototype, "Count", {
        get: function () {
            return this.m_Values.length;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.Clear = function () {
        this.m_Values.Clear();
    };
    Queue.prototype.Contains = function (item) {
        return this.m_Values.Contains(item);
    };
    Queue.prototype.Dequeue = function () {
        return this.m_Values.shift();
    };
    Queue.prototype.Enqueue = function (item) {
        this.m_Values.push(item);
    };
    Queue.prototype.Peek = function () {
        if (this.m_Values.length > 0)
            return this.m_Values[0];
        else
            return null;
    };
    Queue.prototype.ToArray = function () {
        var result = new Array();
        for (var i = 0; i < this.m_Values.length; i++)
            result.push(this.m_Values[i]);
        return result;
    };
    return Queue;
}(System_1.OObject));
exports.Queue = Queue;
var ConcurrentLock = (function (_super) {
    __extends(ConcurrentLock, _super);
    function ConcurrentLock(_Work, _Resolve, _Reject) {
        var _this = _super.call(this) || this;
        _this.m_Work = null;
        _this.m_Resolve = null;
        _this.m_Reject = null;
        _this.m_Work = _Work;
        _this.m_Resolve = _Resolve;
        _this.m_Reject = _Reject;
        return _this;
    }
    ConcurrentLock.prototype.Work = function () {
        this.m_Work(this.m_Resolve, this.m_Reject);
    };
    ConcurrentLock.prototype.Dispose = function () {
        this.m_Work = null;
        this.m_Resolve = null;
        this.m_Reject = null;
    };
    return ConcurrentLock;
}(System_1.OObject));
exports.ConcurrentLock = ConcurrentLock;
var Locker = (function (_super) {
    __extends(Locker, _super);
    function Locker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Locker._Dispose = function () {
        if (Locker.m_Disposeing)
            return;
        Locker.m_Disposeing = true;
        while (Locker.m_LockList.Count > 0) {
            var w = Locker.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        Locker.m_Disposeing = false;
    };
    Locker.Lock = function (work) {
        return new Promise(function (resolve, reject) {
            Locker.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                if (!GlobalExtend_1.IsNull(work))
                    work();
                _resolve();
            }, resolve, reject));
            Locker._Dispose();
        });
    };
    Locker.m_Disposeing = false;
    Locker.m_LockList = new Queue();
    return Locker;
}(System_1.OObject));
exports.Locker = Locker;
var ConcurrentDictionary = (function (_super) {
    __extends(ConcurrentDictionary, _super);
    function ConcurrentDictionary() {
        var _this = _super.call(this) || this;
        _this.m_Keys = new Array();
        _this.m_Values = new Array();
        _this.m_Disposeing = false;
        _this.m_LockList = new Queue();
        return _this;
    }
    ConcurrentDictionary.prototype._Dispose = function () {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            var w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    };
    ConcurrentDictionary.prototype.GetCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Keys.length);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.GetValue = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                for (var i = 0; i < _this.m_Keys.length; i++) {
                    if (_this.m_Keys[i] === key) {
                        _resolve(_this.m_Values[i]);
                        return;
                    }
                }
                _reject(new System_1.Exception("Key[" + key + "]\u503C\u5728\u5B57\u5178\u4E2D\u4E0D\u5B58\u5728!"));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.SetValue = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                for (var i = 0; i < _this.m_Keys.length; i++) {
                    if (_this.m_Keys[i] === key) {
                        _this.m_Values[i] = value;
                        _resolve();
                        return;
                    }
                }
                _reject(new System_1.Exception("Key[" + key + "]\u503C\u5728\u5B57\u5178\u4E2D\u4E0D\u5B58\u5728!"));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.TrySetValue = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                for (var i = 0; i < _this.m_Keys.length; i++) {
                    if (_this.m_Keys[i] === key) {
                        _this.m_Values[i] = value;
                        _resolve();
                        return;
                    }
                }
                try {
                    _this.Add(key, value);
                    _resolve();
                }
                catch (e) {
                    _reject(e);
                }
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Add = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Keys.push(key);
                _this.m_Values.push(value);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Remove = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var index = _this.m_Keys.indexOf(key, 0);
                _this.m_Keys.splice(index, 1);
                _this.m_Values.splice(index, 1);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.RemoveSome = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var delList = new Array();
                _this.ForEach(function (obj1) {
                    if (compareFunction(obj1))
                        delList.push(obj1.Key);
                });
                for (var i = 0; i < delList.length; i++)
                    _this.Remove(delList[i]);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Keys = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Keys);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Values = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.ContainsKey = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                for (var i = 0; i < _this.m_Keys.length; i++) {
                    if (_this.m_Keys[i] === key) {
                        _resolve(true);
                        return;
                    }
                }
                _resolve(false);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Keys.Clear();
                _this.m_Values.Clear();
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.ForEach = function (workFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                if (GlobalExtend_1.IsNull(workFunction))
                    _resolve();
                if (GlobalExtend_1.IsNull(_this) || _this.m_Values.length == 0 || _this.m_Keys.length == 0)
                    _resolve();
                else {
                    for (var i = 0; i < _this.m_Keys.length; i++) {
                        var keyval = new KeyValuePair(_this.m_Keys[i], _this.m_Values[i]);
                        if (workFunction(keyval))
                            break;
                    }
                    _resolve();
                }
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Default = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                if (GlobalExtend_1.IsNull(_this) || _this.m_Values.length == 0 || _this.m_Keys.length == 0)
                    _resolve(null);
                else {
                    for (var i = 0; i < _this.m_Keys.length; i++) {
                        var keyval = new KeyValuePair(_this.m_Keys[i], _this.m_Values[i]);
                        if (compareFunction(keyval)) {
                            _resolve(keyval.Value);
                            return;
                        }
                    }
                    _resolve(null);
                }
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentDictionary.prototype.Where = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var result = new Array();
                if (GlobalExtend_1.IsNull(_this) || _this.m_Values.length == 0 || _this.m_Keys.length == 0)
                    _resolve(result);
                else {
                    for (var i = 0; i < _this.m_Keys.length; i++) {
                        var keyval = new KeyValuePair(_this.m_Keys[i], _this.m_Values[i]);
                        if (compareFunction(keyval))
                            result.push(keyval.Value);
                    }
                    _resolve(result);
                }
            }, resolve, reject));
            _this._Dispose();
        });
    };
    return ConcurrentDictionary;
}(System_1.OObject));
exports.ConcurrentDictionary = ConcurrentDictionary;
var ConcurrentList = (function (_super) {
    __extends(ConcurrentList, _super);
    function ConcurrentList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_Values = new Array();
        _this.m_Disposeing = false;
        _this.m_LockList = new Queue();
        _this.AfterAdd = new System_1.EventHandlerGeneric();
        _this.AfterRemove = new System_1.EventHandlerGeneric();
        _this.BeforeClear = new System_1.EventHandler();
        _this.AfterClear = new System_1.EventHandler();
        return _this;
    }
    ConcurrentList.prototype._Dispose = function () {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            var w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    };
    ConcurrentList.prototype.GetCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.length);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Add = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.push(item);
                _this.AfterAdd.FireEvent(_this, new System_1.TYEventArgsGeneric(item));
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Remove = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var r = _this.m_Values.Remove(item);
                _this.AfterRemove.FireEvent(_this, new System_1.TYEventArgsGeneric(item));
                _resolve(r);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.RemoveSome = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var delList = new Array();
                _this.ForEach(function (item1, index1) {
                    if (compareFunction(item1))
                        delList.push(item1);
                });
                for (var i = 0; i < delList.length; i++)
                    _this.Remove(delList[i]);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.BeforeClear.FireEvent(_this, System_1.EventArgs.Empty);
                _this.m_Values.Clear();
                _this.AfterClear.FireEvent(_this, System_1.EventArgs.Empty);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.ToArray = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Copy());
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Contains = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Contains(item));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.GetValue = function (index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values[index]);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.IndexOf = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.indexOf(item));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.IndexOfX = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.IndexOfX(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.LastIndexOfX = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.LastIndexOfX(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Default = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Default(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Where = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Where(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.ForEach = function (func) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.ForEach(func);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Replace = function (oldItem, newItem) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Replace(oldItem, newItem));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.GetList = function (indexs) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.GetList(indexs));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Max = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Max(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentList.prototype.Min = function (compareFunction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Min(compareFunction));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    return ConcurrentList;
}(System_1.OObject));
exports.ConcurrentList = ConcurrentList;
var ConcurrentStack = (function (_super) {
    __extends(ConcurrentStack, _super);
    function ConcurrentStack() {
        var _this = _super.call(this) || this;
        _this.m_Values = new Array();
        _this.m_Disposeing = false;
        _this.m_LockList = new Queue();
        return _this;
    }
    ConcurrentStack.prototype._Dispose = function () {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            var w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    };
    ConcurrentStack.prototype.GetCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.length);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.Clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.Clear();
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.Contains = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Contains(item));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.Pop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.shift());
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.Push = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.unshift(item);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.Peek = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                if (_this.m_Values.length > 0)
                    _resolve(_this.m_Values[0]);
                else
                    _resolve(null);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentStack.prototype.ToArray = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var result = new Array();
                for (var i = 0; i < _this.m_Values.length; i++)
                    result.push(_this.m_Values[i]);
                _resolve(result);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    return ConcurrentStack;
}(System_1.OObject));
exports.ConcurrentStack = ConcurrentStack;
var ConcurrentQueue = (function (_super) {
    __extends(ConcurrentQueue, _super);
    function ConcurrentQueue() {
        var _this = _super.call(this) || this;
        _this.m_Values = new Array();
        _this.m_Disposeing = false;
        _this.m_LockList = new Queue();
        return _this;
    }
    ConcurrentQueue.prototype._Dispose = function () {
        if (this.m_Disposeing)
            return;
        this.m_Disposeing = true;
        while (this.m_LockList.Count > 0) {
            var w = this.m_LockList.Dequeue();
            w.Work();
            w.Dispose();
        }
        this.m_Disposeing = false;
    };
    ConcurrentQueue.prototype.GetCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.length);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.Clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.Clear();
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.Contains = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.Contains(item));
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.Dequeue = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _resolve(_this.m_Values.shift());
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.Enqueue = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                _this.m_Values.push(item);
                _resolve();
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.Peek = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                if (_this.m_Values.length > 0)
                    _resolve(_this.m_Values[0]);
                else
                    _resolve(null);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    ConcurrentQueue.prototype.ToArray = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.m_LockList.Enqueue(new ConcurrentLock(function (_resolve, _reject) {
                var result = new Array();
                for (var i = 0; i < _this.m_Values.length; i++)
                    result.push(_this.m_Values[i]);
                _resolve(result);
            }, resolve, reject));
            _this._Dispose();
        });
    };
    return ConcurrentQueue;
}(System_1.OObject));
exports.ConcurrentQueue = ConcurrentQueue;
