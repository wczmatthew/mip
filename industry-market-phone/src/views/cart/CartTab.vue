<!--  -->
<template lang='html'>
  <w-container show-header>
    <!-- 顶部栏 -->
    <template #header-mid>
      <div class="header-left">
        <w-scan-icon current-path="/market"></w-scan-icon>
      </div>
      购物单({{totalNum}})
    </template>
    <template #header-right>
      <div class="header-right" :class="{'color-active': isEdit }" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <cart class="w-content" :current-path="routePath" ref="cart"></cart>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Cart from './components/Cart.vue';

export default {
  data() {
    return {
      isEdit: false,
      routePath: '/market', // 下一级页面路由前缀
    };
  },
  created() {},
  mounted() {
  },
  computed: {
    ...mapGetters('user', {
      totalNum: 'cartNum',
      refreshView: 'refreshView',
    }),
  },
  components: {
    Cart,
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market/cartTab' && this.$refs.cart) {
        // 重新进入页面
        this.$refs.cart.$data.isFirstLoading = true;
        this.$refs.cart.onPullingDown();
      }
    },
    refreshView() {
      if (this.refreshView !== '/market/cartTab') return;
      this.scrollTop();
    },
  },
  methods: {
    scrollTop() {
      this.$refs.cart.scrollTop();
    },
    getTotalNum(totalNum) {
      this.totalNum = totalNum;
    },
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.cart.onEdit(this.isEdit);
    },
  },
};
</script>
<style lang="scss" scoped>

.header-right {
  font-size:  14px;
}

.color-active {
  color: $color-default;
}
</style>