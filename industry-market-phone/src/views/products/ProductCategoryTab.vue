<!-- 产品货架页面 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <w-search class="search" slot="header-mid" disabled show-scan @input-click="toSearch()"></w-search>
      <div class="header-right" slot="header-right">
        <w-cart-icon currentPath="market"></w-cart-icon>
      </div>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <product-category ref="productCategory" :current-path="routePath" next-path="productList"></product-category>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import { mapGetters } from 'vuex';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import ProductCategory from './components/ProductCategory.vue';

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
    ProductCategory,
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