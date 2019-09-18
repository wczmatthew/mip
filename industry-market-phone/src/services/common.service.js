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
};