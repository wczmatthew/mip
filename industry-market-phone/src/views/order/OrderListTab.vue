<!--  -->
<template lang='html'>
  <div>
    <!-- 顶部栏 -->
    <w-header>
      <div slot="header-mid">
        订单管理
      </div>
      <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
      </div>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <orders :current-path="currentPath" ref="order"></orders>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import Orders from './components/Orders.vue';

export default {
  data() {
    return {
      isEdit: false,
    };
  },
  created() {},
  mounted() {
  },
  computed: {},
  components: {
    Orders,
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'order') {
        // 重新进入页面
        this.$refs.order && this.$refs.order.onPullingDown();
      }
    },
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.cart.onEdit(this.isEdit);
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