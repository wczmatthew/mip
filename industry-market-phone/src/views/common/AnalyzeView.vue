<!-- 其他页面 -->
<template lang='html'>
  <div>
    <!-- 顶部栏 -->
    <w-header>
      <template #header-mid>
        {{title}}
      </template>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <iframe :src="analyzeUrl" scrolling="auto" allowfullscreen="true" frameborder="0" class="frame-view" @load="onLoad"></iframe>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
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
    this.title = '大数据分析';
    Utils.showLoading();
    // 如果iframe一直没有 onload 那就 10秒后自动关闭loading
    setTimeout(() => {
      Utils.hideLoading();
    }, 10000);
  },
  computed: {
    ...mapGetters('user', {
      role: 'role',
      analyzeUrl: 'analyzeUrl',
    }),
  },
  components: {},
  methods: {
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