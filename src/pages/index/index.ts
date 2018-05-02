import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage, DateType } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate, FormatTime } from "../../Common/Utils";
class IndexPage extends Wx_SDPPage {
  public data = {};
  /**
   * 初始化页面教程信息
   *
   * @memberof IndexPage
   */
  async InitData(options) {
    console.log("今天", FormatTime(new Date(), DateType.JT));
    console.log("昨天", FormatTime(new Date(), DateType.ZT));
    console.log("本月", FormatTime(new Date(), DateType.BY));
  }
  // 初始化圈子
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
}

Page(new IndexPage());
