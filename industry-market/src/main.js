import Vue from 'vue';
import './plugins/axios';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import WContainer from './components/WContainer.vue';
import NoData from './components/NoData.vue';
import WLoadingRow from './components/WLoadingRow.vue';

Vue.config.productionTip = false;

// 注册全局组件
Vue.component('w-container', WContainer);
Vue.component('no-data', NoData);
Vue.component('w-loading-row', WLoadingRow);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
