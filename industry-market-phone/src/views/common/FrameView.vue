<!-- 其他页面 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      {{title}}
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <iframe :src="url" frameborder="0" class="w-content"></iframe>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
export default {
  data() {
    return {
      title: '大数据分析',
      url: 'http://10.5.151.147:8080/dist/index.html#/plan/OlFIbMrFEGC7TeRiOQAnJXKUFtgvM3uUYYHq2z5GiGgbgNAS+qqeZHuq7yVhL+s6',
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>