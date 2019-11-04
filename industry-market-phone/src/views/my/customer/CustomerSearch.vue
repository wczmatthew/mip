<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      <w-search class="search" show-scan @search="toSearch" ref="search" placeholder="请输入您想搜索的客户"></w-search>
    </template>
    <!-- 顶部栏 end -->

    <customer :current-path="routePath" :is-select="isSelect" ref="customer" hide-bottom></customer>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import WSearch from '@/components/WSearch.vue';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' }),
      keywords: '',
      isSelect: false,
    };
  },
  created() {
  },
  mounted() {
    this.isSelect = Number(this.$route.query.isSelect) === 1;
  },
  components: {
    Customer,
    WSearch,
  },
  methods: {
    // 开始查询
    toSearch({ keywords }) {
      this.keywords = keywords;
      this.$refs.customer && this.$refs.customer.onPullingDown(keywords);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding: .09rem .45rem;
  padding-right: .2rem;
}

</style>