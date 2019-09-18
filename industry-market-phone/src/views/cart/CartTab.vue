<!--  -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
      <div slot="header-mid">
        购物单({{totalNum}})
      </div>
      <div class="header-right" :class="{'color-active': isEdit }" slot="header-right" @click="onEdit()">
        {{ isEdit ? '完成' : '编辑' }}
      </div>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <cart class="w-content" :current-path="currentPath" ref="cart" @getTotal="getTotalNum"></cart>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import Cart from './components/Cart.vue';

export default {
  data() {
    return {
      totalNum: 0,
      isEdit: false,
    };
  },
  created() {},
  mounted() {
  },
  computed: {},
  components: {
    Cart,
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'cart' && this.$refs.cart) {
        // 重新进入页面
        this.$refs.cart.$data.isFirstLoading = true;
        this.$refs.cart.onPullingDown();
      }
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
  font-size:  14px;
}

.color-active {
  color: $color-default;
}
</style>