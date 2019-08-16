/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '100001581',
  customerId: process.env.NODE_ENV === 'production' ? '' : '100001581',
  // userId: '',
};

// getters
const getters = {
  userId: state => state.userId,
  customerId: state => state.customerId,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  updateUserId(state, data) {
    state.userId = data;
  },
  updateCustomerId(state, data) {
    state.customerId = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};