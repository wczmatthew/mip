<!-- 其他页面 -->
<template lang='html'>
  <w-container show-header>
    <!-- 顶部栏 -->
    <template #header-mid>
      <i class="iconfont icon-back header-left" @click="onBack()"></i>
      {{title}}
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <iframe :src="url" scrolling="auto" allowfullscreen="true" frameborder="0" class="frame-view" id="iframe" @load="onLoad"></iframe>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      title: '',
      url: '',
    };
  },
  created() {},
  mounted() {
    this.url = this.$route.query.url;
    this.title = this.$route.query.title || '发现';
    Utils.showLoading();
    // 如果iframe一直没有 onload 那就 10秒后自动关闭loading
    setTimeout(() => {
      Utils.hideLoading();
    }, 10000);
  },
  components: {},
  methods: {
    onBack() {
      const beforePath = Utils.getLocalStorageItem('beforePath') || '/market?tab=home';
      this.$router.replace(beforePath);
    },
    onLoad() {
      setTimeout(() => {
        Utils.hideLoading();
      }, 300);
    },
  },
};
</script>
<style lang="scss" scoped>
.frame-view {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>