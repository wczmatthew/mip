<!-- 图片组件 -->
<template lang='html'>
  <img :src="imgPath" alt="" @error="imgErr()" :class="{'err-img': imgPath === this.errImg}">
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
      this.imgPath = this.errImg || notFoundImg;
    },
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    errImg: {
      type: String,
      default: notFoundImg,
    },
  },
};
</script>
<style lang="scss" scoped>
.err-img {
  height: 100% !important;
  width: auto !important;
  max-width: 100%;
}
</style>