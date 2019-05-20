<!-- 登录 -->
<template lang='html'>
  <w-container>
    <!-- 背景 -->
    <div class="login-bg">
      <div class="bg">
        <img src="../assets/login/login-bg.jpg" alt="">
      </div>
      <img src="../assets/login/wave.png" alt="" class="wave">
      <div class="logo">
        <img src="../assets/login/chint.png" alt="">
      </div>
    </div>
    <!-- 背景 end -->


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
.login-bg {
  width: 100%;
  position: relative;

  .bg {
    height: 1.6rem;
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .logo {
    position: absolute;
    bottom: -.5rem;
    left: 50%;
    margin-left: -.5rem;
    z-index: 10;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background: $color-blue;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .05rem;
    img {
      width: 100%;
    }
  }
}

</style>