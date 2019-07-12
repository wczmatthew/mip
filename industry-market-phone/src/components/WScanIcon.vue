<!-- 消息图标 -->
<template lang='html'>
  <div class="w-icon" @click.stop="toScan()">
    <i class="iconfont icon-scan" :class="[color]"></i>
    <!-- <p>扫一扫</p> -->
  </div>
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    // 打开扫一扫界面
    toScan() {
      // TODO:
      try {
        // eslint-disable-next-line
        native_listen('goToUrl', { url: '' });
      } catch (error) {
        Utils.showToast('敬请期待');
      }
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

.w-icon {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: .23rem;
  line-height: 1;


  .iconfont {
    position: relative;
    width: auto;
    font-size: .2rem;
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

  p {
    font-size: .1rem;
    text-align: center;
    margin-top: .05rem;
  }
}
</style>