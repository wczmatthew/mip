<!--  -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      {{ $route.query.title || '联系我们'}}
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="logo">
      <img src="~@/assets/common/logo.png" alt="">
    </div>

    <p class="logo-title">
      智慧能源解决方案供应商
    </p>

    <p class="contact-title">
      服务时间: 法定工作日 8:00 ~ 16:00
    </p>

    <p class="contact-title" style="margin-top: .3rem">
      售前/售后咨询:
    </p>
    <a href="tel:4008177777" class="tel">
      <i class="iconfont icon-kefu"></i>
      400 817 7777
    </a>

    <p class="contact-title">
      平台应用运维资讯:
    </p>
    <a href="tel:13777777777" class="tel">
      <i class="iconfont icon-kefu"></i>
      13777777777 转 709377
    </a>
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

.w-container {
  background: #fff;
}
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

.contact-title {
  text-align: center;
  padding: 0 .12rem;
  line-height: 1.2;
  font-size: 16px;
  margin-top: .2rem;
}

.tel {
  margin: .1rem auto;
  border: 1px solid $color-blue;
  color: $color-blue;
  width: fit-content;
  min-height: .25rem;
  border-radius: .25rem;
  @include flex-center;
  font-size: 16px;
  padding: .05rem .1rem;
  max-width: 80%;
  @include break-word;

  .iconfont {
    margin-right: .1rem;
    font-size: 20px;
  }
}

</style>