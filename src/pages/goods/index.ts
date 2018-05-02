import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class IndexPage extends Wx_SDPPage {
  public data = {
    IsModel:false,
    tabIndex: 0,
    scrollHeight: 0
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
      wx.showToast({ title: "数据加载中.....", icon: "loading" });
      // 获取用户信息
      // let d = await NS.QueryDynamicsByHot(this.App.UnionId);
      // console.log("d", d);
      // await this._SetData({
      //     Friends: d
      // });
      wx.hideToast();
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

  update(){
    this._SetData({IsModel:true});
  }

  cancel(){
    this._SetData({IsModel:false});
  }
  ClearEvent(){
    return false;
  }

  
}

Page(new IndexPage());
