/**
 * 订单相关数据存储区域
 */
const state = {
  selectProducts: [], // 下单的产品列表
  orderData: null, // { index: 数组下标, item: 内容 }
};

// getters
const getters = {
  selectProducts: state => state.selectProducts,
  orderData: state => state.orderData,
};

// actions -- 接口调用方法
const actions = {
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新选中的产品信息
  updateSelectProducts(state, data) {
    state.selectProducts = data || [];
  },
  // 更新选中产品中某个产品信息
  updateSelectProductsByIndex(state, data) {
    if (data.index < 0 && data.index >= state.selectProducts.length) return;
    const list = [...state.selectProducts];
    list[data.index] = data.product;
    state.selectProducts = list;
  },
  // 更新查看的订单信息
  updateOrderData(state, data) {
    if (data) {
      state.orderData = { ...state.orderData, ...data };
      return;
    }

    state.orderData = null;
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