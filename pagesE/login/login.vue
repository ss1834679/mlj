<template>
  <view>
    <view v-if="show" v-title="name" class="container" :style="{ backgroundImage: 'url(' + picture + ')' }">
      <view class="_main">
        <u-tabs
          :list="tablist"
          bar-width="80"
          active-color="#323233"
          inactive-color="#646566"
          :bar-style="{'background-color':'#2F4FB3'}"
          :is-scroll="false"
          :current="tab"
          @change="onChange"
        ></u-tabs>
        <view class="ptb-40">
          <template v-if="tab==0">
            <input type="tel" v-model="form.mobile" placeholder="请输入注册手机号码" />
            <view class="code">
              <input type="tel" v-model="form.code" maxlength="6" placeholder="请输入短信验证码" />
              <MobileCode v-model="form.code_encrypt" :mobile="form.mobile" :unit="form.unit" size="default" />
            </view>
          </template>
          <template v-if="tab==1">
            <input type="tel" v-model="form.mobile" placeholder="请输入手机号码" />
            <input type="password" v-model="form.password" placeholder="请输入密码" style="margin-top: 10px" />
          </template>
        </view>
        <!-- <Checkbox v-model="agree" shape="square">同意《<a href="#">知情同意书</a>》</Checkbox> -->
        <u-button
          style="margin-top: 15px"
          type="primary"
          class="login-btn"
          :plain="true"
          :hair-line="false"
          :disabled="!agree"
          size="default"
          @click="submit"
        >登录</u-button>
        <u-divider half-width="100%" height="100">
          <button class="wechatRedirect" open-type="getUserInfo" @getuserinfo="wechatRedirect">
            <img style="width:32px;height:32px" src="//cdn.psy.com.cn/image/weixin-32x32.png" />
          </button>
        </u-divider>
        <view class="text-c mtb-10">
          <label @click="handleSwitch" style="color:#2979ff">切换医院</label>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MobileCode from "../../components/MobileCode.vue";
import md5 from "../../utils/md5";

