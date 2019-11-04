<!-- 搜素页面的筛选tab -->
<template lang='html'>
  <div class="w-sort-area">
    <div class="item actived">
      综合排序
    </div>
    <div class="item">
      价格排序
      <div class="arrow">
        <i class="iconfont icon-sort-triangle-up"></i>
        <i class="iconfont icon-sort-triangle-down"></i>
      </div>
    </div>
    <div class="item">
      促销
    </div>
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
  },
};
</script>
<style lang="scss" scoped>

.w-sort-area {
  background: $color-bg;
}
</style>