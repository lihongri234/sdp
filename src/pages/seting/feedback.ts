import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class feedbackPage extends Wx_SDPPage {
    public data = {};
    /**
     * 初始化页面教程信息
     *
     * @memberof feedbackPage
     */
    async InitData(options) {
        try {
            wx.showToast({ title: "数据加载中.....", icon: "loading" });
            // 获取用户信息
            // let d = await NS.QueryDynamicsByHot(this.App.UnionId);
            // console.log("d", d);
            // await this._SetData({
            //     Friends: d
            // });
            wx.hideToast();
        } catch (e) {
            this.ShowError(e);
        }
    }
}

Page(new feedbackPage());
