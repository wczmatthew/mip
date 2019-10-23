<!-- 微信加载页面 -->
<template lang='html'>
  <img src="~@/assets/common/launch.png" alt="" class="launch">
</template>
<script>
import { mapGetters } from 'vuex';
import service from '@/services/common.service';
import userService from '@/services/user.service';
import Utils from '@/common/Utils';
import VConsole from 'vconsole';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('user', {
      isGetOpenid: 'isGetOpenid',
    }),
  },
  created() {},
  mounted() {
    if (this.$route.query.vconsole) {
      // eslint-disable-next-line
      new VConsole();
    }

    if (Utils.checkIsWeixin()) {
      this.$store.commit('user/updateGetOpenid', false);

      const key = Utils.getLocalStorageItem('marketKey', true);
      if ((!key || key !== this.$route.query.key) && this.$route.query.key) {
        Utils.saveLocalStorageItem('marketKey', this.$route.query.key || '', true);
      }
      // this.$store.dispatch('user/getWxSetting');
      this.getWxSetting();
    } else {
      // 不是微信浏览器, 直接进入登陆页面
      this.$router.push('/login');
    }
  },
  components: {},
  methods: {
    async getWxSetting() {
      let urlList = window.location.href.split('.html');
      if (Utils.is_ios()) {
        urlList = window.location.href.split('#');
      }
      // const urlList = window.location.href.split('?code');
      let url = window.location.href;
      if (urlList.length) {
        url = `${urlList[0]}.html`;
        if (Utils.is_ios()) {
          url = urlList[0];
        }
      }
      const result = await service.getWxSetting({ url: encodeURIComponent(url), key: Utils.getLocalStorageItem('marketKey', true) });
      if (!result) return;
      // Utils.saveLocalStorageItem('wxSetting', JSON.stringify(result || ''), true);
      this.$store.commit('user/updateWxSetting', result);

      this.getWxOpenid(result);
    },
    // 获取openid和token
    async getWxOpenid(result) {
      const accessCode = Utils.GetQueryString('code');
      if (!accessCode) {
        const fromurl = window.location.href;
        // eslint-disable-next-line
        const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ result.appId +'&redirect_uri=' + encodeURIComponent(fromurl) +'&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

        window.location.href = url;
      } else {
        const wxRes = await service.getWxOpenid({ code: Utils.GetQueryString('code'), key: Utils.getLocalStorageItem('marketKey', true) });

        if (!wxRes) return;
        Utils.saveLocalStorageItem('wxopenid', wxRes.openId, true);
        Utils.saveLocalStorageItem('wxaccessToken', wxRes.accessToken, true);
        Utils.saveLocalStorageItem('wxopenid-date', new Date(), true);

        // Utils.removeLocalStorageItem('wxSetting', true);

        setTimeout(() => {
          this.$store.commit('user/updateGetOpenid', true);
        }, 500);

        // 获取openid成功, 获取用户信息以及进行登录操作
        // dispatch('getWxUserInfo', { openId: wxRes.openId, accessToken: wxRes.accessToken });
        this.getWxUserInfo({ openId: wxRes.openId, accessToken: wxRes.accessToken });

        // 开始登录/注册
        this.registerByOpenId({ openId: wxRes.openId });
      }
    },
    async getWxUserInfo(data) {
      const result = await service.getWxUserInfo({ openId: data.openId, accessToken: data.accessToken });
      if (!result) return;
      if (result.errcode) {
        Utils.showToast('获取用户信息失败');
        return;
      }
      this.$store.commit('user/updateWxUserInfo', result || {});
    },
    async registerByOpenId(data) {
      const key = Utils.getLocalStorageItem('marketKey', true);
      // console.log('key: ', key);

      const result = await userService.registerByOpenId({ openId: data.openId, key: key });

      // 替换浏览器的地址, 不更新页面
      const url = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
      window.history.pushState(null, null, url);

      if (!result) return;
      Utils.hideLoading();
      // 更新用户id
      this.$store.commit('user/updateUserId', result.userid);
      this.$store.commit('user/updateCustomerId', result.clientId);
      this.$store.commit('user/updateIsBind', result.isBind);
      this.$store.commit('user/updateUserRole', result.role);
      // 将数据存储在本地, 自动登录使用
      Utils.saveLocalStorageItem('userId', result.userid);
      Utils.saveLocalStorageItem('customerId', result.clientId);
      Utils.saveLocalStorageItem('isBind', result.isBind);
      Utils.saveLocalStorageItem('role', result.role);
      Utils.showToast('登录成功');
      this.$router.push('/market?tab=home');
    },
  },
};
</script>
<style lang="scss" scoped>
.launch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 888;
}
</style>