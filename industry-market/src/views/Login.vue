<!-- 登录 -->
<template lang='html'>
  <w-container>
    <!-- 背景 -->
    <div class="login-bg">
      <div class="bg">
        <img src="../assets/login/login-bg2.jpg" alt="">
      </div>
      <img src="../assets/login/wave.png" alt="" class="wave">
      <div class="logo">
        <img src="../assets/login/chint.png" alt="">
      </div>
    </div>
    <!-- 背景 end -->

    <div class="login-container">
      <form autocomplete="off">
        <div class="input-item">
          <i class="iconfont icon-my"></i>
          <input type="text" placeholder="请输入您的账号" v-model="username">
        </div>

        <div class="input-item">
          <i class="iconfont icon-mima"></i>
          <input type="password" placeholder="请输入6-16位字符的密码" v-model="pwd">
        </div>

        <button type="button" class="blue-btn" @click="onLogin()">
          登录
        </button>
      </form>
    </div>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/login.service';

export default {
  data() {
    return {
      username: '',
      pwd: '',
      loading: false,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    // 登录
    async onLogin() {
      if (!this.username) {
        Utils.showToast('请输入您的账号');
        return;
      }

      if (!this.pwd) {
        Utils.showToast('"请输入6-16位字符的密码');
        return;
      }

      if (this.pwd.length < 6 || this.pwd.length > 16) {
        Utils.showToast('请输入6-16位字符的密码');
        return;
      }

      if (this.loading) return;
      Utils.showLoading();
      this.loading = true;

      const result = await service.login(this.username, this.pwd);
      this.loading = false;
      if (!result) {
        // 请求成功
        return;
      }
      Utils.hideLoading();
      // 更新用户id
      this.$store.commit('user/updateUserId', result.userid);
      Utils.showToast('登录成功');
      this.$router.push('/index');

      // setTimeout(() => {
      //   Utils.hideLoading();
      // }, 300);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.w-container {
  background: #fff;
}
.login-bg {
  width: 100%;
  position: relative;

  .bg {
    max-height: 35vh;
    min-height: .3rem;
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  .wave {
    position: absolute;
    bottom: -2px;
    left: 0;
    z-index: 10;
  }

  .logo {
    position: absolute;
    bottom: -10vh;
    left: 50%;
    margin-left: -10vh;
    z-index: 10;
    width: 20vh;
    min-width: .3rem;
    min-height: .3rem;
    height: 20vh;
    border-radius: 20vh;
    background: $default-color;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .05rem;
    img {
      width: 100%;
    }
  }
}

.login-container {
  width: 60%;
  margin: 0 auto;
  margin-top: 12vh;
  .input-item {
    width: 100%;
    margin-top: .1rem;
    border-bottom: .01rem solid $default-color;
    display: flex;
    align-items: center;

    .iconfont {
      color: $default-color;
      border: .01rem solid $default-color;
      width: .2rem;
      height: .2rem;
      border-radius: .2rem;
      text-align: center;
      line-height: .2rem;
      flex-shrink: 0;
    }

    input {
      height: 12vh;
      min-height: .2rem;
      max-height: .4rem;
      border: 0;
      margin-left: .1rem;
      flex: 1;
    }
  }

  .blue-btn {
    margin-top: 5%;
    border-radius: .4rem;
    width: 65%;
    height: 10vh;
    font-size: .14rem;
    max-height: .35rem;
    min-height: .2rem;
  }
} // login-container

</style>