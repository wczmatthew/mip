/**
 * 订单地址相关数据存储区域
 */
const state = {
  selectProducts: [], // 下单的产品列表
};

// getters
const getters = {
  selectProducts: state => state.selectProducts,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的产品信息
  updateSelectProducts(state, data) {
    state.selectProducts = [...data];
  },
  // 重置选中的产品信息
  resetSelectProducts(state) {
    state.selectProducts = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};