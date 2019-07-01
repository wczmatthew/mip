/**
 * 客户相关数据存储区域
 */
const state = {
  selectCustomer: {},
  customer: {},
  rateCustomer: {},
};

// getters
const getters = {
  selectCustomer: state => state.selectCustomer, // 选择的客户
  customer: state => state.customer, // 编辑, 新增的客户信息
  rateCustomer: state => state.rateCustomer, // 优惠率客户
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
  // 更新关联的优惠率客户信息
  updateSelectRateCustomer(state, data) {
    state.rateCustomer = { ...data };
  },
  // 更新选中的用户信息
  updateCustomer(state, data) {
    state.customer = { ...data };
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