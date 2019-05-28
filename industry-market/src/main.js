import Vue from 'vue';
import './plugins/axios';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import WContainer from './components/WContainer.vue';
import NoData from './components/NoData.vue';
import WLoadingRow from './components/WLoadingRow.vue';
import WMsgIcon from './components/WMsgIcon.vue';
import WImg from './components/WImg.vue';

Vue.config.productionTip = false;

// 注册全局组件
Vue.component('w-container', WContainer);
Vue.component('no-data', NoData);
Vue.component('w-loading-row', WLoadingRow);
Vue.component('w-msg-icon', WMsgIcon);
Vue.component('w-img', WImg);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
