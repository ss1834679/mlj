<template>
  <view class="flex tagSelect">
    <view v-for="(i,idx) in selectList" @click="handleSelect(i,idx)" :key="idx" :class="i.select?'selectedItem tagItem':'tagItem'">{{i.name}}</view>
  </view>
</template>

<script>
export default {
  props: {
    list: { required: true, type: Array } /* 可选项 */,
    value: [Array, String] /* 双向绑定 */,
    valuekey: { required: false, default: "value" } /* 返回的value key */,
    multiple: { default: false }
  },
  data() {
    return {
      selected: [],
      selectList: []
    };
  },
  mounted() {
    this.selectList = this.list;
    this.selectList.forEach(i => {
      if (this.value && this.value.indexOf(i[this.valuekey]) != -1) {
        i.select = true;
      }
    });
  },
  methods: {
    handleSelect(item, idx) {
      this.selected = [];
      if (!this.multiple) {
        /* 不是多选 */
        this.selectList = this.selectList.map((it, index) => {
          index !== idx && (it.select = false);
          return it;
        });
      }
      this.$set(this.selectList[idx], "select", item.select ? false : true);
      this.selectList.forEach(it => {
        if (it.select) {
          this.selected.push(it[this.valuekey]);
        }
      });
      console.log(this.selected);
      this.$emit("input", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped>
.tagSelect {
  flex-wrap: wrap;
}
.tagItem {
  padding: 5px 10px;
  border: 1px #ccc solid;
  border-radius: 5px;
  & + & {
    margin-left: 10px;
  }
}
.selectedItem {
  color: orange;
}
</style>