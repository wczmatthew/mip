/**
 * 收货地址相关数据存储区域
 */
const state = {
  selectAddress: {},
  updateAddress: {},
};

// getters
const getters = {
  selectAddress: state => state.selectAddress,
  updateAddress: state => state.updateAddress,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的地址信息
  updateSelectAddress(state, data) {
    state.selectAddress = { ...data };
  },
  // 更新选中的地址信息
  updateAddress(state, data) {
    state.updateAddress = { ...data };
  },
  // 重置选中的地址信息
  resetSelectAddress(state) {
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