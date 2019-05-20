import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from '../../../src/plugins/logger';

import addressbook from './modules/addressBook';
import hotel from './modules/home/hotel';
import knowledge from './modules/home/knowledge';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    addressbook,
    hotel,
    knowledge,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
