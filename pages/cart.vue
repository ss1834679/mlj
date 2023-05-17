<template>
  <view>
    <SideslipCar
      ref="mycar"
      @selAllBtn="selAllBtn"
      @delBtn="delBtn"
      @touchEv="touchEv"
      class="sideslip-car"
      @selThis="selThis"
      @jsBtn="jsBtn"
      @changeNum="changeNum"
      :carts="carts"
    />
    <MyTabbar :active="3" />
  </view>
</template>

<script>
import MyTabbar from "./MyTabbar";
import SideslipCar from "../components/sideslip-car.vue";

export default {
  components: { MyTabbar,SideslipCar },
  data () {
    return {
      carts: [
        {
          id: 236,
          gid: 47,
          name: "毛巾（厚）",
          img: "https://xthotel.palmbly.com/uploads/images/20201020/fb54b8d699c646908fde0af12def5a5b.png",
          gsId: 72,
          spec_key_name: "尺寸:M 颜色:黑色",
          spec: [{ name: "尺寸", value: "M" }, { name: "颜色", value: "黑色" }],
          price: 19,
          number: 1,
          stock: 233,
          isTouchMove: false,
          selected: true,
        },
        {

          id: 237,
          gid: 45,
          name: "盆栽",
          img: "https://xthotel.palmbly.com/uploads/images/20201020/741ff4736f32e9bde91b30f04aff86e5.png",
          gsId: 65,
          spec_key_name: "件装:1件居家必备:枕头",
          spec: [{ name: "件装", value: "1件" }, { name: "居家必备", value: "枕头" }],
          price: 6001,
          number: 1,
          stock: 77,
          selected: true,
          isTouchMove: false,
          selected: true,
        }
      ], // 购物车列表

    }
  },
  onLoad () {

  },
  onShow () {

  },
  methods: {
    jsBtn: function (ids) {
      console.log(ids);
    },
    changeNum: function (carts) {
      this.carts = carts;
      this.$refs.mycar.getTotalPrice();
    },
    selThis: function (carts) {
      this.carts = carts;
      this.$refs.mycar.getTotalPrice();
    },
    selAllBtn: function (carts) {
      this.carts = carts;
      this.$refs.mycar.getTotalPrice();
    },
    touchEv: function (carts) {
      this.carts = carts;
    },
    delBtn: function (carts, ids, index) {
      carts.splice(index, 1);
      this.carts = carts;
      this.$refs.mycar.getTotalPrice();
    }
  }
}
</script>
<style lang="less" scoped>

</style>