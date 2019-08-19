<!-- 上拉加载下拉刷新组件 -->
<template lang='html'>
  <cube-scroll
    ref="cubescroll"
    class="scroll-view"
    :scroll-events="scrollEvents"
    @scroll="scrollHandler"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">

    <slot></slot>

  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '刷新成功',
        },
        pullUpLoad: {
          threshold: 60,
          txt: { more: '已无更多数据', noMore: '已无更多数据' },
        },
      },
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    scrollHandler({ y }) {
      this.$emit('scroll', { y });
    },
    scrollTo(x, y, time, ease) {
      this.$refs.cubescroll.scrollTo(x, y, time, ease || 'ease');
    },
    // 下拉刷新
    onPullingDown() {
      this.$emit('pulling-down');
    },
    scrollTop() {
      this.$refs.cubescroll.scrollTo(0, 0, 300, 'ease');
    },
    // 上拉加载
    onPullingUp() {
      this.$emit('pulling-up');
    },
    forceUpdate(data) {
      this.$refs.cubescroll.forceUpdate(data);
    },
  },
  props: {
    scrollEvents: {
      type: Array,
      default: () => ['scroll'],
    },
  },
};
</script>
<style lang="scss" scoped>
</style>