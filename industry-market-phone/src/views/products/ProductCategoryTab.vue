<!-- 产品货架页面 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <template #header-mid>
        <w-search class="search" disabled show-scan @input-click="toSearch()"></w-search>
      </template>
      <template #header-right>
        <div class="header-right">
          <w-cart-icon currentPath="market"></w-cart-icon>
        </div>
      </template>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <product-category-scroll ref="productCategory" :current-path="routePath" next-path="productList"></product-category-scroll>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import { mapGetters } from 'vuex';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
// import ProductCategory from './components/ProductCategory.vue';
import ProductCategoryScroll from './components/ProductCategoryScroll.vue';

export default {
  data() {
    return {
      categoryData: null,
      routePath: '/market', // 获取当前路由
    };
  },
  created() {},
  mounted() {
    // this.$store.commit('product/updateKeywords', '');
    // if (this.$route.query.tab === 'select') {
    //   this.getSortList();
    // }
    this.getSortList();
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'category') {
        // 返回到当前界面
        this.$store.commit('product/updateKeywords', '');
        // this.$refs.productCategory && this.$refs.productCategory.updateData(this.categoryData);

        if (!this.categoryData) {
          this.getSortList();
        } else {
          this.$refs.productCategory && this.$refs.productCategory.updateData(this.categoryData);
        }
      }
    },
  },
  components: {
    WSearch,
    ProductCategoryScroll,
  },
  methods: {
    scrollTop() {
      this.$refs.productCategory.scrollTop();
    },
    toSearch() {
      this.$router.push('/market/search');
    },
    async getSortList() {
      Utils.showLoading();
      const result = await service.getNewSortList({ userid: Utils.getUserId(this) });
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