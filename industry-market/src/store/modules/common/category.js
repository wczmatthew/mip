import service from '@/services/common.service';

/**
 * 用户相关数据存储区域
 */
const state = {
  sortList: [],
};

// getters
const getters = {
  sortList: state => state.sortList,
};

// actions -- 接口调用方法
const actions = {
  // 获取客户销售区域
  async getSortList({ commit }) {
    if (this.state.category.sortList.length) return;
    const result = await service.getSortList();
    if (!result) return;
    commit('updateSortList', result);
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新销售区域数据
  updateSortList(state, data) {
    state.sortList = [...data];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};