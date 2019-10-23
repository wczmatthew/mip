import { postHttp } from '@/http';

export default {
  // 获取产品类型
  getSortList: () => postHttp({ url: '/productcenter/product/getSortList' }),
  /**
   * 获取问题和答案列表
   * @param clientId 客户id
   */
  getQuestionList: ({ clientId }) => {
    const params = { clientId };
    return postHttp({ url: '/contentcenter/content/getQuestionList', params });
  },
  /**
   * 获取购物单数量
   * @param userid 用户id
   */
  getSdShopcarCount: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/shopcar/getSdShopcarCount', params });
  },
  /**
   * 活动页接口
   * @param userid 用户id
   */
  getActivityPageItem: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/contentcenter/post/getActivityPageItem', params });
  },
  /**
   * 获取活动详细接口
   * @param postId 活动id
   */
  getActivityItem: ({ postId }) => {
    const params = { postId };
    return postHttp({ url: '/contentcenter/post/getActivityItem', params });
  },
  /**
   * 获取微信配置
   * @params url 当前路径
   */
  getWxSetting: ({ url, key }) => {
    const params = { url, key };
    return postHttp({ url: '/usercenter/user/getWxSetting', params });
  },
  /**
   * 获取微信code
   * @params code 微信code
   */
  getWxOpenid: ({ code, key }) => {
    const params = { code, key };
    return postHttp({ url: '/usercenter/user/getOpenId', params });
  },
  /**
   * 获取微信用户信息
   * @params openId
   * @params accessToken
   */
  getWxUserInfo: ({ openId, accessToken }) => {
    const params = { openId, accessToken };
    return postHttp({ url: '/usercenter/user/getWxUserInfo', params });
  },
  /**
   * 获取大数据页面url地址
   * @param userid 用户id
   */
  getBigDataUrl: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/data/getBigDataUrl', params });
  },
};