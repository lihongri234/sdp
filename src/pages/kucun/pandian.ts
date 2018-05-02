import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage, DateType } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate, FormatTime } from "../../Common/Utils";

class PanDanPage extends Wx_SDPPage {
  public data = {
    scrollHeight: 0,
    DateIndex: 0,
    IsShowSlot: true
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof PanDanPage
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
  PanDianHandler() {
    wx.showModal({
      title: "开始盘点后",
      content: "将禁止所有产品出入库操作; 在没结束盘点前，盘点数据也会被保存。",
      confirmColor: "#ff683e",
      showCancel: false,
      success: () => {
        console.log("确定");
        wx.navigateTo({ url: "pandianing" });
      }
    });
  }
  SoltHandler(e) {
    if (this.data.IsShowSlot) this._SetData({ IsShowSlot: false });
    else this._SetData({ IsShowSlot: true });
  }
  
  SelectDateHandler(e) {
    let index = e.currentTarget.dataset.dateindex;
    this._SetData({ DateIndex: index });
    if (index == 0) {
      console.log("今日时间",FormatTime(new Date()));
    } else if (index == 1) {
      console.log("昨日时间",FormatTime(new Date(),DateType.ZT));
    } else {
      console.log("本月时间", FormatTime(new Date(), DateType.BY));
    }
  }
}

Page(new PanDanPage());
