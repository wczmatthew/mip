<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      客户列表
    </template>
    <template #header-right>
      <div class="header-right">
        <i class="iconfont icon-search" @click="onSearch()"></i>
      </div>
    </template>
    <!-- 顶部栏 end -->

    <customer :current-path="routePath" ref="customer"></customer>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'customer' }),
    };
  },
  created() {
  },
  mounted() {
    this.$refs.customer && this.$refs.customer.onPullingDown();
  },
  components: {
    Customer,
  },
  methods: {
    onSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
  },
};
</script>
<style lang="scss" scoped>
.w-header .header-right .iconfont {
  font-size: .2rem;
}
</style>