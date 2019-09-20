<!-- 客户列表 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <template #header-mid>
        客户列表
      </template>
      <template #header-right>
        <div class="header-right" :class="{'color-blue': isEdit }" @click="onEdit()">
          {{ isEdit ? '完成' : '管理' }}
        </div>
      </template>
    </w-header>
    <!-- 顶部栏 end -->

    <customer class="w-content" :is-tabbar="true" :current-path="currentPath" ref="customer"></customer>
  </div>
</template>
<script>
// import Utils from '@/common/Utils';
import Customer from './components/Customer.vue';

export default {
  data() {
    return {
      isEdit: false,
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.customer && this.$refs.customer.onPullingDown();
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
  props: {
    currentPath: {
      type: String,
      default: '',
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