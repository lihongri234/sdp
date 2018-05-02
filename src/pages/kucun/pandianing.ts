import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class PanDaningPage extends Wx_SDPPage {
  public data = {
    scrollHeight: 0,
    IsShowPanDian: false,
    IsActive: false,
    IsActive2: false,
    IsShowDingDan: false,
    NameValue: ""
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof PanDaningPage
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
  SearchHandler() {}
  scrolltolower() {}
  FocusHandler() {
    this._SetData({ IsActive: true });
  }
  BlurHandler() {
    this._SetData({ IsActive: false });
  }
  FocusHandler2() {
    this._SetData({ IsActive2: true });
  }
  BlurHandler2() {
    this._SetData({ IsActive2: false });
  }
  PanDianHandler(e) {
    let name = e.currentTarget.dataset.item;
    this._SetData({ IsShowPanDian: true, NameValue: name });
  }
  EndPanDianHandler() {
    wx.showModal({
      title: "结束盘点后",
      content: "盘点数量会更新原有库存， 提交后无法修改。",
      confirmColor: "#ff683e",
      showCancel: false,
      success: () => {
        console.log("确定");
        wx.navigateTo({ url: "pandianing" });
      },
      fail: () => { console.log("取消");}
    });
  }
  CanlerHandler(e) {
    this._SetData({
      IsShowPanDian: false
    });
  }
  ConfrimHandler(e) {
    this._SetData({ IsShowPanDian: true });
  }
}

Page(new PanDaningPage());
