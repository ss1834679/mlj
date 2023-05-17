<template>
  <u-upload
    class="uploader"
    :action="uploadUrl"
    :height="size"
    :width="size"
    :show-progress="false"
    :file-list="list"
    :max-count="maxCount"
    :before-upload="Upload"
    @on-remove="Delete"
    @on-success="handleSuccess"
  />
</template>

<script>
// const local = window.location.host.startsWith('localhost')
const local = false;
const HOST = local ? "http://localhost:84/upload" : "https://api.psy.com.cn/upload";
const DIR = local ? "http://localhost:90" : "https://cdn.psy.com.cn";

export default {
  name: "ImageUpload",
  // components: { Uploader },
  props: {
    // 初始图片，英文逗号分隔网址
    value: "",
    // 限制图片数量
    maxCount: { type: [String, Number], default: 1 },
    // 限制图片大小，默认200K
    maxSize: { type: [String, Number], default: 1024 * 200 },
    // 控件尺寸
    size: { type: [String, Number], default: 160 }
  },
  data() {
    return {
      list: [],
      urls: [],
      uploadUrl: HOST
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始图片
    init() {
      if (this.value) {
        this.list = this.value.split(",").map(item => ({ url: item, isImage: true }));
        this.urls = this.value.split(",");
      }
    },
    handleSuccess(data) {
      console.log(data);
      if (data.code === 0) {
        this.urls.push(DIR + "/" + data.data);
        /** 更新组件上面的展示 */
        // this.list = this.urls.map(item => ({ url: item, isImage: true }));
        this.$emit("input", this.urls.join());
      } else {
        uni.showToast({
          title: data.message,
          duration: 300,
          icon: "none"
        });
      }
    },
    // 上传
    Upload(index, list) {
      let _this = this;
      return new Promise((resolve, reject) => {
        uni.compressImage({
          src: list[index].url,
          success: res => {
            list[index].file.url = res.tempFilePath;
            list[index].url = res.tempFilePath;
            resolve();
          },
          fail: res => {
            uni.showToast({
              title: "压缩失败，上传源文件",
              duration: 300,
              icon: "none"
            });
            resolve();
          }
        });
      });
    },

    // 删除
    Delete(index, lists, name) {
      this.urls.splice(index, 1);
      this.list.splice(index, 1);
      this.$emit("input", this.urls.join());
    }
  }
};
</script>