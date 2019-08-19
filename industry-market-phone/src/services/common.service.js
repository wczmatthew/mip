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
   * 获取购物车数量
   * @param userid 用户id
   */
  getSdShopcarCount: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/shopcar/getSdShopcarCount', params });
  },
};