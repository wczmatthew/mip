import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/common/user';
import customer from './modules/customer';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    customer,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
