import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage, DateType } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate, FormatTime } from "../../Common/Utils";

class IndexPage extends Wx_SDPPage {
  public data = {
    tabIndex: 0,
    scrollHeight: 0,
    DateIndex: 0,
    IsShowSlot: false,
    startDate: "请选择",
    endDate: "请选择"
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof IndexPage
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
  // 滚动切换标签样式
  switchTab(e) {
    this._SetData({
      tabIndex: e.detail.current
    });
  }
  SearchHandler() {}
  SoltHandler(e) {
    this._SetData({
      IsShowSlot: true
    });
  }
  CanlerHandler(e) {
    this._SetData({
      IsShowSlot: false
    });
  }
  bindStartDateChange(e) {
    this._SetData({
      startDate: e.detail.value
    });
  }
  bindEndDateChange(e) {
    this._SetData({
      endDate: e.detail.value
    });
  }
  scrolltolower() {}
  // 长按删除订单
  delHandler(e) {
    wx.showModal({
      title: "提示",
      content: "是否删除该商品？",
      success: res => {
        if (res.confirm) {
          console.log("用户点击确定");
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  }
  SelectDateHandler(e) {
    let index = e.currentTarget.dataset.dateindex;
    this._SetData({
      DateIndex: index
    });
    if (index == 0) {
      console.log("今日时间", FormatTime(new Date()));
    } else if (index == 1) {
      console.log("昨日时间", FormatTime(new Date(), DateType.ZT));
    } else {
      console.log("本月时间", FormatTime(new Date(), DateType.BY));
    }
  }
}

Page(new IndexPage());
