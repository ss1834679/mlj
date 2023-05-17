
<script>
import Vue from "vue";
export default {
  onLaunch: function() {
    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>


<style lang="scss">
/*项目定义的样式文件*/
/* 此处为style标签内容的最前面 */
@import "./static/icon/iconfont.css";
// @import "./wxcomponents/vant/common/index.wxss";
@import "common/style.scss";
@import "uview-ui/index.scss";

body {
  background-color: #f7f8fa;
  > view {
    background-color: #f7f8fa;
  }
}
.uploader {
  .u-upload {
    display: inline-flex !important;
  }
}
.leftCell {
  .u-cell__value {
    color: #323233 !important;
    text-align: left !important;
  }
}
/* 更多的cell 点击跳转 */
.h2Cell {
  background-color: transparent !important;
  font-size: 24rpx !important;
  .u-cell {
    &::after {
      content: none !important;
    }
  }
  .u-cell_title {
    font-weight: bold;
    font-size: 26rpx;
    padding-left: 12rpx;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 24rpx;
      width: 4rpx;
      display: block;
      background-color: #2f4fb3;
    }
  }
}
.hx-navbar {
  .hx-navbar__content__main_center {
    justify-content: center !important;
  }
  .hx-navbar__content__main_lefticon_txt,
  .hx-navbar__content__main_right_txt {
    font-size: 14px !important;
    color: #1989fa !important;
  }
}
.hxNav {
  .hx-navbar__content__main_left,
  .hx-navbar__content__main_right {
    .hx-navbar__icon {
      display: none !important;
    }
  }
}
.gap {
  padding: 10px 15px;
}
.tb_stat {
  border-top: 2px solid #dcdee2;
  border-bottom: 2px solid #dcdee2;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid #dcdee2;
    text-align: center;
  }
  th {
    border-bottom: 2px solid #dcdee2;
    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }
  td {
    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
}
</style>
