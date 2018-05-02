import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class RuKun2Page extends Wx_SDPPage {
    private p_audioCtx = null;
    public data = {
      audioCtx: null,
      audioUrl: "",
      IsSearch:false, //是否搜索
      IsConfirmStorage:false, //是否显示入库
      Isatvice: 2, //1.选择价格，2.选择数量
      PriceStr: "0", //价格
      QuantityStr: "0" //数量
    };
    /**
     * 初始化页面教程信息
     *
     * @memberof RuKun2Page
     */
    async InitData(options) {}
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
    async onReady() {
      this.p_audioCtx = wx.createAudioContext("numAudio");
    }
  

  //显示搜索 
  ShowSearch(){
    this._SetData({ IsSearch: true });
  }
  //隐藏搜索 
  HiedwSearch(){
    this._SetData({ IsSearch: false });
  }
    //选择商品
    selectGoods(e) {
      console.log(e);
    }
  
    //选择价格
    FocusHandler(event) {
      this._SetData({ Isatvice: event.target.dataset.id });
    }
    //显示确认入库
    ShowConfirmStorage(){
      this._SetData({ IsConfirmStorage: true });
    }
    //隐藏确认入库
    HiedConfirmStorage(){
      this._SetData({ IsConfirmStorage: false });
    }
    //确认入库
    ConfirmStorage(){
      wx.showLoading({
        title: '数据加载中',
      });

      setTimeout(function(){
        wx.hideLoading()
      },3000)
    }
  
    //数量键盘
    async NumberClick(event) {
      var num = event.currentTarget.dataset.num;
      //播放
      let url = "../../audio/" + num + ".wav";
      if (num == ".") {
        url = "../../audio/dot.wav";
      }
      await this._SetData({ audioUrl: url });
      console.log(this.data.audioUrl);
      await this.p_audioCtx.play();
  
      let str = "";
      let patt = /^(\d{1,5}|\d{1,5}.|\d{1,5}.\d{1,2})$/;
      if (this.data.Isatvice == 1) {
        //删除
        if (num == "del") {
          if (this.data.PriceStr.length > 1) {
            str = this.data.PriceStr.substring(0, this.data.PriceStr.length - 1);
          } else {
            str = "0";
          }
        } else {
          //.只能有一个
          if (num == ".") {
            if (this.data.PriceStr.indexOf(".") == -1)
              str = this.data.PriceStr == "0" ? "0" + num : this.data.PriceStr + num;
          } else {
            str = this.data.PriceStr == "0" ? num : this.data.PriceStr + num;
          }
        }
        //校验长度
        if(patt.test(str))
        {
          await this._SetData({ PriceStr: str });
        }
  
      } else {
        //数量
        if (num == "del") {
          if (this.data.QuantityStr.length > 1) {
            str = this.data.QuantityStr.substring(0, this.data.QuantityStr.length - 1);
          } else {
            str = "0";
          }
        } else {
          if (num == ".") {
            if (this.data.QuantityStr.indexOf(".") == -1)
              str =
                this.data.QuantityStr == "0"
                  ? "0" + num
                  : this.data.QuantityStr + num;
          } else {
            str =
              this.data.QuantityStr == "0" ? num : this.data.QuantityStr + num;
          }
        }
  
        if(patt.test(str))
        {
          await this._SetData({ QuantityStr: str });
        }
        
      }
    }
  }
  
  Page(new RuKun2Page());
  