export default {
  name: "Login",
  components: { MobileCode },
  data() {
    return {
      option: {},
      name: "",
      picture: "",
      tab: 0 /* 当前所在的tab */,
      tablist: [{ name: "验证码登录" }, { name: "密码登录" }],
      form: {
        mobile: "" /* this.$global.local ? "17338671451" : */,
        code: "",
        code_encrypt: "",
        password: "",
        unit: "",
        weixin_openid: "",
        weixin_unionid: "",
        face: "",
        name: "",
        sex: 1
      },
      unit: {},
      agree: true,
      show: false,
      key: undefined,
      code: undefined,
      redirect: undefined
    };
  },
  onLoad(option) {
    console.log(option.query);
    if (option.query && option.query.match(/\%/)) {
      option.query = decodeURIComponent(option.query);
    }
    this.option = JSON.parse(option.query);
    console.log(this.option, "option");
    this.form.unit = this.option.unit || uni.getStorageSync("unit-id");
    this.key = this.option.key;
    this.code = this.option.code;
    this.redirect = this.option.redirect;
    this.unit = uni.getStorageSync("unit");
    this.getSetting();
  },
  methods: {
    /** tab点击 */
    onChange(index) {
      this.tab = index;
    },
    /** 切换医院 */
    handleSwitch() {
      uni.clearStorage();
      uni.redirectTo({ url: `/pages/index/index` });
    },
    // 获取单位设置
    getSetting() {
      if (this.form.unit) {
        uni.showLoading();
        this.$http("/unit/" + this.$number.encrypt(this.form.unit) + "/setting").then(json => {
          if (json.code === 0) {
            const unit = json.data;
            uni.setStorage({ key: "unit", data: unit });
            this.name = unit.name;
            this.picture = unit.picture;
            if (unit.lb) {
              // 获取量表
              this.$http("/scale/price", { unit: unit.key }).then(json => {
                if (json.code === 0) {
                  const price = json.data;
                  this.$http(this.$global.psyApi + "/lb", { id: unit.lb, action: "hospital" }).then(json => {
                    if (json.code === 0) {
                      const scale = json.data;
                      scale.forEach(row => {
                        const item = price.find(item => item.scale === row.id);
                        row.price = item ? item.price : row.money * 100;
                      });
                      uni.setStorage({ key: "scale", data: scale });
                      // 获取科室
                      this.$http("/table/9", { f: "id,lb1,lb2,name", w: { unit: unit.id }, o: "sort" }).then(json => {
                        if (json.code === 0) {
                          if (json.data.length) {
                            this.show = true;
                            uni.setStorage({ key: "dept", data: json.data });
                            this.autoLogin();
                          } else {
                            uni.showModal({ title: "系统提示", content: "单位未配置科室", showCancel: false });
                          }
                          uni.hideLoading();
                        }
                      });
                    }
                  });
                }
              });
            } else {
              uni.hideLoading();
              uni.showModal({ title: "系统提示", content: "单位未配置量表", showCancel: false });
            }
          }
        });
      } else {
        uni.showModal({
          title: "系统提示",
          content: "单位未配置量表",
          showCancel: false,
          success: res => {
            if (res.confirm) {
              uni.redirectTo({ url: "/pages/index/index?login=true" });
            }
          }
        });
      }
    },

    // 自动登录
    autoLogin() {
      const login = key => {
        uni.showLoading();
        this.$http("/user/" + key).then(json => {
          uni.hideLoading();
          if (json.code === 0) {
            uni.setStorage({ key: "user", data: json.data });
            this.Redirect(json.data.role);
          } else {
            uni.removeStorageSync("user");
            uni.showToast({ title: json.message, icon: "none" });
            this.form.code = "";
            this.form.password = "";
          }
        });
      };
      const key = this.key;
      const user = uni.getStorageSync("user");
      if (key) {
        login(key);
      } else if (user && user.key && user.unit === Number(this.form.unit)) {
        uni.showModal({
          content: "系统检测到了你上次的登录信息，需要自动登录吗？",
          success: res => {
            if (res.confirm) {
              login(user.key);
            }
          }
        });
      }
    },

    // 登录
    submit() {
      let login = false;
      console.log(this.tab, "tab");
      if (!this.$global.MobileValidateReg.test(this.form.mobile)) {
        uni.showToast({ title: "请输入正确格式的手机号码", icon: "none" });
      } else if (this.tab === 0) {
        if (!/^\d{6}$/.test(this.form.code)) {
          uni.showToast({ title: "请输入验证码", icon: "none" });
        } else if (this.$number.decrypt(this.form.code_encrypt) !== this.form.code) {
          uni.showToast({ title: "验证码不正确", icon: "none" });
        } else {
          this.form.password = "";
          login = true;
        }
      } else {
        if (this.form.password === "") {
          uni.showToast({ title: "请输入密码", icon: "none" });
        } else if (this.form.password === "123456") {
          uni.showToast({ title: "请输入密弱密码，请联系管理员修改密码后再次登录码", icon: "none" });
        } else {
          !/^[a-fA-F0-9]{32}$/.test(this.form.password) && (this.form.password = md5(this.form.password));
          this.form.code = "";
          login = true;
        }
      }
      if (login) {
        uni.showLoading();
        this.$http("/login", this.form, "post").then(json => {
          uni.hideLoading();
          if (json.code === 0) {
            uni.setStorage({ key: "user", data: json.data });
            this.Redirect(json.data.role);
          } else if (json.code === 1) {
            uni.showModal({
              title: "系统提示",
              content: `账户未注册，你需要用当前信息注册为“${this.unit.lang_patient}”用户吗？`,
              success: res => {
                if (res.confirm) {
                  uni.removeStorageSync("user");
                  uni.setStorage({ key: "regist", data: this.form });
                  uni.redirectTo({ url: "/pagesD/patient/Regist" });
                }
              }
            });
          } else {
            uni.removeStorageSync("user");
            uni.showToast({ title: json.message, icon: "none" });
            this.form.code = "";
            this.form.password = "";
          }
        });
      }
    },

    // 获取code 获取用户信息授权
    wechatRedirect() {
      uni.login({
        provider: "weixin",
        success: res => {
          this.weixinLogin(res.code);
        }
      });
    },

    // 微信登录
    weixinLogin(code) {
      if (code) {
        uni.showLoading();
        this.$http("/wx/login", { code: code, unit: this.form.unit, from: "mp" }, "post").then(json => {
          uni.hideLoading();
          if (json.code === 0) {
            uni.setStorage({ key: "user", data: json.data });
            this.Redirect(json.data.role);
          } else if (json.code === 2) {
            let fun = () => {
              this.form.weixin_openid = json.data.openid;
              this.form.weixin_unionid = json.data.unionid;
              uni.showModal({
                title: "系统提示",
                content: `当前未找到与此微信关联的用户，如果已经注册过，请手工登录后到“我的”页面进行授权绑定，如果未注册过，可以用当前信息注册为“${this.unit.lang_patient}”用户，你确认注册吗？`,
                success: res => {
                  if (res.confirm) {
                    uni.removeStorageSync("user");
                    uni.setStorage({ key: "regist", data: this.form });
                    uni.redirectTo({ url: "/pagesD/patient/Regist" });
                  }
                }
              });
            };
            uni.getUserInfo({
              success: res1 => {
                this.form.face = res1.userInfo.avatarUrl;
                this.form.name = res1.userInfo.nickName;
                this.form.sex = res1.userInfo.gender;
              },
              complete: () => {
                fun();
              }
            });
          } else if (json.message.includes("code been used")) {
            uni.showModal({
              title: "系统提示",
              content: "微信扫码登录出了点小问题，请重试。",
              success: res => {
                if (res.confirm) {
                  let param = { unit: this.form.unit };
                  uni.redirectTo({ url: `/pagesE/login/login?query=${JSON.stringify(param)}` });
                }
              }
            });
          } else {
            uni.removeStorageSync("user");
            uni.showToast({ title: json.message, icon: "none" });
            this.form.code = "";
            this.form.password = "";
          }
        });
      }
    },

    // 重定向
    Redirect(role) {
      if (this.redirect) {
        console.log(decodeURIComponent(this.redirect));
        uni.redirectTo({ url: decodeURIComponent(this.redirect) });
      } else if (role === 0) {
        uni.redirectTo({ url: "/pagesD/patient/patient" });
      } else if (role === 1) {
        uni.redirectTo({ url: "/pagesB/doctor" });
      } else if (role === 2) {
        uni.redirectTo({ url: "/pagesB/Nurse" });
      } else {
        uni.showToast({ title: "管理员角色不能登录移动端", icon: "none" });
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  min-height: 100vh;
  background-color: #fff;
  .login-btn {
    .u-btn {
      color: #2f4fb3 !important;
      background-color: #e1e8ff !important;
      border-radius: 10px;
      border: none;
    }
  }
}
._main {
  margin-top: 260px;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  background-color: #fff;
}
.btn-logout {
  margin-top: 20px;
  button {
    width: 120px;
    background-color: transparent !important;
    border: none;
    color: #2f4fb3;
  }
}
input[type="tel"],
input[type="password"] {
  border: 1px solid rgba($color: #979797, $alpha: 0.5);
  width: 100%;
  border-radius: 10px;
  height: 44px;
  padding-left: 15px;
  box-sizing: border-box;
  &::placeholder {
    color: #ccc;
  }
}
.wechatRedirect {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  padding: 0;
}
.code {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  button {
    width: 140px;
    margin-left: 10px;
  }
}
</style>