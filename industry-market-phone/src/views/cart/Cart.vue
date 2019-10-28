<!--  -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      购物单({{cartNum}})
    </template>
    <template #header-right>
      <div class="header-right" :class="{'color-active': isEdit }" @click="onEdit()">
        {{ isEdit ? '完成' : '管理' }}
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <cart :current-path="routePath" ref="cart"></cart>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import Cart from './components/Cart.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'cart' }),
      isEdit: false,
    };
  },
  created() {},
  mounted() {
  },
  watch: {
    '$route'(to) {
      if (to.path === this.routePath && this.$refs.cart) {
        // 重新进入页面
        this.$refs.cart.$data.isFirstLoading = true;
        this.$refs.cart.onPullingDown();
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      cartNum: 'cartNum',
    }),
  },
  components: {
    Cart,
  },
  methods: {
    getTotalNum(totalNum) {
      this.totalNum = totalNum;
    },
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

.color-active {
  color: $color-default;
}
</style>