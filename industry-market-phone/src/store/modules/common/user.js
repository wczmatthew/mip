import service from '@/services/common.service';
import userService from '@/services/user.service';
import Utils from '@/common/Utils';
import banner from '@/assets/home/banner.png';
import router from '@/router';

/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '',
  customerId: process.env.NODE_ENV === 'production' ? '' : '766',
  cartNum: 0,
  isBind: 0, // 0 未绑定手机号码
  erweima: 'https://open.weixin.qq.com/qr/code?username=gh_18efc5314db6',
  // userId: '',
  wxSetting: {},
  wxUserInfo: {},
  isShowRegisterModal: false, // 是否显示绑定手机号码弹窗
};

// getters
const getters = {
  userId: state => state.userId,
  customerId: state => state.customerId,
  isBind: state => state.isBind,
  cartNum: state => state.cartNum,
  erweima: state => state.erweima,
  wxUserInfo: state => state.wxUserInfo,
  wxSetting: state => state.wxSetting,
  isShowRegisterModal: state => state.isShowRegisterModal,
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
    const result = await service.getSdShopcarCount({ userid: this.state.user.userId });
    if (!result) return;
    commit('updateErweima', result || 0);
  },
  async getWxSetting({ commit, dispatch }) {
    const result = await service.getWxSetting({ url: window.location.href });
    if (!result) return;
    commit('updateWxSetting', result || {});

    // eslint-disable-next-line
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: [
        'scanQRCode',
      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    // 需在用户可能点击分享按钮前就先调用
    // eslint-disable-next-line
    wx.ready(function () {
      const title = '工业超市';
      const desc = '';
      const link = `${window.location.origin}${window.location.pathname}#/market?tab=home`;
      const imgUrl = banner;
      // 分享给朋友
      // eslint-disable-next-line
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
          // 设置成功
        },
      });

      // 分享到朋友圈
      // eslint-disable-next-line
      wx.updateTimelineShareData({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
          // 设置成功
        },
      });
    });

    dispatch('getWxOpenid', result);

    // const wxopenid = Utils.getLocalStorageItem('wxopenid', true);
    // // eslint-disable-next-line
    // // alert(`code: ${accessCode}`);
    // if (!wxopenid) {
    //   dispatch('getWxOpenid', result);

    //   // if (!accessCode) {
    //   //   const fromurl = window.location.href;
    //   //   // eslint-disable-next-line
    //   //   const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ result.appId +'&redirect_uri=' + encodeURIComponent(fromurl) +'&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

    //   //   window.location.href = url;
    //   // } else {
    //   //   const wxRes = await service.getWxOpenid({ code: Utils.GetQueryString('code') });
    //   //   // eslint-disable-next-line
    //   //   // alert(`openid: ${wxRes.openId} , assessToken: ${wxRes.accessToken}`);
    //   //   // Utils.addCookie('wxopenid', wxRes.openId, 1.5);
    //   //   // Utils.addCookie('wxaccessToken', wxRes.accessToken, 1.5);
    //   //   Utils.saveLocalStorageItem('wxopenid', wxRes.openId, true);
    //   //   Utils.saveLocalStorageItem('wxaccessToken', wxRes.openId, true);
    //   //   Utils.saveLocalStorageItem('wxopenid-date', new Date(), true);

    //   //   // 获取openid成功, 获取用户信息以及进行登录操作
    //   //   dispatch('getWxUserInfo', { openId: wxRes.openId, accessToken: wxRes.accessToken });

    //   //   // 开始登录/注册
    //   //   dispatch('registerByOpenId', { openId: wxRes.openId });
    //   // }
    // } else {
    //   // 获取openid成功, 获取用户信息以及进行登录操作
    //   // 判断openid是否过期
    //   let openidDate = Utils.getLocalStorageItem('wxopenid-date', true);
    //   if (!openidDate) {
    //     // 未发现获取openid的时间, 默认已经过期
    //     dispatch('getWxOpenid', result);
    //     return;
    //   }

    //   openidDate = new Date(openidDate);
    //   const now = new Date();
    //   const timeDiff = now.getTime() - openidDate.getTime();
    //   const hour = timeDiff / (3600 * 1000);
    //   if (hour > 1.9) {
    //     // 表示超时, 2小时会超时, 未防止时间有点误差, 做1.9小时处理
    //     return;
    //   }

    //   // 未超时, 根据原来的token获取数据
    //   const wxaccessToken = Utils.getLocalStorageItem('wxaccessToken', true);
    //   dispatch('getWxUserInfo', { openId: wxopenid, accessToken: wxaccessToken });

    //   // 开始登录/注册
    //   dispatch('registerByOpenId', { openId: wxopenid });
    // }
  },
  // 获取openid和token
  async getWxOpenid({ dispatch }, data) {
    const accessCode = Utils.GetQueryString('code');
    if (!accessCode) {
      const fromurl = window.location.href;
      // eslint-disable-next-line
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ data.appId +'&redirect_uri=' + encodeURIComponent(fromurl) +'&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

      window.location.href = url;
    } else {
      const wxRes = await service.getWxOpenid({ code: Utils.GetQueryString('code') });

      if (!wxRes) return;
      Utils.saveLocalStorageItem('wxopenid', wxRes.openId, true);
      Utils.saveLocalStorageItem('wxaccessToken', wxRes.accessToken, true);
      Utils.saveLocalStorageItem('wxopenid-date', new Date(), true);

      // 获取openid成功, 获取用户信息以及进行登录操作
      dispatch('getWxUserInfo', { openId: wxRes.openId, accessToken: wxRes.accessToken });

      // 开始登录/注册
      dispatch('registerByOpenId', { openId: wxRes.openId });
    }
  },
  async getWxUserInfo({ commit }, data) {
    const result = await service.getWxUserInfo({ openId: data.openId, accessToken: data.accessToken });
    if (!result) return;
    if (result.errcode) {
      Utils.showToast('获取用户信息失败');
      return;
    }
    commit('updateWxUserInfo', result || {});
  },
  async registerByOpenId({ commit }, data) {
    const key = Utils.getLocalStorageItem('marketKey', true);
    console.log('key: ', key);

    const result = await userService.registerByOpenId({ openId: data.openId, key: key });

    // 替换浏览器的地址, 不更新页面
    const url = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
    window.history.pushState(null, null, url);

    if (!result) return;
    Utils.hideLoading();
    // 更新用户id
    commit('updateUserId', result.userid);
    commit('updateCustomerId', result.clientId);
    commit('updateIsBind', result.isBind);
    // 将数据存储在本地, 自动登录使用
    Utils.saveLocalStorageItem('userId', result.userid);
    Utils.saveLocalStorageItem('customerId', result.clientId);
    Utils.saveLocalStorageItem('isBind', result.isBind);
    Utils.showToast('登录成功');
    router.push('/market?tab=home');
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
  updateErweima(state, data) {
    state.erweima = data;
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};