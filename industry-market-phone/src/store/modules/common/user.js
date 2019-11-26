import service from '@/services/common.service';
import userService from '@/services/user.service';
import Utils from '@/common/Utils';
// import router from '@/router';

/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '',
  customerId: process.env.NODE_ENV === 'production' ? '' : '766',
  cartNum: 0,
  userData: {}, // 用户信息
  role: 0, // 用户角色: 0 普通用户，1 开单员, 2 查看数据员
  isBind: 0, // 0 未绑定手机号码
  erweima: '',
  wxSetting: {},
  wxUserInfo: {},
  isShowRegisterModal: false, // 是否显示绑定手机号码弹窗
  isGetOpenid: false, // 是否显示launch图片
  analyzeUrl: '', // 大数据平台url
  refreshView: '', // 刷新页面的url
  refreshAllTab: false, // 是否全部刷新
  feedback: {},
  activityScrollTop: 0,
  homeScrollTop: 0,
};

// getters
const getters = {
  role: state => state.role,
  userData: state => state.userData,
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
  refreshView: state => state.refreshView,
  refreshAllTab: state => state.refreshAllTab,
  feedback: state => state.feedback,
  activityScrollTop: state => state.activityScrollTop,
  homeScrollTop: state => state.homeScrollTop,
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
  // 获取用户信息
  async getUserData({ commit }) {
    const result = await userService.getUserInfo({ userid: this.state.user.userId });
    if (!result) return;

    commit('updateUserData', result);

    if (result.role !== undefined) {
      // 更新用户信息 -- 用户角色
      commit('updateUserRole', result.role);
      Utils.saveLocalStorageItem('role', result.role);
    }

    if (result.isBind !== undefined) {
      Utils.saveLocalStorageItem('isBind', result.isBind);
      commit('updateIsBind', result.isBind);
    }
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  updateUserId(state, data) {
    state.userId = data;
  },
  updateUserData(state, data) {
    state.userData = data || {};
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
  updateRefreshView(state, data) {
    state.refreshView = data;
  },
  updateRefreshAllTab(state, data) {
    state.refreshAllTab = data;
  },
  updateFeedback(state, data) {
    state.feedback = data;
  },
  updateActivityScrollTop(state, data) {
    state.activityScrollTop = data || 0;
  },
  updateHomeScrollTop(state, data) {
    state.homeScrollTop = data || 0;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};