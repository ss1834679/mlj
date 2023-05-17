<template>
  <view>
    <view class="p-10">
      <u-search placeholder="输入医院名称搜索" v-model="word" shape="square" :clearabled="true" @change="onChange" :show-action="false"></u-search>
    </view>
    <view class="swiper">
      <u-swiper v-if="banners" :list="banners" indicator circular keyName="picUrl" height="375rpx" @click="tapBanner"> </u-swiper>
    </view>
    <view class="good-list">
      <view class="good-item">123123</view>
      <view class="good-item">123123</view>
      <view class="good-item">123123</view>
      <view class="good-item">123123</view>
      <view class="good-item">123123</view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { genTestUserSig } from "../utils/im/GenerateTestUserSig";
export default {
  data () {
    return {
      word: "",
      list: [],
      option: {},
      unitid: ""
    };
  },
  onLoad (option) {
  },
  methods: {
    getQueryString (url, name) {
      var reg = new RegExp("(^|&|/?)" + name + "=([^&|/?]*)(&|/?|$)", "i");
      var r = url.substr(1).match(reg);
      if (r != null) {
        return r[2];
      }
      return null;
    },
    // 初始化：如果已经选择过直接跳过
    async init () {
      await this.loginIM("test");
      this.unitid = uni.getStorageSync("unit-id");
      if (this.unitid) {
        await this.handleGetUnitIdConfig(this.unitid);
        let user = uni.getStorageSync("user");
        console.log(user, "user");
        if (user && user.key) {
          uni.showLoading();
          // todo 登录im
          // this.loginIM("test");
          this.$http("/user/" + user.key).then(json => {
            uni.hideLoading();
            if (json.code === 0) {
              uni.setStorage({ key: "user", data: json.data });
              /* 正确跳转 */
              this.Redirect(json.data.role);
            } else {
              /* 自动登录失败跳转 */
              uni.removeStorageSync("user");
              this.toLogin();
            }
          });
        } else {
          this.toLogin();
        }
        return;
      }
      this.$http("/table/5", { f: "id,name", w: { id: [">", 1] } }).then(json => {
        if (json.code === 0) {
          this.list = json.data;
          console.log(this.list);
        }
      });
    },
    async loginIM (userID) {
      await genTestUserSig("test").then(res => {
        // let obj = await genTestUserSig("test").userSig;
        console.log(
          {
            userID,
            userSig: res.userSig
          },
          "login"
        );
        uni.$app
          .login({
            userID,
            userSig: res.userSig
          })
          .then(() => {
            console.log("im登录成功im登录成功im登录成功");
            // wx.switchTab({
            //   url: "../index/main"
            // });
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    toLogin () {
      uni.showModal({
        content: "获取登录信息失败，是否去登录",
        success: res => {
          if (res.confirm) {
            let param = { unit: this.unitid };
            uni.redirectTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
          } else {
            uni.redirectTo({ url: "/pagesD/patient/patient" });
          }
        }
      });
    },
    onChange () {
      this.$debounce(() => {
        const word = this.word;
        if (word.length >= 2) {
          this.$http("/table/5", { f: "id,name", w: { name: ["like", "%" + word + "%"] } }).then(json => {
            if (json.code === 0) {
              this.list = json.data;
            }
          });
        } else {
          this.list = [];
        }
      }, 500);
    },
    // 点击结果
    clickSearchResult (item) {
      uni.showModal({
        content: "系统将记住你的选择，下次会跳过搜索，直接进入【" + item.name + "】首页，确认吗？",
        success: res => {
          if (res.confirm) {
            let fun = async () => {
              uni.setStorage({ key: "unit-id", data: item.id });
              /* 获取单位信息 start */
              await this.handleGetUnitIdConfig(item.id);
              /* 获取单位信息 end */

              /* 跳转首页 */
              console.log(this.option, "option");
              if (this.option.login) {
                let param = { unit: item.id };
                uni.redirectTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
              } else {
                this.unitid = item.id;
                this.toLogin();
                // uni.redirectTo({ url: "/pagesD/patient/patient" });
              }
            };
            fun();
          }
        }
      });
    },
    // 重定向
    Redirect (role) {
      if (role === 0) {
        uni.redirectTo({ url: "/pagesD/patient/patient" });
      } else if (role === 1) {
        uni.redirectTo({ url: "/pagesB/doctor" });
      } else if (role === 2) {
        uni.redirectTo({ url: "/pagesB/Nurse" });
        console.log("nurse 跳转");
      }
    },
    /** 获取医院信息 */
    handleGetUnitIdConfig (unitId) {
      console.log(unitId, "unitId");
      this.$http("/unit/" + this.$number.encrypt(unitId) + "/setting").then(json => {
        if (json.code === 0) {
          const unit = json.data;
          /* 设置单位信息 */
          uni.setStorage({ key: "unit", data: unit });
        }
      });
    }
  }
};
</script>

<style>
</style>
