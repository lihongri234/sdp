import { DateType } from "./Entitys";

/**
 * 获取时间格式 时间转化为几天前,几小时前，几分钟前 刚刚等状态
 *
 * @param {*} d
 * @returns
 */
export let GetDateDiff = (d: any) => {
  // 补全为13位
  // let arrd = (d + "").split("");
  // for (let start = 0; start < 13; start++) {
  //   if (!arrd[start]) arrd[start] = "0";
  // }
  // d = (arrd.join("") as any) * 1;

  let minute: number = 1000 * 60,
    hour: number = minute * 60,
    day: number = hour * 24,
    halfamonth: number = day * 15,
    month: number = day * 30,
    now: number = new Date().getTime(),
    diffValue: number = now - d,
    monthC: number = diffValue / month, // 计算差异时间的量级
    weekC: number = diffValue / (7 * day),
    dayC: number = diffValue / day,
    hourC: number = diffValue / hour,
    minC: number = diffValue / minute,
    date: any = new Date(d);

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) return "不久前";

  // 数值补0方法

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (
      date.getFullYear() +
      "年" +
      Zero(date.getMonth() + 1) +
      "月" +
      Zero(date.getDate()) +
      "日"
    );
  } else if (monthC >= 1) return parseInt(monthC as any) + "月前";
  else if (weekC >= 1) return parseInt(weekC as any) + "周前";
  else if (dayC >= 1) return parseInt(dayC as any) + "天前";
  else if (hourC >= 1) return parseInt(hourC as any) + "小时前";
  else if (minC >= 1) return parseInt(minC as any) + "分钟前";
  return "刚刚";
};

/**
 * 格式化时间 yyyy-mm-dd
 *
 * @param {any} date
 * @returns
 */
export let FormatTime = (date: any, type: number = DateType.JT) => {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    _day = date.getDay(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  if (type == DateType.JT) return [year, month, day].map(Zero).join("-");
  else if (type == DateType.ZT)
    return [year, month, day - 1].map(Zero).join("-");
  else {
    return [year, month, new Date(year, month, 0).getDate()]
      .map(Zero)
      .join("-");
  }
};
/**
 * 日期格式化
 * @param {number} y
 * @param {string} m
 * @param {string} d
 * @param {string} symbol
 * @returns
 */
export let formartDate = (
  y: string,
  m: string,
  d: string,
  symbol: string = "-"
) => {
  m = m.toString()[1] ? m : "0" + m;
  d = d.toString()[1] ? d : "0" + d;
  return y + symbol + m + symbol + d;
};
/**
 * 格式化字段 小于10的字段前面补零
 *
 * @param {number} value
 * @returns
 */
export let Zero = (v: number) => {
  if (v < 10) return "0" + v;
  return v;
};
/**
 * //对字符串进行加密
 *
 * @param {any} code
 * @returns
 */

export let CompileStr = (code: string) => {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
};

/**
 * 字符串进行解密
 *
 * @param {string} code
 * @returns
 */
export let UnCompileStr = (code: string) => {
  code = unescape(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
};
