/**
 * 客户相关数据存储区域
 */
const state = {
  selectCustomer: {}, // 选择的客户信息
  updateCustomer: {}, // 编辑/需要更新客户址信息
};

// getters
const getters = {
  selectCustomer: state => state.selectCustomer,
  updateCustomer: state => state.updateCustomer,
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
    state.updateCustomer = data;
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