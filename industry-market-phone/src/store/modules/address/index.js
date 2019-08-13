/**
 * 收货地址相关数据存储区域
 */
const state = {
  selectAddress: {},
};

// getters
const getters = {
  selectAddress: state => state.selectAddress,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的用户信息
  updateSelectAddress(state, data) {
    state.selectAddress = { ...data };
  },
  // 重置选中的用户信息
  resetSelectCustomer(state) {
    state.selectAddress = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};