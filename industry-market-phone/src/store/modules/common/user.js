import service from '@/services/common.service';
import Utils from '@/common/Utils';
import banner from '@/assets/home/banner.png';

/**
 * 用户相关数据存储区域
 */
const state = {
  userId: process.env.NODE_ENV === 'production' ? '' : '',
  customerId: process.env.NODE_ENV === 'production' ? '' : '766',
  cartNum: 0,
  isBind: 0,
  erweima: 'https://open.weixin.qq.com/qr/code?username=gh_18efc5314db6',
  // userId: '',
  wxSetting: {},
  wxUserInfo: {},
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

    const wxopenid = Utils.getCookie('wxopenid');
    const accessCode = Utils.GetQueryString('code');
    // eslint-disable-next-line
    // alert(`code: ${accessCode}`);
    if (!wxopenid) {
      if (!accessCode) {
        const fromurl = window.location.href;
        // eslint-disable-next-line
        const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ result.appId +'&redirect_uri=' + encodeURIComponent(fromurl) +'&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

        window.location.href = url;
      } else {
        const wxRes = await service.getWxOpenid({ code: Utils.GetQueryString('code') });
        // eslint-disable-next-line
        // alert(`openid: ${wxRes.openId} , assessToken: ${wxRes.accessToken}`);
        Utils.addCookie('wxopenid', wxRes.openId, 2);
        Utils.addCookie('wxaccessToken', wxRes.accessToken, 2);
        dispatch('getWxUserInfo', { openId: wxRes.openId, accessToken: wxRes.accessToken });
        // if (!wxRes) return;
      }
    } else {
      const wxaccessToken = Utils.getCookie('wxaccessToken');
      dispatch('getWxUserInfo', { openId: wxopenid, accessToken: wxaccessToken });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};