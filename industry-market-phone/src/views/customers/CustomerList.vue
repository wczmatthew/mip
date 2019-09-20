<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      选择客户
    </template>
    <template #header-right>
      <div class="header-right" :class="{'color-blue': isEdit }" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
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
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'customers' }),
      isEdit: false,
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.customer.onPullingDown();
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
@import '~@/styles/variable.scss';
.header-right {
  font-size:  12px;
  color: $color-grey;
}

.color-blue {
  color: $color-blue;
}
</style>