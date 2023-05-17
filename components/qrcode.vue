<template xlang="wxml" minapp="mpvue">
  <view class="tki-qrcode">
    <!-- #ifndef MP-ALIPAY -->
    <canvas class="tki-qrcode-canvas" :canvas-id="cid" :style="{width:cpSize+'px',height:cpSize+'px'}" />
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <canvas :id="cid" :width="cpSize" :height="cpSize" class="tki-qrcode-canvas" />
    <!-- #endif -->
    <!-- <image v-show="show" :src="result" :style="{width:cpSize+'px',height:cpSize+'px'}" /> -->
  </view>
</template>

<script>
import QRCode from "../utils/qrcode.js";
let qrcode;
export default {
  props: {
    text: { type: String, required: true },
    cid: { type: String, default: "tki-qrcode-canvas" },
    size: { type: Number, default: 240 },
    unit: { type: String, default: "px" },
    show: { type: Boolean, default: true },
    usingComponents: { type: Boolean, default: true },
    showLoading: { type: Boolean, default: true },
    loadingText: { type: String, default: "二维码生成中" },
    background: { type: String, default: "#ffffff" },
    foreground: { type: String, default: "#000000" },
    pdground: { type: String, default: "#000000" },
    lv: { type: Number, default: 3 },
    icon: { type: String, default: "" },
    iconSize: { type: Number, default: 40 }
  },
  data() {
    return {
      result: ""
    };
  },
  computed: {
    cpSize() {
      if (this.unit == "upx") {
        return uni.upx2px(this.size);
      } else {
        return this.size;
      }
    }
  },
  mounted() {
    // this._makeCode();
    // console.log(drawQrcode);
  },
  methods: {
    _makeCode() {
      let that = this;
      console.log(that.text);
      if (!this._empty(this.text)) {
        qrcode = new QRCode({
          context: that, // 上下文环境
          canvasId: that.cid, // canvas-id
          usingComponents: that.usingComponents, // 是否是自定义组件
          showLoading: that.showLoading, // 是否显示loading
          loadingText: that.loadingText, // loading文字
          text: that.text, // 生成内容
          size: that.cpSize, // 二维码大小
          background: that.background, // 背景色
          foreground: that.foreground, // 前景色
          pdground: that.pdground, // 定位角点颜色
          correctLevel: that.lv, // 容错级别
          image: that.icon, // 二维码图标
          imageSize: that.iconSize // 二维码图标大小
        });
      } else {
        uni.showToast({
          title: "二维码内容不能为空",
          icon: "none",
          duration: 2000
        });
      }
    },
    _empty(v) {
      let tp = typeof v,
        rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    }
  }
};
</script>

<style>
</style>