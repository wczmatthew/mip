<!-- 图片组件 -->
<template lang='html'>
  <img :src="imgPath" alt="" @error="imgErr()">
</template>
<script>
import notFoundImg from '@/assets/404.png';

export default {
  data() {
    return {
      imgPath: '',
    };
  },
  created() {},
  mounted() {
    this.imgPath = this.src;
  },
  watch: {
    src() {
      this.imgPath = this.src;
    },
  },
  components: {},
  methods: {
    // 图片加载失败
    imgErr() {
      this.imgPath = notFoundImg;
    },
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
</style>