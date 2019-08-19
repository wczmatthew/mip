import service from '@/services/common.service';

/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '100001581',
  customerId: process.env.NODE_ENV === 'production' ? '' : '766',
  cartNum: 0,
  isBind: 0,
  // userId: '',
};

// getters
const getters = {
  userId: state => state.userId,
  customerId: state => state.customerId,
  isBind: state => state.isBind,
  cartNum: state => state.cartNum,
};

// actions -- 接口调用方法
const actions = {
  async getCartNum({ commit }) {
    const result = await service.getSdShopcarCount({ userid: this.state.user.userId });
    if (!result) return;
    commit('updateCartNum', result.shopcarCount || 0);
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  updateUserId(state, data) {
    state.userId = data;
  },
  updateCustomerId(state, data) {
    state.customerId = data;
  },
  updateIsBind(state, data) {
    state.isBind = data;
  },
  updateCartNum(state, data) {
    state.cartNum = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};