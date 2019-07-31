import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/common/user';
import options from './modules/common/options';
import category from './modules/common/category';
import customer from './modules/customer';
import product from './modules/product';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    customer,
    options,
    category,
    product,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
