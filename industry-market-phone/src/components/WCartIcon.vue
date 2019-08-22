<!-- 消息图标 -->
<template lang='html'>
  <div class="w-cart" @click.stop="toCart()">
    <i class="iconfont icon-cart" :class="[color]">
      <i class="point" v-if="cartNum > 0">{{cartNum}}</i>
    </i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  computed: {
    ...mapGetters('user', {
      cartNum: 'cartNum',
    }),
  },
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
      default: '',
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
  color: $color-black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .23rem;
  line-height: 1;


  .iconfont {
    position: relative;
    width: auto;
    .point {
      background: $color-red;
      color: #fff;
      min-width: .15rem;
      height: .15rem;
      line-height: .15rem;
      border-radius: .15rem;
      position: absolute;
      top: -.02rem;
      left: 58%;
      font-size: .1rem;
      z-index: 10;
      padding: 0 .02rem;
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