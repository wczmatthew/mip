<!-- 404 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      找不到页面
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="logo">
      <img src="~@/assets/common/logo.png" alt="">
    </div>

    <p class="logo-title">
      智慧能源解决方案供应商
    </p>

    <i class="iconfont icon-404"></i>

    <p class="notfound-title">
      找不到对应页面啦
    </p>

    <p class="notfound-title">
      请联系管理员
    </p>

    <!-- 正文内容 end -->
  </w-container>
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
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.logo {
  margin: 0 auto;
  margin-top: 5vh;
  width: 50%;
  min-width: .3rem;
  min-height: .3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
}

.logo-title {
  text-align: center;
  line-height: .2rem;
  color: $color-grey;
  font-weight: 700;
  font-size: 12px;
  margin-top: .05rem;
  margin-bottom: 5vh;
}

.w-container {
  background: #fff;
}

.icon-404 {
  font-size: 1rem;
  margin: 0 auto;
  display: block;
  margin-bottom: .15rem;
  color: #259df9;
  text-align: center;
}

.notfound-title {
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 0 .12rem;
  margin-bottom: .1rem;
}

</style>