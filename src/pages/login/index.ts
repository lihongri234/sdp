import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";
import { decrypt } from "../../Common/DES3";

class IndexPage extends Wx_SDPPage {
    public data = {
        userName: "",
        userPwd: ""
    };
    /**
     * 初始化页面教程信息
     *
     * @memberof IndexPage
     */
    async InitData(options) {}
    // 初始化圈子
    async InitFriends() {
        try {
            wx.showLoading({
                title: "数据加载中.....",
                icon: "loading"
            });
            // 获取用户信息
            // let d = await NS.QueryDynamicsByHot(this.App.UnionId);
            // console.log("d", d);
            // await this._SetData({
            //     Friends: d
            // });
            wx.hideLoading();
        } catch (e) {
            this.ShowError(e);
        }
    }

    async login() {
        try {
            this._SetData({ userName: "18675554726" });
            this._SetData({ userPwd: "123456" });
            if (this.data.userName == "") {
                wx.showToast({ title: "请输入用户名", icon: "none" });
                return;
            }
            if (this.data.userPwd == "") {
                wx.showToast({ title: "请输入密码", icon: "none" });
                return;
            }
            wx.showLoading({
                title: "登录中.....",
                icon: "loading"
            });
            let result = await NS.user_login(
                this.data.userName,
                this.data.userPwd
            );
            wx.hideLoading();
        } catch (e) {
            this.ShowError(e);
        } finally {
            wx.hideLoading();
        }
    }
}

Page(new IndexPage());
