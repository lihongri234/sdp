import { WX_request } from "../../Common/NetServiceBase";
import * as NS from "../../Common/NetServices";
import { IsNull } from "../../Library/Common/GlobalExtend";
import { Wx_SDPPage } from "../../Common/Entitys";
import { Config } from "../../Config";
import { Log } from "../../Library/System/Logger";
import { formartDate } from "../../Common/Utils";

class IndexPage extends Wx_SDPPage {
    private p_audioCtx = null;
    public data = {
        current: 0, //当前选择的商品
        pageIndex: 1, //页码
        pageSize: 10, //页数
        goodsList: [], //商品列表
        audioCtx: null,
        audioUrl: "",
        IsOperat: false, //更多操作
        IsSearch: false, //是否搜索
        IsEditAmount: false, //是否修改价格
        IsSettleAccounts: false, //是否其他支付
        Isatvice: 2, //1.选择价格，2.选择数量
        SumMoney: 0, //总价
        preferential: 0, //优惠
        PriceStr: "0", //价格
        QuantityStr: "0" //数量
    };
    /**
     * 初始化页面教程信息
     *
     * @memberof IndexPage
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
    async onLoad() {
        let list = [];
        for (let i = 0; i < 10; i++) {
            list.push({
                id: i,
                name: "新疆小核桃" + i,
                unit: "2kg/包",
                standard: "80",
                origin: "吐鲁番",
                brandName: "样品",
                price: 100.0,
                qty: 0,
                isAtvice: false
            });
        }

        this._SetData({ goodsList: list });
    }

    //更多操作
    Operating() {
        if (this.data.IsOperat) {
            this._SetData({ IsOperat: false });
        } else {
            this._SetData({ IsOperat: true });
        }
    }
    //显示搜索
    ShowSearch() {
        this._SetData({ IsSearch: true });
    }
    //隐藏搜索
    HiedwSearch() {
        this._SetData({ IsSearch: false });
    }
    //选择商品
    selectGoods(event) {
        console.log(event);
        let index = event.currentTarget.dataset.id;
        console.log(index);
        let list = this.data.goodsList;
        for (let i = 0; i < list.length; i++) {
            list[i].isAtvice = false;
        }
        list[index].isAtvice = true;
        this._SetData({ current: index });
        this._SetData({ PriceStr: list[index].price + "" });
        this._SetData({ QuantityStr: list[index].qty + "" });
        this._SetData({ goodsList: list });
    }

    //修改金额
    EditAmount() {
        this._SetData({ IsEditAmount: true });
    }
    //取消
    cancelAmount() {
        this._SetData({ IsEditAmount: false });
    }
    //其它支付
    SettleAccounts() {
        this._SetData({ IsSettleAccounts: true });
    }
    //取消
    cancelSettleAccounts() {
        this._SetData({ IsSettleAccounts: false });
    }
    //选择价格
    FocusHandler(event) {
        this._SetData({ Isatvice: event.target.dataset.id });
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
                    str = this.data.PriceStr.substring(
                        0,
                        this.data.PriceStr.length - 1
                    );
                } else {
                    str = "0";
                }
            } else {
                //.只能有一个
                if (num == ".") {
                    if (this.data.PriceStr.indexOf(".") == -1)
                        str =
                            this.data.PriceStr == "0"
                                ? "0" + num
                                : this.data.PriceStr + num;
                } else {
                    str =
                        this.data.PriceStr == "0"
                            ? num
                            : this.data.PriceStr + num;
                }
            }
            //校验长度
            if (patt.test(str)) {
                await this._SetData({ PriceStr: str });
            }
        } else {
            //数量
            if (num == "del") {
                if (this.data.QuantityStr.length > 1) {
                    str = this.data.QuantityStr.substring(
                        0,
                        this.data.QuantityStr.length - 1
                    );
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
                        this.data.QuantityStr == "0"
                            ? num
                            : this.data.QuantityStr + num;
                }
            }

            if (patt.test(str)) {
                await this._SetData({ QuantityStr: str });
            }
        }

        let list = this.data.goodsList;
        list[this.data.current].price = parseInt(this.data.PriceStr);
        list[this.data.current].qty = parseInt(this.data.QuantityStr);
        let sumMoney = 0;
        for (let i = 0; i < list.length; i++) {
            sumMoney += list[i].price * list[i].qty;
        }
        this._SetData({ SumMoney: sumMoney });
        this._SetData({ goodsList: list });
    }
}

Page(new IndexPage());
