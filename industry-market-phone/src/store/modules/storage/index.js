/**
 * 库存相关数据存储区域
 */
const state = {
  editStorageItem: null,
};

// getters
const getters = {
  editStorageItem: state => state.editStorageItem,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的产品信息
  updateEditStorageItem(state, data) {
    state.editStorageItem = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};