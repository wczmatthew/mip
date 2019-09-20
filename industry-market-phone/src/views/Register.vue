<!-- 注册 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      注册关联
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <div class="logo">
      <img src="../assets/common/logo.png" alt="">
    </div>

    <p class="logo-title">
      智慧能源解决方案供应商
    </p>

    <div class="w-tableview">
      <div class="cell">
        <span class="title">
          联系人姓名
        </span>
        <input type="text" class="desc" placeholder="请输入联系人姓名" v-model.trim="name">
      </div>

      <div class="cell">
        <span class="title">
          手机号码
        </span>
        <input type="text" class="desc" placeholder="请输入手机号码" v-model.trim="phone">
      </div>

      <div class="cell">
        <span class="title">
          验证码
        </span>
        <input type="text" class="desc" placeholder="请输入验证码" v-model.trim="code">
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

    <p class="tip">
      PS: 密码默认为 123456
    </p>
    <!-- 正文内容 end -->

    <template #w-footer>
      <button class="bottom-btn gradient-btn" @click="onConfirm()">
        确定
      </button>
    </template>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      name: '', // 名称
      phone: '', // 手机号码
      code: '', // 验证码
      isSendCode: false,
      sendTime: -1,
      defaultSendTime: 60,
      timer: null,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
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

      const result = await service.sendVerifyCode({ mobile: this.phone });
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
    async onConfirm() {
      Utils.nativeCloseKeyboard();

      if (!this.name) {
        Utils.showToast('请输入联系人');
        return;
      }

      if (!this.phone) {
        Utils.showToast('请输入联系方式');
        return;
      }

      if (!Utils.checkPhoneNum(this.phone)) {
        Utils.showToast('联系方式格式错误');
        return;
      }

      if (!this.code) {
        Utils.showToast('请输入验证码');
        return;
      }

      Utils.showLoading();
      const params = {
        key: this.$route.query.key || '', // 商家id
        clientName: this.name, // 客户名称
        phone: this.phone, // 联系方式
        code: this.code, // 手机验证码
      };
      const result = await service.registerBindUser(params);
      if (!result) return;
      Utils.showToast('绑定成功');

      // 自动登录
      this.$store.commit('user/updateUserId', result.userid);
      this.$store.commit('user/updateCustomerId', result.clientId);
      this.$store.commit('user/updateIsBind', result.isBind);
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

.w-tableview {
  margin: 0 .12rem;
}

.w-tableview .cell {
  margin-left: 0;
  padding-left: .12rem;
}

.w-tableview .cell .title {
  width: .8rem;
  font-weight: 700;
  line-height: 1.3;
}

.w-tableview .cell .desc {
  text-align: left;
  color: $color-black;
}

.w-tableview .cell .plain-blue-btn {
  width: .8rem;
  font-size:  12px;
  height: .3rem;
  margin-left: .05rem;
}

.tip {
  font-size:  12px;
  padding: .1rem .12rem;
  color: $color-grey;
}

.bottom-btn,
.w-gradient-left-bg {
  @include background-left-gradient(#306cff, #01d1fd);
}
</style>