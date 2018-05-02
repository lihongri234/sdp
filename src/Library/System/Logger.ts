import { IsNull } from "../Common/GlobalExtend";


function GetLogger(): any {
    if (!IsNull(console))
        return console;
    else
        return null;
}

export var Log = (msg: any): void => {
    let _log = GetLogger();
    if (IsNull(_log))
        return;
    let m = "[" + new Date().Format("hh:mm:ss.S") + "] [INFO] ";
    if (IsNull(msg))
        _log.info( m + msg);
    else
    {
        let msgtype = typeof msg;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.info(m + msg);
        else
        {
            _log.info(m);
            _log.info(msg);
        }
    }        
}

export var Error = (err: any): void => {
    let _log = GetLogger();
    if (IsNull(_log))
        return;
    let m = "[" + new Date().Format("hh:mm:ss.S") + "] [ERROR] ";
    if (IsNull(err))
        _log.error(m + err);
    else {
        let msgtype = typeof err;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.error(m + err);
        else {
            _log.error(m);
            _log.error(err);
        }
    }        
}

export var Debug = (debug: any): void => {
    let _log = GetLogger();
    if (IsNull(_log))
        return;
    let m = "[" + new Date().Format("hh:mm:ss.S") + "] [DEBUG] ";
    if (IsNull(debug))
        _log.log(m + debug);
    else {
        let msgtype = typeof debug;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.log(m + debug);
        else {
            _log.log(m);
            _log.log(debug);
        }
    }        
}

export var Warn = (msg: any): void => {
    let _log = GetLogger();
    if (IsNull(_log))
        return;
    let m = "[" + new Date().Format("hh:mm:ss.S") + "] [WARN] ";
    if (IsNull(msg))
        _log.warn(m + msg);
    else {
        let msgtype = typeof msg;
        if (msgtype == "string" || msgtype == "boolean" || msgtype == "number")
            _log.warn(m + msg);
        else {
            _log.warn(m);
            _log.warn(msg);
        }
    }
}

export var Trace = (obj: any): void => {
    let _log = GetLogger();
    if (IsNull(_log))
        return;
    let m = "[" + new Date().Format("hh:mm:ss.S") + "] [Trace] ";
    _log.log(m);
    _log.trace(obj);
}