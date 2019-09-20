<!-- 产品货架页面 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <template #header-mid>
      <w-search class="search" disabled show-scan @input-click="toSearch()"></w-search>
    </template>
    <!-- <div class="header-right" slot="header-right">
      <w-cart-icon currentPath="market"></w-cart-icon>
    </div> -->
    <!-- 顶部栏 end -->

    <!-- 正文内容 -->
    <product-category-scroll ref="productCategory" :current-path="routePath" show-select-btn></product-category-scroll>
    <!-- 正文内容 end -->

  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import { mapGetters } from 'vuex';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import ProductCategoryScroll from './components/ProductCategoryScroll.vue';

export default {
  data() {
    return {
      categoryData: null,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'category' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    // this.$store.commit('product/updateKeywords', '');
    // if (this.$route.query.tab === 'select') {
    //   this.getSortList();
    // }
    setTimeout(() => {
      this.getSortList();
    }, 400);
  },
  // watch: {
  //   '$route'(to) {
  //     if (to.path === '/market' && to.query.tab === 'select') {
  //       // 返回到当前界面
  //       this.$store.commit('product/updateKeywords', '');
  //       // this.$refs.productCategory && this.$refs.productCategory.updateData(this.categoryData);

  //       if (!this.categoryData) {
  //         this.getSortList();
  //       }
  //     }
  //   },
  // },
  components: {
    WSearch,
    ProductCategoryScroll,
  },
  methods: {
    toSearch() {
      const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' });
      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === productPath);
      if (index >= 0) {
        // 浏览历史记录有分类界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }
      this.$router.push(`${this.routePath}/search`);
    },
    async getSortList() {
      Utils.showLoading();
      const result = await service.getSelectSortList();
      if (!result) return;
      Utils.hideLoading();
      this.categoryData = result;
      this.$refs.productCategory && this.$refs.productCategory.updateData(result);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding-left: .44rem;
  padding-right: .44rem;
}
</style>