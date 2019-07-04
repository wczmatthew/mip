/**
 * 产品相关数据存储区域
 */
const state = {
  keywords: '', // 搜索关键字
};

// getters
const getters = {
  keywords: state => state.keywords,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新关键字
  updateKeywords(state, data) {
    state.keywords = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};