// 全局域名
let host = "https://wxapp.cainongxinxi.com";
// 接口公共地址
let app = "admin/trade";

export let Config = {
  //访问渠道
  visitChannel: 2,
  //终端编号
  authencode: "appsc",
  //接口通用配置
  commonargs: "authencode=appsc&visitChannel=2",
  //终端密码
  password: "npsq@app25465",
  //数据钥匙
  DES3KEY: "FE9B2BCB5BE68APP76T3A9I5",
  //主Key
  MAINKEY: "",
  //过期时间
  expiretime: new Date(),
  //通用接口地址
  GatewayUrl: `${host}/${app}`
};
