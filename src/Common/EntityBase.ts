import {EventHandler, OObject, EventArgs }from "../Library/System/System"; 
import {IsNullOrWhiteSpace }from "../Library/Common/GlobalExtend"; 

export class Wx_Application extends OObject {
  // 内存数据维护
  public UnionId:string = ""; 
  public AfterLogin:EventHandler = new EventHandler(); 

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   *
   * @memberof Wx_Application
   */
  async onLanunch() {}

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   *
   * @memberof Wx_Application
   */
  async onShow() {}

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   *
   * @memberof Wx_Application
   */
  async onHide() {}

  /**
   * 错误监听函数
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   *
   * @memberof Wx_Application
   */
  async onError() {}
}

export class Wx_Page extends OObject {
  private m_ShowCount = 0; 

  App:Wx_Application = null; 

  /**
   * 生命周期函数--页面加载
   *
   * @memberof Wx_Page
   */
  async onLoad(options) {
    this.App = getApp()as any; 
    if (IsNullOrWhiteSpace(this.App.UnionId))
      this.App.AfterLogin.AddEventListener((s, e) =>  {
        this.InitData(options); 
      }); 
    else this.InitData(options); 
    //console.log("onload");
  }

  /**
   * 生命周期函数--页面初次渲染完成
   *
   * @memberof Wx_Page
   */
  async onReady() {
    //console.log("onReady");
  }

  /**
   * 生命周期函数--页面显示
   *
   * @memberof Wx_Page
   */
  async onShow() {
    //console.log("onShow");
    this.m_ShowCount++; 
    if (this.m_ShowCount > 1)await this.onShowAgain(); 
  }

  async onShowAgain() {}

  /**
   * 生命周期函数--页面隐藏
   *
   * @memberof Wx_Page
   */
  async onHide() {
    //console.log("onHide");
  }

  /**
   * 生命周期函数--页面卸载
   *
   * @memberof Wx_Page
   */
  async onUnload() {}

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   *
   * @memberof Wx_Page
   */
  async onPullDownRefresh() {}

  /**
   * 页面上拉触底事件的处理函数
   *
   * @memberof Wx_Page
   */
  async onReachBottom() {}

  /**
   * 用户点击右上角转发
   *
   * @memberof Wx_Page
   */
  async onShareAppMessage(res) {}

  /**
   * 页面滚动触发事件的处理函数
   *
   * @memberof Wx_Page
   */
  async onPageScroll() {}

  /**
   * 将数据从逻辑层发送到视图层（异步），同时改变对应的  this.data  的值（同步）。
   *
   * @param {*} data
   * @param {() => void} callback
   * @memberof Wx_Page
   */
  _SetData(data:any):Promise < void >  {
    return new Promise < void > ((resolve, reject) =>  {
      try {
        (this as any).setData(data, () =>  {
          resolve(); 
        }); 
      }catch (e) {
        reject(e); 
      }
    }); 
  }
  ShowError(err):void {
    wx.showModal( {
      title:"提示信息", 
      content:err.toString(), 
      showCancel:false
    }); 
  }

  BuildingHandler():void {
    wx.showModal( {
      title:"提示", 
      content:"此功能正在拼命开发中 敬请期待！", 
      showCancel:false
    }); 
  }

  CallPhone(e) {
    const phone = e.currentTarget.dataset.phone; 
    wx.makePhoneCall( {phoneNumber:phone }); 
  }

  ShowTab(e) {
    const index = e.currentTarget.dataset.tabindex; 
    this._SetData( {tabIndex:index }); 
  }

  async InitData(options) {}
}
