<template>
  <u-divider half-width="100%" :height="height" :border-color="bordercolor" :bg-color="bgcolor" :use-slot="useslot" />
</template>

<script>
export default {
  props: {
    useslot: { required: false, default: false },
    height: { required: false, default: "60" },
    bordercolor: { required: false, default: "#dcdfe6" },
    bgcolor: { required: false, default: "#ffffff" }
  }
};
</script>