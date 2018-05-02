import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage, DateType } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate, FormatTime } from "../../Common/Utils";

class RuKuDetailPage extends Wx_SDPPage {
  public data = {
    scrollHeight: 0,
    DateIndex: 0,
    IsShowSlot: true,
    IsShowMore: false
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof RuKuDetailPage
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
  scrolltolower() {}
  MoreHandler() {
    this._SetData({ IsShowMore: true });
  }
  CanlerHandler() {
    this._SetData({ IsShowMore: false });
  }
  SelectDateHandler(e) {
    let index = e.currentTarget.dataset.dateindex;
    this._SetData({ DateIndex: index });
    if (index == 0) {
      console.log("今日时间", FormatTime(new Date()));
    } else if (index == 1) {
      console.log("昨日时间", FormatTime(new Date(), DateType.ZT));
    } else {
      console.log("本月时间", FormatTime(new Date(), DateType.BY));
    }
  }
  CanlerRuKuHandler() {
    wx.showModal({
       title:"提示信息",
       content:"确定取消入库么？",
       showCancel: true,
       confirmColor: "#ff683e",
       success: e => {
         if (e.confirm) this.CanlerHandler();
         else this.CanlerHandler();
       }
     });
  }
}

Page(new RuKuDetailPage());
