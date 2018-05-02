import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class MonthPage extends Wx_SDPPage {
  private p_month;
  private p_monthArr = [];
  public data = {
    monthArr: [],
    month: 0,
    date: "请选择",
    IsShowMonth: false,
    width: 0
  };
  /**
   * 初始化页面教程信息
   *
   * @memberof MonthPage
   */
  async InitData(options) {
    wx.getSystemInfo({
      success: res => {
        console.info(res.windowWidth);
        this._SetData({ width: res.windowWidth });
      }
    });
    await this.InitMonth();
    await this.check();
    this.init();
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
  InitMonth() {
    let curDate = new Date();
    this.p_month = curDate.getMonth();
    this.p_month++;
    for (let i = this.p_month; i < this.p_month + 6; i--) {
      if (i < 1) {
        return;
      } else {
        this.p_monthArr.push(i);
        this._SetData({ monthArr: this.p_monthArr });
      }
    }
  }
  check() {
    if (this.data.monthArr.length <= 3) this.p_monthArr.push(12, 11, 10);
    else if (this.data.monthArr.length <= 4) this.p_monthArr.push(12, 11);
    else if (this.data.monthArr.length <= 5) this.p_monthArr.push(12);
    this._SetData({ monthArr: this.p_monthArr, month: this.p_month });
  }
  selectMonth(e) {
    let index = e.currentTarget.dataset.index;
    if (!IsNull(index)) {
      let item = this.data.monthArr[index];
      this._SetData({
        month: item
      });
      console.log("月份", item);
    }
  }
  bindDateChange(e) {
    this._SetData({ date: e.detail.value });
  }
  Cheak() {
    if (this.data.IsShowMonth) this._SetData({ IsShowMonth: false });
    else this._SetData({ IsShowMonth: true });
  }
  ConfrimHandler() {
    this.Cheak();
  }
  drawCircle(ctx, data_arr, color_arr, text_arr) {
    let radius = this.data.width / 2 - 90; //半径
    console.log("radius", radius);

    let ox = radius + 90,
      oy = radius + 40; //圆心

    let width = 30,
      height = 10; //图例宽和高
    let posX = 20,
      posY = 5; //
    let textX = posX + width+10 ,
      textY = posY +5;

    let startAngle = 0; //起始弧度
    let endAngle = 0; //结束弧度
    if (data_arr.length == 0) {
      ctx.beginPath();
      ctx.fillStyle = "#999";
      ctx.moveTo(ox, oy); //移动到到圆心
      ctx.arc(ox, oy, radius, startAngle, Math.PI * 2, false);
      ctx.fill();
    } else {
      for (let i = 0; i < data_arr.length; i++) {
        //绘制饼图
        ctx.beginPath();
        endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度
        ctx.fillStyle = color_arr[i];
        ctx.moveTo(ox, oy); //移动到到圆心
        ctx.arc(ox, oy, radius, startAngle, endAngle, false);
        startAngle = endAngle; //设置起始弧度
        //绘制比例图及文字
        ctx.setLineWidth(2);
        ctx.fillStyle = color_arr[i];
        ctx.fillRect(posX, posY + 20 * i, width, height);
        ctx.moveTo(posX + 300 * i, posY + 270 * i);
        ctx.setFontSize(14); 
        ctx.setTextBaseline("middle");
        ctx.fillStyle = color_arr[i];
        let percent = text_arr[i] + "：" + 100 * data_arr[i] + "%";
        ctx.fillText(percent, textX, textY + 20 * i);
        ctx.fill();
      }
    }
    // 中心圆点
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(ox, oy); //移动到到圆心
    ctx.arc(ox, oy, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.draw();
  }

  init() {
    //绘制饼图
    //比例数据和颜色
    let ctx = wx.createCanvasContext("Canvas");
    console.log("ctx", ctx);
    let min = Math.min.apply(null, [1, 10]);
    let max = Math.max.apply(null, [1, 10]);
    console.log("min",min);
    console.log("max",max);
    
    let data_arr = [0.1, 0.9];
    let color_arr = ["#18cebd", "#ff683e"];
    let text_arr = ["挂账", "已支付"];
    this.drawCircle(ctx, data_arr, color_arr, text_arr);
  }
}

Page(new MonthPage());
