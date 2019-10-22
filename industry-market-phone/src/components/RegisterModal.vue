<!-- 绑定弹窗 -->
<template lang='html'>
  <transition name="slide-up-toggle">
    <div class="w-container" v-show="isShow">
      <header class="w-header">
        <div class="w-header-mid">
          关联手机号码
        </div>
        <div class="header-right" @click="onClose()">
          <i class="iconfont icon-close"></i>
        </div>
      </header>

      <div class="w-content">
        <register-comp ref="register" isModal></register-comp>
      </div>

      <footer class="w-footer">
        <button class="bottom-btn gradient-btn" @click="onConfirm()">
          确定
        </button>
      </footer>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import RegisterComp from '@/components/RegisterComp.vue';
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      slideName: 'slide-up',
      isShow: false,
    };
  },
  created() {},
  mounted() {},
  components: {
    RegisterComp,
  },
  computed: {
    ...mapGetters('user', {
      userid: 'userId',
    }),
  },
  methods: {
    toggle(isShow) {
      this.isShow = isShow;
      this.slideName = isShow ? 'slide-up' : 'slide-down';
    },
    onClose() {
      this.$store.commit('user/toggleRegisterModal', false);
    },
    async onConfirm() {
      if (!this.$refs.register.validForm()) return;

      const formData = this.$refs.register.getFormData();

      Utils.showLoading();
      const params = {
        userid: this.userid || '', // 商家id
        clientName: formData.name, // 客户名称
        phone: formData.phone, // 联系方式
        code: formData.code, // 手机验证码
      };
      const result = await service.bindClientToEcp(params);
      if (!result) return;
      Utils.showToast('绑定成功');

      // 自动登录
      Utils.saveLocalStorageItem('isBind', result.isBind);
      this.$store.commit('user/updateIsBind', result.isBind);
      this.$store.commit('user/toggleRegisterModal', false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.bottom-btn,
.w-gradient-left-bg {
  @include background-left-gradient(#306cff, #01d1fd);
}

.w-header .header-right .iconfont {
  color: #306cff;
  font-size: .16rem;
  font-weight: 700;
}

.w-container {
  position: fixed;
  z-index: 9999;
  background: #fff;
  -webkit-transform: translateZ(1px);
  -moz-transform: translateZ(1px);
  -o-transform: translateZ(1px);
  transform: translateZ(1px);
}

.slide-up-toggle-enter-active {
  transition: all .3s ease;
}
.slide-up-toggle-enter, .slide-up-toggle-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>