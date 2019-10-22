<!-- 注册 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      注册关联
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <register-comp ref="register"></register-comp>

    <!-- <div class="logo">
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
    </p> -->
    <!-- 正文内容 end -->

    <template #w-footer>
      <button class="bottom-btn gradient-btn" @click="onConfirm()">
        确定
      </button>
    </template>
  </w-container>
</template>
<script>
import RegisterComp from '@/components/RegisterComp.vue';
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
  components: {
    RegisterComp,
  },
  methods: {
    async onConfirm() {
      if (!this.$refs.register.validForm()) return;

      const formData = this.$refs.register.getFormData();

      Utils.showLoading();
      const params = {
        key: this.$route.query.key || '', // 商家id
        clientName: formData.name, // 客户名称
        phone: formData.phone, // 联系方式
        code: formData.code, // 手机验证码
      };
      const result = await service.registerBindUser(params);
      if (!result) return;
      Utils.showToast('绑定成功');

      // 自动登录
      this.$store.commit('user/updateUserId', result.userid);
      this.$store.commit('user/updateCustomerId', result.clientId);
      this.$store.commit('user/updateIsBind', result.isBind);
      this.$store.commit('user/updateUserRole', result.role);
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

.bottom-btn,
.w-gradient-left-bg {
  @include background-left-gradient(#306cff, #01d1fd);
}
</style>