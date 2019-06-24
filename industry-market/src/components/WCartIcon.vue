<!-- 消息图标 -->
<template lang='html'>
  <div class="w-cart" @click.stop="toCart()">
    <i class="iconfont icon-cart" :class="[color]">
      <!-- <i class="point"></i> -->
    </i>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    toCart() {
      if (!this.currentPath) {
        this.$router.push('cart');
        return;
      }

      this.$router.push(`${this.currentPath}/cart`);
    },
  },
  props: {
    color: {
      type: String,
      default: 'white',
    },
    currentPath: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-cart {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  line-height: 1;


  .iconfont {
    position: relative;
    width: auto;
    color: $color-blue;
    .point {
      width: .06rem;
      height: .06rem;
      border-radius: .06rem;
      background: $color-red;
      position: absolute;
      right: -.01rem;
      top: 0;
      z-index: 10;
    }

    &.white {
      color: #fff;
    }

    &.blue {
      color: $color-blue;
    }
  }
}
</style>