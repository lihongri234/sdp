import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class addPage extends Wx_SDPPage {
  public data = {
    IsModel:false,
    IsaddCategory:false
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof addPage
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

  selectCategory(){
    this._SetData({IsModel:true});
  }

  addCategory(){
    this._SetData({IsaddCategory:true});
  }
  saveCategory(){
    this._SetData({IsaddCategory:false});
  }


  add(){
    wx.showModal({
        title: '提示',
        content: '添加成功',
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

Page(new addPage());
