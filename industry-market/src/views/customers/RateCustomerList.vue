<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      选择优惠率客户
    </div>
    <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
      {{ isEdit ? '完成' : '管理' }}
    </div>
    <!-- 顶部栏 end -->

    <customer :current-path="routePath" ref="customer" :is-rate="true"></customer>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'selectRateCustomer' }),
      isEdit: false,
      customerType: 'odd',
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.customer && this.$refs.customer.onChangeCustomer(this.customerType);
      // this.$refs.customer.onPullingDown();
    });
  },
  components: {
    Customer,
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.customer && this.$refs.customer.onEditList(this.isEdit);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.header-right {
  color: $color-grey;
}

.color-blue {
  color: $color-blue;
}
</style>