/**
 * 客户相关数据存储区域
 */
const state = {
  selectCustomer: {},
  customer: {},
};

// getters
const getters = {
  selectCustomer: state => state.selectCustomer,
  customer: state => state.customer,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的用户信息
  updateSelectCustomer(state, data) {
    state.selectCustomer = { ...data };
  },
  // 更新选中的用户信息
  updateCustomer(state, data) {
    state.customer = data;
  },
  // 重置选中的用户信息
  resetSelectCustomer(state) {
    state.selectCustomer = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};