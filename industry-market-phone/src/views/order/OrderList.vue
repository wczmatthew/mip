<!--  -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      订单管理
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <orders :current-path="routePath" ref="order"></orders>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Orders from './components/Orders.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'order' }),
    };
  },
  created() {},
  mounted() {
  },
  computed: {},
  components: {
    Orders,
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.cart.onEdit(this.isEdit);
    },
  },
  props: {},
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