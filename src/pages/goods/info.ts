import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class infoPage extends Wx_SDPPage {
  public data = {
    IsModel:false
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof infoPage
   */
  async InitData(options) {
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

  /*
  更多操作
  */
  more(){
    this._SetData({IsModel:true});
  }

  delete(){
    wx.showModal({
        title: '提示',
        content: '是否删除该商品？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  }

  updateStatus(){
    wx.showModal({
        title: '提示',
        content: '是否下架该商品？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  }
  
}

Page(new infoPage());
