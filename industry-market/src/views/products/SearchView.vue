<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan @search="toSearch"></w-search>
    <!-- 顶部栏 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      keywords: '',
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    // this.getData();
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch({ keywords }) {
      this.$router.push(`${this.routePath}/productList?keywords=${keywords}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

</style>
