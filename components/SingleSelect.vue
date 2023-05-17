<template>
  <view>
    <view @click="Show" style="background-color:#fff">
      <u-field
        :label="label"
        :placeholder="place"
        v-model="name"
        :input-align="inputAlign"
        :right-icon="rightIcon"
        :error-message="errMsg?errMsg:false"
        disabled
        :required="required"
      />
    </view>
    <u-select
      v-model="show"
      :list="selectList"
      label-name="name"
      value-name="id"
      safe-area-inset-bottom
      :default-value="index"
      @cancel="show=false"
      @confirm="Confirm"
    ></u-select>
  </view>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    label: { type: String },
    place: { type: String },
    inputAlign: { type: String, default: "right" },
    rightIcon: { type: String, default: "" },
    list: [Array],
    position: { required: false, default: "bottom" },
    errMsg: { required: false },
    // v-model双向绑定
    value: [Number, String],
    required: Boolean
  },
  data() {
    return {
      show: false,
      name: "",
      index: [0],
      selectList: [],
      // 指字符串数组，否则为对象数组
      string: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始值
    init() {
      this.string = typeof this.list[0] === "string";
      if (this.string) {
        this.name = this.value;
        this.selectList = this.list.map((item, idx) => {
          let obj = new Object();
          obj.name = item;
          obj.id = idx;
          return obj;
        });
      } else {
        const item = this.list.find(item => item.id === this.value);
        this.name = item ? item.name : "";
        this.selectList = this.list;
      }
    },

    // 弹出
    Show() {
      if (this.string) {
        this.index = [this.list.findIndex(item => item === this.value)];
      } else {
        this.index = [this.list.findIndex(item => item.id === this.value)];
      }
      this.show = true;
    },

    // 确定
    Confirm(res) {
      if (this.string) {
        this.$emit("input", res[0].label);
        this.name = res[0].label;
      } else {
        this.$emit("input", res[0].value);
        this.name = res[0].label;
      }
      this.show = false;
    }
  }
};
</script>