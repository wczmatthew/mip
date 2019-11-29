import Vue from 'vue';
import './plugins/axios';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import Utils from '@/common/Utils';

import WContainer from './components/WContainer.vue';
import NoData from './components/NoData.vue';
import WLoadingRow from './components/WLoadingRow.vue';
import WMsgIcon from './components/WMsgIcon.vue';
import WCartIcon from './components/WCartIcon.vue';
import WScanIcon from './components/WScanIcon.vue';
import WImg from './components/WImg.vue';
import WScroll from './components/WScroll.vue';
import WModal from './components/WModal.vue';
import WHeader from './components/WHeader.vue';
import WInput from './components/WInput.vue';

Vue.config.productionTip = false;

// 注册全局组件
Vue.component('w-container', WContainer);
Vue.component('no-data', NoData);
Vue.component('w-loading-row', WLoadingRow);
Vue.component('w-msg-icon', WMsgIcon);
Vue.component('w-cart-icon', WCartIcon);
Vue.component('w-scan-icon', WScanIcon);
Vue.component('w-img', WImg);
Vue.component('w-scroll', WScroll); // 上拉下拉组件
Vue.component('w-modal', WModal);
Vue.component('w-header', WHeader);
Vue.component('w-input', WInput);

// 引入directives文件夹下面的指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive;
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('./directives', false, /^\.\/.*\.js$/));
});

router.beforeEach((to, from, next) => {
  if (Utils.checkIsWeixin()) {
    // 微信浏览器
    if (process.env.NODE_ENV !== 'production') {
      next();
      return;
    }
    if (to.path === '/') {
      next();
      return;
    }

    const openid = Utils.getLocalStorageItem('wxopenid', true);
    try {
      if (openid && store.state.user.wxSetting.appId) {
        setTimeout(() => {
          store.commit('user/updateGetOpenid', true);
        }, 300);
        next();
        return;
      }

      const key = Utils.getLocalStorageItem('marketKey', true);
      if ((!key || key !== to.query.key) && to.query.key) {
        Utils.saveLocalStorageItem('marketKey', to.query.key || '', true);
      }

      const recId = Utils.getLocalStorageItem('marketRecId', true);
      if ((!recId || key !== to.query.recId) && to.query.recId) {
        Utils.saveLocalStorageItem('marketRecId', to.query.recId || '', true);
      }

      // 未获取openid
      next('/'); // 确保一定要调用 next()
    } catch (error) {
      const key = Utils.getLocalStorageItem('marketKey', true);
      if ((!key || key !== to.query.key) && to.query.key) {
        Utils.saveLocalStorageItem('marketKey', to.query.key || '', true);
      }

      const recId = Utils.getLocalStorageItem('marketRecId', true);
      if ((!recId || key !== to.query.recId) && to.query.recId) {
        Utils.saveLocalStorageItem('marketRecId', to.query.recId || '', true);
      }

      next('/'); // 确保一定要调用 next()
    }
    return;
  }

  // 非微信浏览器
  const userid = Utils.getLocalStorageItem('userId');
  if (userid && to.path === '/login') {
    // 登录过一次, 可以直接登录
    store.commit('user/updateUserId', userid);
    store.commit('user/updateCustomerId', Utils.getLocalStorageItem('customerId') || '');
    store.commit('user/updateIsBind', Utils.getLocalStorageItem('isBind') || 0);
    store.commit('user/updateUserRole', Utils.getLocalStorageItem('role') || 0);
    // this.$router.push('/market/home');

    try {
      // eslint-disable-next-line
      native_listen('login_success', userid);
    } catch (error) {
      // Utils.showToast('敬请期待');
    }
    next('/market/home'); // 确保一定要调用 next()
    return;
  }
  next(); // 确保一定要调用 next()
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');