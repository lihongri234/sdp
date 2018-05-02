import { EventArgs, EventHandler, OObject } from "../Library/System/System";
import { IsNull } from "../Library/Common/GlobalExtend";
import { Wx_Page, Wx_Application } from "./EntityBase";

export class Wx_SDP_Application extends Wx_Application {}

/**
 * 小程序生命周期
 *
 * @export
 * @class Wx_SDPPage
 * @extends {Wx_Page}
 */
export class Wx_SDPPage extends Wx_Page {
  App: Wx_SDP_Application = null;
}
/**
 * 时间选择 今天 昨天 本月
 *
 * @export
 * @enum {number}
 */
export enum DateType {
  /**
   * 今天
   */
  JT = 0,
  /**
   * 昨天
   */
  ZT = 1,
  /**
   *本月
   */
  BY = 2
}
/**
 * 收款方式 现金 微信 支付宝 银联
 *
 * @export
 * @enum {number}
 */
export enum ReceivablesType {
  /**
   * 现金
   */
  XJ = 0,
  /**
   * 微信
   */
  WX = 1,
  /**
   * 支付宝
   */
  ZFB = 2,
  /**
   * 银联
   */
  YL = 3
}

// ========数据库========//
// export class AllTag extends OObject {
//     ID: number;
//     TAGNAME: string;
//     ICONURL: string;
//     SORT: number;
// }

// // ========界面绑定========//
// export class V_AllTag extends OObject {
//   ID: number;
//   TAGNAME: string;
//   ICONURL: string;
//   SORT: number;
// }
