import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class IndexPage extends Wx_SDPPage {
  public data = {
    tabIndex: 0,
    navgatorIndex: 0,
    scrollHeight: 0,
    toView: "",
    placeholdertext: ""
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof IndexPage
   */
  async InitData(options) {
    wx.getSystemInfo({
      success: res => {
        this._SetData({
          scrollHeight: res.windowHeight,
          placeholdertext: "搜索客户名称"
        });
      }
    });
      this._SetData({
        tabIndex: options.type,
        navgatorIndex: options.navigatortype
      });
  }
  //
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
  // 滚动切换标签样式
  switchTab(e) {
    this._SetData({
      tabIndex: e.detail.current
    });
    if (e.detail.current == 0)
      this._SetData({ placeholdertext: "搜索客户名称" });
    else this._SetData({ placeholdertext: "搜索供应商名称" });
  }
  scrolltolower() {}
  SearchHandler() {}
  moveHandler(e) {
    console.log(e);
    let target = e.currentTarget.dataset.opt;
    this._SetData({ toView: target });
  }
}

Page(new IndexPage());
