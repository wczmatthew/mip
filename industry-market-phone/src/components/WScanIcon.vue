<!-- 消息图标 -->
<template lang='html'>
  <div class="w-icon" @click.stop="toScan()">
    <i class="iconfont icon-scan" :class="[color]">
      <!-- <i class="point"></i> -->
    </i>
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

.w-icon {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .23rem;
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