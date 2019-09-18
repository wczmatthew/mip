import service from '@/services/product.service';

/**
 * 热门搜索
 */
const state = {
  keywordsList: [
    { name: '接触器' },
    { name: '断路器' },
    { name: '高压电流互感器' },
    { name: '变压器' },
    { name: '浴霸产品' },
    { name: '电工产品' },
  ], // 搜索关键字
};

// getters
const getters = {
  keywordsList: state => state.keywordsList,
};

// actions -- 接口调用方法
const actions = {
  async getHotKeywordList({ commit }) {
    const result = await service.getHotKeywordList();
    if (!result) return;
    commit('updateKeywordsList', result);
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新关键字
  updateKeywordsList(state, data) {
    state.keywordsList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};