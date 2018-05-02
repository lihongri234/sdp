import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class ChuRuKuPage extends Wx_SDPPage {
  public data = {
    tabIndex: 0,
    scrollHeight: 0,
    IsShowSlot: false,
    startDate: "请选择",
    endDate: "请选择",
    placeholdertext: "搜索入库单号"
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof ChuRuKuPage
   */
  async InitData(options) {
    wx.getSystemInfo({
      success: res => {
        console.info(res.windowHeight);
        this._SetData({
          scrollHeight: res.windowHeight
        });
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
  // 滚动切换标签样式
  switchTab(e) {
    this._SetData({
      tabIndex: e.detail.current
    });
    if (this.data.tabIndex == 0)
      this._SetData({
        placeholdertext: "搜索入库单号"
      });
    else if (this.data.tabIndex == 1)
      this._SetData({
        placeholdertext: "搜索报损单号"
      });
    else this._SetData({ placeholdertext: "搜索开单单号" });
  }
  scrolltolower() {}
  SoltHandler(e) {
    this._SetData({ IsShowSlot: true });
  }
  CanlerHandler(e) {
    this._SetData({
      IsShowSlot: false
    });
  }
  bindStartDateChange(e) {
    this._SetData({ startDate: e.detail.value });
  }
  bindEndDateChange(e) {
    this._SetData({
      endDate: e.detail.value
    });
  }
}

Page(new ChuRuKuPage());
