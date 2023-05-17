<template>
  <view>
    <hx-navbar :config="{back:false}" />
    <u-cell-item icon="label" title="个人资料" @click="$navigateTo('/pagesB/MyInfo')" />
    <u-cell-item icon="card" title="身份证信息" @click="$navigateTo('/pagesB/IdCard')" />
    <u-cell-item v-if="user.weixin_unionid" icon="chat" title="绑定微信" value="已绑定，点击解绑" @click="unBindWeixin" />
    <u-cell-item v-else icon="chat" title="绑定微信" label="绑定后支持PC端微信扫码登录" @click="bindWeixin" />
    <u-cell-item icon="manager" title="退出登录" @click="logout" />
    <u-cell-item icon="exchange" title="切换医院" @click="handleSwitch" />
    <view>
      <Qrcode class="qrcode" ref="qrcode" :text="qrcodeText" />
    </view>
    <view class="qrcode-msg">{{`向${unit.lang_patient}出示二维码，${unit.lang_patient}可自由选择量表进行测评，请医生及时查看测评报告。`}}</view>
    <MyTabbar :active="3" />
  </view>
</template>

<script>
import MyTabbar from "./MyTabbar";
import Qrcode from "../components/qrcode";
import hxNavbar from "@/components/hx-navbar/hx-navbar";

export default {
  name: "DoctorMy",
  components: { MyTabbar, Qrcode, hxNavbar },
  data() {
    return {
      user: uni.getStorageSync("user"),
      code: "",
      qrcodeText: "" /* 二维码地址 */,
      unit: uni.getStorageSync("unit")
    };
  },
  onLoad(option) {
    this.user = uni.getStorageSync("user");
    this.code = option.code;
    this.checkRole();
  },
  onReady() {
    this.qrcodeText = `https://h.psy.com.cn/?mp=1&type=3&unit=${this.user.unit}&doctor=${this.user.id}`;
    /* // todo 二维码 */
    // this.qrcodeText = `https://h.psy.com.cn/?mp=1&type=3&unit=1&doctor=1`;
    console.log("显示二维码", this.qrcodeText);
    setTimeout(() => {
      this.$refs.qrcode._makeCode();
    }, 100);
  },
  methods: {
    // 检查账户状态和角色
    checkRole() {
      const fail = message => {
        uni.showToast({
          title: message,
          icon: "none",
          duration: 600,
          complete: () => {
            uni.removeStorageSync("user");
            let param = { unit: this.user.unit };
            uni.navigateTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
          }
        });
      };
      if (this.user.status !== 1) {
        fail("账户未审核或被禁用");
      } else if (this.user.role !== 1) {
        fail("角色不是医生");
      }
    },
    /** 切换医院 */
    handleSwitch() {
      uni.showModal({
        content: "你确定要切换医院吗？该操作将使你重新登录",
        success: res => {
          if (res.confirm) {
            uni.clearStorage();
            uni.redirectTo({ url: `/pages/index/index` });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 重定向微信获取code
    wechatRedirect() {
      // const url =
      //   "https://open.weixin.qq.com/connect/oauth2/authorize" +
      //   "?appid=" +
      //   AppID +
      //   "&redirect_uri=" +
      //   encodeURIComponent("https://www.psy.com.cn/member/wxcallback.htm") +
      //   "&response_type=code" +
      //   "&scope=snsapi_userinfo" +
      //   "&state=" +
      //   encodeURIComponent(window.location.origin + "/m/doctor/my") +
      //   "#wechat_redirect";
      // window.location.replace(url);
      // todo 获取code
    },

    // 获取到code后绑定
    bindWeixin() {
      uni.login({
        provider: "weixin",
        success: res => {
          if (res.code) {
            uni.showLoading();
            this.$http("/mp/code2session", { code: res.code }).then(json => {
              if (json.code === 0) {
                this.user.weixin_unionid = json.data.unionid;
                this.user.weixin_openid = json.data.openid;
                this.user.face = json.data.face;
                let param = {
                  weixin_unionid: json.data.unionid,
                  weixin_openid: json.data.openid,
                  face: json.data.face
                };
                this.$http("/table/6/" + this.user.id, param, "put").then(json => {
                  if (json.code === 0) {
                    uni.setStorage({ key: "user", data: this.user });
                    uni.showToast({ title: "绑定成功", icon: "success", duration: 600 });
                  }
                  uni.hideLoading();
                });
              } else {
                uni.hideLoading();
                uni.showToast({ title: json.message, icon: "none", duration: 600 });
              }
            });
          }
        }
      });
    },
    /** 解绑微信 */
    unBindWeixin() {
      uni.showModal({
        content: "你确定解除绑定吗？",
        success: res => {
          if (res.confirm) {
            uni.showLoading();
            this.user.weixin_unionid = "";
            this.user.weixin_openid = "";
            let param = {
              weixin_unionid: "",
              weixin_openid: ""
            };
            this.$http("/table/6/" + this.user.id, param, "put").then(json => {
              if (json.code === 0) {
                uni.hideLoading();
                uni.setStorage({ key: "user", data: this.user });
                uni.showToast({ title: "解绑成功", icon: "success", duration: 600 });
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 退出登录
    logout() {
      uni.showModal({
        content: "你确定要退出登录吗？",
        success: res => {
          if (res.confirm) {
            uni.removeStorageSync("user");
            let param = { unit: this.user.unit };
            uni.redirectTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.myPadding {
  padding-top: 50px;
}
.qrcode {
  margin: 30px auto;
  display: block;
  .tki-qrcode {
    display: flex;
    justify-content: center;
  }
}
.qrcode-msg {
  color: #999;
  margin: 0 30px;
  text-align: center;
  font-size: 14px;
}
</style>
