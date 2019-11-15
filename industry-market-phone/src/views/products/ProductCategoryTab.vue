<!-- 产品货架页面 -->
<template lang='html'>
  <w-container show-header>
     <!-- 顶部栏 -->
      <template #header-mid>
        <div class="header-left">
          <w-scan-icon :current-path="routePath"></w-scan-icon>
        </div>
        <w-search class="search" disabled show-scan @input-click="toSearch()"></w-search>
      </template>
      <template #header-right>
        <div class="header-right" v-permission="'cart'">
          <w-cart-icon :currentPath="routePath"></w-cart-icon>
        </div>
      </template>
      <!-- 顶部栏 end -->
      <!-- 正文内容 -->
      <w-loading-row v-if="loading"></w-loading-row>
      <product-category-scroll ref="productCategory" :current-path="routePath" next-path="productList"></product-category-scroll>
      <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import WSearch from '@/components/WSearch.vue';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import ProductCategoryScroll from './components/ProductCategoryScroll.vue';

export default {
  data() {
    return {
      categoryData: null,
      routePath: '/market', // 下一级页面路由前缀
      loading: true,
    };
  },
  created() {},
  mounted() {
    // this.$store.commit('product/updateKeywords', '');
    // if (this.$route.query.tab === 'select') {
    //   this.getSortList();
    // }
    this.loading = true;
    this.getSortList();
  },
  computed: {
    ...mapGetters('user', {
      refreshView: 'refreshView',
    }),
  },
  watch: {
    '$route'(to) {
      if (to.path === this.routePath) {
        // 返回到当前界面
        this.$store.commit('product/updateKeywords', '');
        // this.$refs.productCategory && this.$refs.productCategory.updateData(this.categoryData);

        if (!this.categoryData) {
          this.getSortList();
        } else {
          // this.$refs.productCategory && this.$refs.productCategory.updateData(this.categoryData);
        }
      }
    },
    refreshView() {
      if (this.refreshView !== '/market/categoryTab') return;
      this.refresh();
    },
  },
  components: {
    WSearch,
    ProductCategoryScroll,
  },
  methods: {
    refresh() {
      this.scrollTop();
      this.getSortList();
      this.$store.commit('user/updateRefreshView', '');
    },
    scrollTop() {
      this.$refs.productCategory.scrollTop();
    },
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
    async getSortList() {
      // Utils.showLoading();
      const result = await service.getNewSortList({ userid: Utils.getUserId(this) });
      this.loading = false;
      if (!result) return;
      // Utils.hideLoading();
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