import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull, IsNullOrWhiteSpace } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class AddSupplierPage extends Wx_SDPPage {
    public data = {};
    /**
     * 初始化页面教程信息
     *
     * @memberof AddSupplierPage
     */
    async InitData(options) {}
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
    // 保存供应商信息
    saveHandler(e) {
        console.log(e.detail.value);
        if (IsNullOrWhiteSpace(e.detail.value.suppliername))
            this.ShowError("供应商名称不能为空！");
        else {
            wx.showToast({ title: "保存成功", duration: 2000 });
        }
    }
}

Page(new AddSupplierPage());
