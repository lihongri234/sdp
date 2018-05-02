import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class DetailPage extends Wx_SDPPage {
  public data = {
    tabIndex: 0,         //用于切换tab的索引
    scrollHeight: 0,     //滚动区域的高度
    IsShowQingKun: false,//是否显示清款弹出层
    IsShowCuiKun: false, //是否显示催款弹出层
    IsShowSlot: false,   //是否显示筛选框弹出层
    IsActive: false,     //当前是否选中清款金额
    IsActive2: false,    //当前是否选中其他金额
    IsShowDingDan: false,//是否显示订单号
    startDate: "请选择",  //开始时间
    endDate: "请选择"     //结束时间
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
    finally{
      wx.hideLoading();
    }
  }
  // 滚动切换标签样式
  switchTab(e) {
    this._SetData({
      tabIndex: e.detail.current
    });
  }
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
  CuiKuan(e) {
    this._SetData({ IsShowCuiKun: true });
  }
  QingKuan(e) {
    let type = e.currentTarget.dataset.type;
    if (IsNull(type)) {
      this._SetData({ IsShowQingKun: true, IsShowDingDan: true });
    } else this._SetData({ IsShowQingKun: true, IsShowDingDan: false });
  }
  AllQingKun(e) {}
  CanlerHandler(e) {
    this._SetData({
      IsShowQingKun: false,
      IsShowSlot: false,
      IsShowCuiKun: false
    });
  }
  ConfrimHandler(e) {
    this._SetData({ IsShowQingKun: true });
  }
  SoltHandler(e) {
    this._SetData({ IsShowSlot: true });
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

Page(new DetailPage());
