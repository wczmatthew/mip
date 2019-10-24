import service from '@/services/common.service';
// import userService from '@/services/user.service';
// import Utils from '@/common/Utils';
// import router from '@/router';

/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '',
  customerId: process.env.NODE_ENV === 'production' ? '' : '766',
  cartNum: 0,
  role: 0, // 用户角色: 0 普通用户，1 开单员, 2 查看数据员
  isBind: 0, // 0 未绑定手机号码
  erweima: '',
  // userId: '',
  wxSetting: {},
  wxUserInfo: {},
  isShowRegisterModal: false, // 是否显示绑定手机号码弹窗
  isGetOpenid: false, // 是否显示launch图片
  analyzeUrl: '', // 大数据平台url
};

// getters
const getters = {
  role: state => state.role,
  userId: state => state.userId,
  customerId: state => state.customerId,
  isBind: state => state.isBind,
  cartNum: state => state.cartNum,
  erweima: state => state.erweima,
  wxUserInfo: state => state.wxUserInfo,
  wxSetting: state => state.wxSetting,
  isShowRegisterModal: state => state.isShowRegisterModal,
  isGetOpenid: state => state.isGetOpenid,
  analyzeUrl: state => state.analyzeUrl,
};

// actions -- 接口调用方法
const actions = {
  async getCartNum({ commit }) {
    if (!this.state.user.userId) return;
    const result = await service.getSdShopcarCount({ userid: this.state.user.userId });
    if (!result) return;
    commit('updateCartNum', result.shopcarCount || 0);
  },
  async getErweima({ commit }) {
    const result = await service.getWxPlatQR({ userid: this.state.user.userId });
    if (!result) return;
    commit('updateErweima', result || '');
  },
  async getBigDataUrl({ commit }) {
    const result = await service.getBigDataUrl({ userid: this.state.user.userId });
    if (!result) return;
    commit('updateAnalyzeUrl', result || '');
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  updateUserId(state, data) {
    state.userId = data;
  },
  updateUserRole(state, data) {
    state.role = data;
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
  updateErweima(state, data) {
    state.erweima = data || 'https://open.weixin.qq.com/qr/code?username=gh_18efc5314db6';
  },
  updateWxSetting(state, data) {
    state.wxSetting = data;
  },
  updateWxUserInfo(state, data) {
    state.wxUserInfo = data;
  },
  toggleRegisterModal(state, data) {
    state.isShowRegisterModal = data;
  },
  updateGetOpenid(state, data) {
    state.isGetOpenid = data;
  },
  updateAnalyzeUrl(state, data) {
    state.analyzeUrl = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};