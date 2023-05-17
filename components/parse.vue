<template>
  <u-parse :content="content" noData=" " :imageProp="{mode:'aspectFit',padding:0,lazyLoad:true,domain:''}" @navigate="navigate"></u-parse>
</template>

<script>
import uParse from "@/components/u-parse/u-parse.vue";
export default {
  components: { uParse },
  props: {
    content: String
  },
  methods: {
    /** 跳转的函数 */
    navigate(href, e) {
      console.log(href, e);
    }
  }
};
</script>

<style>
</style>