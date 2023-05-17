<template>
  <u-tabbar v-model="isActive" active-color="#1989fa" :list="itemList" @change="handleClick"></u-tabbar>
</template>

<script>
export default {
  name: "MyTabbar",
  props: {
    active: { type: Number, default: 0 }
  },
  data () {
    return {
      isActive: 0,
      itemList: [
        { iconPath: "home", selectedIconPath: "home", page: "/pages/index", text: "首页" },
        {
          iconPath: "test",
          selectedIconPath: "test",
          customIcon: true,
          page: "/pages/cart",
          text: "购物车"
        },
        { iconPath: "user", selectedIconPath: "user", customIcon: true, page: "/pagesB/My", text: "我的" }
      ]
    };
  },
  mounted () {
    this.isActive = this.active || 0;
  },
  methods: {
    /** 点击tabbar */
    handleClick (idx) {
      this.isActive = idx;
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      if (this.itemList[idx].page != "/pagesD/patient/patient") {
        /** 判断登录 */
        let login = this.$isLogin();
        if (!login) return;
      }
      if (`/${page.route}` != this.itemList[idx].page) {
        console.log("tabbar跳转", this.itemList[idx].page);
        uni.redirectTo({ url: this.itemList[idx].page });
      }
    }
  }
};
</script>