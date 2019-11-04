<!--  -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header>
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
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <cart class="w-content" :current-path="currentPath" ref="cart"></cart>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Cart from './components/Cart.vue';

export default {
  data() {
    return {
      isEdit: false,
    };
  },
  created() {},
  mounted() {
  },
  computed: {
    ...mapGetters('user', {
      totalNum: 'cartNum',
    }),
  },
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

.header-right {
  font-size:  14px;
}

.color-active {
  color: $color-default;
}
</style>