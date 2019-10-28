<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName" mode="in-out">
      <router-view></router-view>
    </transition>

    <!-- 绑定手机弹窗 -->
    <register-modal ref="registerModal"></register-modal>
    <!-- 绑定手机弹窗 end -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  data() {
    return {
      transitionName: '',
      isFirstEnter: true,
      filterUrls: [
        '/register',
      ],
    };
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      if (to.query.key) {
        const key = Utils.getLocalStorageItem('marketKey', true);
        if (!key || key !== to.query.key) {
          Utils.saveLocalStorageItem('marketKey', this.$route.query.key || '', true);
        }
      }

      if (from.path === '/' && to.path === '/login') {
        this.transitionName = 'none';
        return;
      }

      if (to.path.indexOf('/index') >= 0) {
        this.transitionName = 'slide-right-half';
      } else if (to.path === '/market') {
        this.transitionName = 'none';
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right-half' : 'slide-left-half';
      }
    },
    isShowRegisterModal() {
      this.$refs.registerModal && this.$refs.registerModal.toggle(this.isShowRegisterModal);
    },
    isGetOpenid() {
      console.log('isGetOpenid', this.isGetOpenid);
      if (!this.isGetOpenid) return;

      const wxSetting = this.wxSetting;
      if (!wxSetting || !wxSetting.appId) return;

      /**
       * 微信的配置信息, 需要在获取openid之后进行,
       * 不然安卓就无法自定义分享内容
       * 这个bug原因未知, 如果是纯html则无这个问题
       */


      console.log('config before url: ', window.location.href);
      // eslint-disable-next-line
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxSetting.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: wxSetting.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxSetting.nonceStr, // 必填，生成签名的随机串
        signature: wxSetting.signature, // 必填，签名，见附录1
        jsApiList: [
          'scanQRCode',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      // eslint-disable-next-line
      wx.error((res) => {
        // alert(res);
        console.log(res);
      });

      // 需在用户可能点击分享按钮前就先调用
      // eslint-disable-next-line
      wx.ready(function () {
        const key = Utils.getLocalStorageItem('marketKey', true);
        const title = '工业超市';
        const desc = '欢迎使用工业超市~';
        const link = `${window.location.origin}${window.location.pathname}#/?key=${key}`;
        const imgUrl = 'https://ism.chint.com/logoapp.png';
        // 分享给朋友 -- updateAppMessageShareData 无效, 不知道为什么
        // eslint-disable-next-line
        wx.updateAppMessageShareData({
          title, // 分享标题
          desc, // 分享描述
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: () => {
            // 设置成功
            console.log('新版分享成功');
          },
        });


        // 分享到朋友圈
        // eslint-disable-next-line
        wx.updateTimelineShareData({
          title, // 分享标题
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: () => {
            // 设置成功
          },
        });

        console.log('配置分享成功');
      });


      Utils.removeLocalStorageItem('wxSetting', true);
    },
  },
  computed: {
    ...mapGetters('user', {
      isGetOpenid: 'isGetOpenid',
      isShowRegisterModal: 'isShowRegisterModal',
      wxSetting: 'wxSetting',
    }),
  },
  created() {},
  mounted() {
    const _this = this;
    window.addEventListener('popstate', () => {
      if (_this.$route.meta.notBack) {
        window.history.pushState(null, null, document.URL);
      }
    });

    const userid = Utils.getLocalStorageItem('userId');
    if (userid) {
      this.$store.commit('user/updateUserId', userid);
      this.$store.commit('user/updateCustomerId', Utils.getLocalStorageItem('customerId') || '');
      this.$store.commit('user/updateIsBind', Utils.getLocalStorageItem('isBind') || 0);
      this.$store.commit('user/updateUserRole', Utils.getLocalStorageItem('role') || 0);
    }

    /**
     * @param {String} errorMessage  错误信息
     * @param {String} scriptURI   出错的文件
     * @param {Long}  lineNumber   出错代码的行号
     * @param {Long}  columnNumber  出错代码的列号
     * @param {Object} errorObj    错误的详细信息，Anything
     */
    window.onerror = (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {
      console.log('错误信息：', errorMessage);
      console.log('出错文件：', scriptURI);
      console.log('出错行号：', lineNumber);
      console.log('出错列号：', columnNumber);
      console.log('错误详情：', errorObj);
    };
  },
  components: {
    RegisterModal,
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import '~@/styles/font/iconfont.css';
@import '~@/styles/common.css';
@import '~@/styles/cube.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// .slide-up-enter, .slide-down-leave-active {
//   // opacity: 0;
//   -webkit-transform: translate(0, 30%);
//   transform: translate(0, 30%);
// }
// .slide-up-leave-active, .slide-down-enter {
//   // opacity: 0;
//   -webkit-transform: translate(0, 30%);
//   transform: translate(0, 30%);
// }

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-half-enter, .slide-right-half-leave-active {
  opacity: 0;
  -webkit-transform: translate(30%, 0);
  transform: translate(30%, 0);
}
.slide-left-half-leave-active, .slide-right-half-enter {
  opacity: 0;
  -webkit-transform: translate(30%, 0);
  transform: translate(30%, 0);
}

.mint-indicator {
  position: relative;
  z-index: 99;
}

.mint-toast {
  max-width: 90%;
  width: max-content;
}
</style>
