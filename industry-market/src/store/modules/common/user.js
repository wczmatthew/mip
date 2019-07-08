/**
 * 用户相关数据存储区域
 */
const state = {
  // userId: '',
  userId: process.env.NODE_ENV === 'production' ? '' : '100001581',
};

// getters
const getters = {
  userId: state => state.userId,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  updateUserId(state, data) {
    state.userId = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};