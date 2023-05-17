<template>
  <u-button :type="type" class="codeBtn" :size="size" :disabled="disabled" :plain="plain" @click="getMobileCode">{{ text }}</u-button>
</template>

<script>
const TIMER = 120;

export default {
  name: "MobileCode",
  // components: { Button },
  props: {
    // 按钮类型
    type: { type: String, default: "default" },
    // 手机号码
    mobile: String,
    // 需要检测手机号已存在
    checkExist: Boolean,
    // 需要检测手机号还未注册
    checkNotExist: Boolean,
    // 短信通道
    port: String,
    // 是否朴素按钮
    plain: Boolean,
    // 按钮大小（small/mini）
    size: { type: String, default: "mini" },
    // 是否英文
    en: Boolean,
    // 学校（扣除短信余量用到）
    unit: { type: [String, Number], default: 0 }
  },
  data() {
    return {
      text: "获取验证码",
      disabled: false,
      timer: TIMER
    };
  },
  watch: {
    en() {
      this.switchLang();
    }
  },
  mounted() {
    this.switchLang();
  },
  methods: {
    // 切换语言
    switchLang() {
      this.text = this.en ? "Get Code" : "获取验证码";
    },

    // 点击“获取”按钮
    getMobileCode() {
      if (!this.$global.MobileValidateReg.test(this.mobile)) {
        uni.showToast({ title: "请输入手机号码", icon: "none" });
      } else if (this.checkExist || this.checkNotExist) {
        this.$http("/mobile/exist", { m: this.mobile, u: this.unit }).then(json => {
          if (json.code === 0) {
            if (this.checkExist) {
              json.data === 0 ? uni.showToast({ title: "手机号尚未注册", icon: "none" }) : this.timerStart();
            } else if (this.checkNotExist) {
              json.data === 1 ? uni.showToast({ title: "手机号已被注册", icon: "none" }) : this.timerStart();
            }
          }
        });
      } else {
        this.timerStart();
      }
    },

    // 倒计时
    timerStart() {
      this.disabled = true;
      this.text = "- " + this.timer + " -";

      // 定时器
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.text = "- " + this.timer + " -";
        } else {
          clearInterval(interval);
          this.text = this.en ? "Get Code" : "获取验证码";
          this.timer = TIMER;
          this.disabled = false;
        }
      }, 1000);
      this.$once("hook:beforeDestroy", () => clearInterval(interval));

      // 请求发送验证码
      this.$http("/mobile/code", { m: this.$number.encrypt(this.mobile), p: this.port, u: this.unit }, "post").then(
        json => {
          if (json.code === 0) {
            this.$emit("input", json.data);
          } else {
            uni.showToast({ title: json.message, icon: "none" });
            // 还原
            clearInterval(interval);
            this.text = this.en ? "Get Code" : "获取验证码";
            this.timer = TIMER;
            this.disabled = false;
          }
        }
      );
    }
  }
};
</script>