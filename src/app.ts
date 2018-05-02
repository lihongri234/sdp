import * as NS from "./Common/NetServiceBase";
import { Wx_SDP_Application } from "./Common/Entitys";
import { Config } from "./Config";
import { IsNull } from "./Library/Common/GlobalExtend";


export class _Application extends Wx_SDP_Application {
    private m_Inited: boolean = false;
    async onShow() {
        // 登录
        // if (this.m_Inited) return;
        // let result = await NS.Login(Config.LoginUrl);
        // this.UnionId = result.UNIONID;
        // this.AfterLogin.FireEvent(this, EventArgs.Empty);
        // console.log("login...,unionid:" + this.UnionId);
        // this.m_Inited = true;
        this.UnionId="test";

        await NS.authen_login(); 
        console.log(Config.MAINKEY);
    }
}

App(new _Application());
