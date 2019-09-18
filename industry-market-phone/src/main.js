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

router.beforeEach((to, from, next) => {
  // console.log('beforeEach: ', to.path);
  const userid = Utils.getLocalStorageItem('userId');
  if (userid && to.path === '/login') {
    // 登录过一次, 可以直接登录
    store.commit('user/updateUserId', userid);
    store.commit('user/updateCustomerId', Utils.getLocalStorageItem('customerId') || '');
    store.commit('user/updateIsBind', Utils.getLocalStorageItem('isBind') || 0);
    // this.$router.push('/market?tab=home');

    try {
      // eslint-disable-next-line
      native_listen('login_success', userid);
    } catch (error) {
      // Utils.showToast('敬请期待');
    }
    next('/market?tab=home'); // 确保一定要调用 next()
    return;
  }
  next(); // 确保一定要调用 next()
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
