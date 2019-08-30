<!-- 登录 -->
<template lang='html'>
  <w-container>
    <!-- 背景 -->
    <!-- <div class="login-bg">
      <div class="bg">
        <img src="../assets/login/login-bg2.jpg" alt="">
      </div>
      <img src="../assets/login/wave.png" alt="" class="wave">
      <div class="logo">
        <img src="../assets/login/chint.png" alt="">
      </div>
    </div> -->
    <!-- 背景 end -->


    <div class="logo">
      <img src="../assets/login/chint.png" alt="">
    </div>

    <p class="logo-title">
      工业超市账号
    </p>

    <div class="login-container">
      <form autocomplete="off">
        <div class="login-form">
          <div class="form1"  v-show="loginType == 0">
            <div class="input-item">
              <i class="iconfont icon-my"></i>
              <input type="text" placeholder="请输入您的账号" v-model.trim="username">
            </div>

            <div class="input-item">
              <i class="iconfont icon-mima"></i>
              <input type="password" placeholder="请输入6-16位字符的密码" v-model="pwd" @keyup.enter="onLogin()">
            </div>
          </div>

          <div class="form2" v-show="loginType == 1">
            <div class="input-item">
              <i class="iconfont icon-my"></i>
              <input type="tel" placeholder="请输入您的手机号" v-model="phone">
            </div>

            <div class="input-item">
              <i class="iconfont icon-mima"></i>
              <input type="text" placeholder="请输入验证码" v-model.trim="code" @keyup.enter="onLogin()">
              <button class="plain-blue-btn" @click.stop="onSendCode()">
                <template v-if="sendTime == -1">
                  发送验证码
                </template>
                <template v-else>
                  {{ !isSendCode ? '重新发送' : sendTime }}
                </template>
              </button>
            </div>
          </div>
        </div>

        <p class="tip" @click.stop="onChangeLoginType()">
          {{loginType === 1 ? '账号密码登录' : '短信验证码登录'}}
        </p>

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
import userService from '@/services/user.service';

export default {
  data() {
    return {
      username: '',
      pwd: '',
      loading: false,
      phone: '', // 手机号码
      code: '', // 验证码
      isSendCode: false,
      sendTime: -1,
      defaultSendTime: 60,
      timer: null,
      loginType: 0, // 0: 密码登录, 1: 验证码登录
    };
  },
  created() {
    // const userid = Utils.getLocalStorageItem('userId');
    // if (userid) {
    //   // 登录过一次, 可以直接登录
    //   this.$store.commit('user/updateUserId', userid);
    //   this.$store.commit('user/updateCustomerId', Utils.getLocalStorageItem('customerId') || '');
    //   this.$store.commit('user/updateIsBind', Utils.getLocalStorageItem('isBind') || 0);
    //   this.$router.push('/market?tab=home');
    // }
  },
  mounted() {},
  components: {},
  methods: {
    onChangeLoginType() {
      if (this.loginType === 1) {
        this.loginType = 0;
        return;
      }

      this.loginType = 1;
    },
    // 发送验证码
    async onSendCode() {
      if (!this.phone) {
        Utils.showToast('请先输入手机号码');
        return;
      }

      if (!Utils.checkPhoneNum(this.phone)) {
        Utils.showToast('手机号码格式错误');
        return;
      }

      if (this.isSendCode) return;
      this.isSendCode = true;

      this.sendTime = this.defaultSendTime;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        this.countDown();
      }, 1000);

      const result = await userService.sendVerifyCode({ mobile: this.phone });
      if (!result) {
        // 发送验证码错误
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
      Utils.showToast('发送验证码成功');
    },
    countDown() {
      if (this.sendTime > 0) {
        this.sendTime -= 1;
        return;
      }

      clearInterval(this.timer);
      this.timer = null;
      this.isSendCode = false;
    },
    // 登录
    async onLogin() {
      let result;
      if (this.loginType === 0) {
        // 密码登录
        if (!this.username) {
          Utils.showToast('请输入您的账号');
          return;
        }

        if (!this.pwd) {
          Utils.showToast('请输入6-16位字符的密码');
          return;
        }

        if (this.pwd.length < 6 || this.pwd.length > 16) {
          Utils.showToast('请输入6-16位字符的密码');
          return;
        }

        if (this.loading) return;
        Utils.showLoading();
        this.loading = true;

        result = await service.login(this.username, this.pwd);
      } else {
        // 验证码登录
        if (!this.phone) {
          Utils.showToast('请输入您的手机号');
          return;
        }

        if (!Utils.checkPhoneNum(this.phone)) {
          Utils.showToast('手机号格式错误');
          return;
        }

        if (!this.code) {
          Utils.showToast('请输入验证码');
          return;
        }

        if (this.loading) return;
        Utils.showLoading();
        this.loading = true;

        result = await service.loginByCode(this.phone, this.code);
      }

      this.loading = false;
      if (!result) {
        // 请求成功
        return;
      }
      Utils.hideLoading();
      // 更新用户id
      this.$store.commit('user/updateUserId', result.userid);
      this.$store.commit('user/updateCustomerId', result.clientId);
      this.$store.commit('user/updateIsBind', result.isBind);
      // 将数据存储在本地, 自动登录使用
      Utils.saveLocalStorageItem('userId', result.userid);
      Utils.saveLocalStorageItem('customerId', result.clientId);
      Utils.saveLocalStorageItem('isBind', result.isBind);
      Utils.showToast('登录成功');
      this.$router.push('/market?tab=home');
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
    max-height: 30vh;
    min-height: .2rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
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

}

.logo {
  // position: absolute;
  // bottom: -.4rem;
  // left: 50%;
  // z-index: 10;
  margin: 0 auto;
  margin-top: .5rem;
  width: .8rem;
  height: .8rem;
  min-width: .3rem;
  min-height: .3rem;
  border-radius: 1rem;
  background: $color-blue;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 .1rem;
  img {
    width: 100%;
  }
}

.logo-title {
  text-align: center;
  line-height: .2rem;
  margin-top: .15rem;
  font-size: 18px;
  font-weight: 700;
}

.login-container {
  width: 93%;
  margin: 0 auto;
  margin-top: 7vh;
  .input-item {
    width: 100%;
    margin-top: .1rem;
    border-bottom: .01rem solid $color-blue;
    display: flex;
    align-items: center;

    .iconfont {
      color: $color-blue;
      border: .01rem solid $color-blue;
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

    button {
      width: .8rem;
      font-size:  12px;
      height: .3rem;
      margin-left: .05rem;
    }
  }

  .blue-btn {
    margin-top: 5%;
    border-radius: .4rem;
    // width: 65%;
    height: 10vh;
    font-size:  14px;
    max-height: .35rem;
    min-height: .2rem;
  }

  .tip {
    padding: .12rem 0 .1rem;
    font-size:  12px;
    color: $color-grey;
  }
} // login-container

</style>