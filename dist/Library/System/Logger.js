"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalExtend_1 = require("../Common/GlobalExtend");
function GetLogger() {
    if (!GlobalExtend_1.IsNull(console))
        return console;
    else
        return null;
}
exports.Log = function (msg) {
    var _log = GetLogger();
    if (GlobalExtend_1.IsNull(_log))
        return;
    var m = "[" + new Date().Format("hh:mm:ss.S") + "] [INFO] ";
    if (GlobalExtend_1.IsNull(msg))
        _log.info(m + msg);
    else {
        var msgtype = typeof msg;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.info(m + msg);
        else {
            _log.info(m);
            _log.info(msg);
        }
    }
};
exports.Error = function (err) {
    var _log = GetLogger();
    if (GlobalExtend_1.IsNull(_log))
        return;
    var m = "[" + new Date().Format("hh:mm:ss.S") + "] [ERROR] ";
    if (GlobalExtend_1.IsNull(err))
        _log.error(m + err);
    else {
        var msgtype = typeof err;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.error(m + err);
        else {
            _log.error(m);
            _log.error(err);
        }
    }
};
exports.Debug = function (debug) {
    var _log = GetLogger();
    if (GlobalExtend_1.IsNull(_log))
        return;
    var m = "[" + new Date().Format("hh:mm:ss.S") + "] [DEBUG] ";
    if (GlobalExtend_1.IsNull(debug))
        _log.log(m + debug);
    else {
        var msgtype = typeof debug;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.log(m + debug);
        else {
            _log.log(m);
            _log.log(debug);
        }
    }
};
exports.Warn = function (msg) {
    var _log = GetLogger();
    if (GlobalExtend_1.IsNull(_log))
        return;
    var m = "[" + new Date().Format("hh:mm:ss.S") + "] [WARN] ";
    if (GlobalExtend_1.IsNull(msg))
        _log.warn(m + msg);
    else {
        var msgtype = typeof msg;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.warn(m + msg);
        else {
            _log.warn(m);
            _log.warn(msg);
        }
    }
};
exports.Trace = function (obj) {
    var _log = GetLogger();
    if (GlobalExtend_1.IsNull(_log))
        return;
    var m = "[" + new Date().Format("hh:mm:ss.S") + "] [Trace] ";
    _log.log(m);
    _log.trace(obj);
};
