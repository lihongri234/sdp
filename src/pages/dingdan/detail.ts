import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class DetailPage extends Wx_SDPPage {
    public data = {
        scrollHeight: 0,
        IsShowMore: false
    };
    /**
     * 初始化页面教程信息
     *
     * @memberof DetailPage
     */
    async InitData(options) {
        wx.getSystemInfo({
            success: res => {
                console.info(res.windowHeight);
                this._SetData({ scrollHeight: res.windowHeight });
            }
        });
        try {
            wx.showLoading({ title: "数据加载中.....", icon: "loading" });
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

    MoreHandler(e) {
        this._SetData({ IsShowMore: true });
    }
    CanlerHandler(e) {
        this._SetData({ IsShowMore: false });
    }
    CanlerDingDanHandler() {
        wx.showModal({
            title: "取消订单",
            content: "确定取消此订单么？",
            showCancel: true,
            confirmColor: "#ff683e",
            success: e => {
                if (e.confirm) console.log("用户确定取消订单");
                else console.log("用户取消操作");
            }
        });
    }
    scrolltolower() {}
}

Page(new DetailPage());
