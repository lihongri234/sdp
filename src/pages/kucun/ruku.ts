import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class RuKunPage extends Wx_SDPPage {
  private p_year;
  private p_month;
  private p_date;
  private p_day;
  public data = {
    dayArr: [],
    day: 0,
    fulldata: "",
    isgray: true,
    isshowdate: false,
    Type: 0
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof RuKunPage
   */
  async InitData(options) {
    if (options.type == 0) this._SetData({ Type: 0 });
    else this._SetData({ Type: 1 });
    this.InitDay();
  }
  // 初始化圈子
  async InitFriends() {
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
  InitDay() {
    let curDate = new Date();
    this.p_year = curDate.getFullYear();
    this.p_month = curDate.getMonth();
    this.p_date = curDate.getDate();
    this.p_day = curDate.getDay();

    this.InitDate();
  }
  InitDate() {
    let fullDay = new Date(this.p_year, this.p_month + 1, 0).getDate(), //当月总天数
      startWeek = new Date(this.p_year, this.p_month, 1).getDay(); //当月第一天是周几
    let arr = [];
    for (let j = 0; j < startWeek; j++) {
      arr.unshift("");
    }
    for (let i = 1; i <= fullDay; i++) {
      arr.push(i);
    }
    this._SetData({
      dayArr: arr,
      day: this.p_date,
      fullData: formartDate(this.p_year, this.p_month + 1, this.p_date, "-")
    });
  }
  selectday(e) {
    let index = e.currentTarget.dataset.index;
    if (!IsNull(index)) {
      let item = this.data.dayArr[index];
      this._SetData({
        day: item,
        fullData: formartDate(this.p_year, this.p_month + 1, item, "-")
      });
    }
  }
  nextMonth() {
    if (this.p_month + 1 > 11) {
      this.p_year += 1;
      this.p_month = 0;
    } else {
      if (this.p_month == new Date().getMonth()) {
        this.p_month = this.p_month;
        this.ShowError("最迟只能选这个月的日期！");
        this._SetData({ isgray: true });
      } else {
        this.p_month += 1;
        this._SetData({ isgray: false });
      }
    }
    this.InitDate();
  }
  prevMonth() {
    if (this.p_month - 1 < 0) {
      this.p_year -= 1;
      this.p_month = 11;
    } else {
      this.p_month -= 1;
    }
    this._SetData({ isgray: false });
    this.InitDate();
  }
  selectHandler() {
    if (this.data.isshowdate) this._SetData({ isshowdate: false });
    else this._SetData({ isshowdate: true });
  }
}

Page(new RuKunPage());
