<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" @search="onSearch" ref="search"></w-search>
    <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
      {{ isEdit ? '完成' : '管理' }}
    </div>
    <!-- 顶部栏 end -->

    <customer :current-path="routePath" ref="customer" :is-search="true" :is-tabbar="isTab"></customer>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';
import WSearch from '@/components/WSearch.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'customers' }),
      isEdit: false,
      loading: '',
      isTab: false,
    };
  },
  created() {
  },
  mounted() {
    this.isTab = Number(this.$route.query.isTab) === 1;
    if (this.$refs.customer) {
      this.$refs.customer.firstLoading = false;
    }
  },
  components: {
    Customer,
    WSearch,
  },
  methods: {
    onSearch({ keywords }) {
      if (this.loading) return;
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 500);

      this.$refs.customer && this.$refs.customer.searchCustomer(keywords);
    },
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.customer && this.$refs.customer.onEditList(this.isEdit);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.search {
  padding: 0 .45rem;
}

.header-right {
  color: $color-grey;
}

.color-blue {
  color: $color-blue;
}
</style>