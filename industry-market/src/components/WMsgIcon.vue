<!-- 消息图标 -->
<template lang='html'>
  <div class="w-msg">
    <i class="iconfont icon-xiaoxi" :class="[color]">
      <i class="point"></i>
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
  methods: {},
  props: {
    color: {
      type: String,
      default: 'white',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-msg {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .22rem;
  line-height: 1;


  .iconfont {
    position: relative;
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