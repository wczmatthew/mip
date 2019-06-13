<!-- 顶部栏 -->
<template lang='html'>
  <!-- 顶部 -->
  <header class="w-header">
    <i class="iconfont icon-back header-left" v-if="showBack"
      @click="$router.back();"></i>

    <div class="w-header-mid">
      <slot name="header-mid"></slot>
    </div>

    <slot name="header-right"></slot>
  </header>
  <!-- 顶部 end -->
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
  props: {
    showBack: { // 是否显示返回键
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>