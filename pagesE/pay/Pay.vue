<template>
  <view>
    <view v-if="show">
      <view class="top"></view>
      <u-cell-group title="请确认支付信息">
        <u-cell-item :arrow="false" title="支付金额" icon="bill">
          <label style="color:#ee0a24">¥ {{(info.money/100).toFixed(2)}}</label>
        </u-cell-item>
        <u-cell-item :arrow="false" title="订单号" :value="info.number" />
        <u-cell-item :arrow="false" title="产品名称" :value="info.info" />
        <u-cell-item :arrow="false" title="收款方" value="中国心理网" />
        <u-cell-item :arrow="false" title="时间" :value="info.datetime" />
        <u-cell-item :arrow="false" title="付款人" :value="info.name" />
        <u-cell-item :arrow="false" title="手机号" :value="info.mobile" />
      </u-cell-group>
      <!-- // todo <NoticeBar v-if="notpay" left-icon="smile-o" :scrollable="false" text="提示：内测单位会跳过支付过程，默认为支付成功，直接进入到下一步操作。" wrapable /> -->
      <view class="action">
        <u-button type="success" :loading="loading" block @click="ok">
          <u-icon name="weixin-fill"></u-icon>确认付款
        </u-button>
        <u-button class="cancleBtn" block @click="cancel">取消</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Pay",
  data() {
    const user = uni.getStorageSync("user");
    return {
      user,
      // notpay: user.unit === 1,
      notpay: false,
      show: false,
      info: {},
      loading: false,
      code: "",
      type: "JSAPI",
      // MWEB方式支付后返回时，finish=1
      finish: "",
      applet_openid: "" /* 动态获取的openid */
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // #ifdef MP-WEIXIN
      const pay = uni.getStorageSync("pay");
      if (pay) {
        if (this.$number.decrypt(pay.money_verify) === String(pay.money)) {
          if (pay.redirect) {
            // 补充信息后再次存入store
            const now = new Date();
            Object.assign(pay, {
              number:
                pay.number ||
                now.format("yyyyMMddhhmmss") +
                  Math.random()
                    .toString()
                    .slice(-3, -1),
              datetime: pay.datetime || now.format("yyyy-MM-dd hh:mm:ss"),
              name: this.user.name,
              mobile: this.user.mobile
            });
            uni.setStorage({ key: "pay", data: pay });
            this.info = pay;
            this.show = true;
          } else {
            uni.showToast({ title: "页面跳转地址缺失", icon: "none" });
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          }
        } else {
          uni.showToast({ title: "付款金额验证失败", icon: "none" });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }
      } else {
        uni.showToast({ title: "丢失参数，请返回重试", icon: "none" });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }
      // #endif
    },

    // 取消
    cancel() {
      const pay = uni.getStorageSync("pay");
      uni.removeStorageSync("pay");
      if (pay && pay.backurl) {
        uni.redirectTo({ url: pay.backurl });
      } else {
        uni.navigateBack();
      }
    },

    // 统一下单
    unifiedorder() {
      let _this = this;
      const params = {
        type: this.type,
        number: this.info.number,
        money: this.info.money,
        money_verify: this.info.money_verify,
        info: this.info.info,
        openid: this.applet_openid,
        product: this.info.product,
        appid: this.$global.weixinAppId /* 小程序appid */
      };
      this.loading = true;
      console.log(params, "params");
      this.$http("/wx/pay/unifiedorder", params, "post").then(json => {
        if (json.code == 0) {
          console.log(json);
          let payInfo = json.data;
          /** 调起支付 */
          uni.requestPayment({
            provider: "wxpay",
            timeStamp: payInfo.timeStamp,
            nonceStr: payInfo.nonceStr,
            package: payInfo.package,
            signType: payInfo.signType,
            paySign: payInfo.paySign,
            success: function(res) {
              console.log("success:" + JSON.stringify(res));
              /** 查单 */
              uni.showLoading();
              _this.$http("/wx/pay/checksuccess", { number: _this.info.number }).then(json => {
                uni.hideLoading();
                if (json.code === 0) {
                  // 成功后重定向
                  uni.removeStorageSync("pay");
                  console.log(_this.info.redirect, "外链");
                  uni.showModal({
                    content: "答题开始后，请勿中途退出。",
                    showCancel: false,
                    success: res => {
                      if (res.confirm) {
                        /** _this.info.redirect 是测试的外网链接都是要去 webview */
                        /** webview */
                        uni.navigateTo({
                          url: `/pagesA/out/out?url=${encodeURIComponent(JSON.stringify(_this.info.redirect))}`
                        });
                      }
                    }
                  });
                } else if (json.code === 1) {
                  uni.showModal({ content: "订单（" + _this.info.number + "）未找到", showCancel: false });
                } else if (json.code === 2) {
                  uni.showModal({ content: "订单（" + _this.info.number + "）未支付成功", showCancel: false });
                }
              });
            },
            fail: function(err) {
              uni.showModal({
                content: "订单（" + _this.info.number + "）支付失败了，您还可以重新支付",
                showCancel: false,
                success: res => {
                  _this.loading = false;
                }
              });
            }
          });
        }
      });
    },
    // 点击了支付按钮
    ok() {
      if (this.notpay) {
        let _this = this;
        uni.showToast({ title: "支付成功", icon: "success" });
        setTimeout(() => {
          uni.removeStorageSync("pay");
          uni.showModal({
            content: "答题开始后，请勿中途退出。",
            showCancel: false,
            success: res => {
              /** _this.info.redirect 是测试的外网链接都是要去 webview */
              /** webview */
              uni.navigateTo({
                url: `/pagesA/out/out?url=${encodeURIComponent(JSON.stringify(_this.info.redirect))}`
              });
            }
          });
        }, 1500);
      } else {
        new Promise((resolve, reject) => {
          uni.login({
            provider: "weixin",
            success: res => {
              console.log(res.code, "微信code");
              this.code = res.code;
              resolve();
            },
            fail: res => {
              reject("获取用户信息失败");
            }
          });
        })
          .then(() => {
            /** 获取用户openid */
            this.$http("/mp/code2session", { code: this.code }).then(json => {
              this.applet_openid = json.data.openid;
              this.unifiedorder();
            });
          })
          .catch(res => {});
      }
    }
  }
};
</script>

<style lang="scss">
.top {
  height: 130px;
  background: url(//i1.sinaimg.cn/gm/2014/1031/U11240P115DT20141031110721.jpg) center center/cover;
}
.action {
  padding: 15px;
  .cancleBtn {
    .u-btn {
      margin-top: 10px;
    }
  }
}
</style>