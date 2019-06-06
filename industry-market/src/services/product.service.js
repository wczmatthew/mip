import { getHttp, postHttp } from '@/http';

export default {
  /**
   * 获取产品列表
   * @param pageNum 页码
   * @param pageSize 一页多少条
   * @param keyword 型号规格（模糊查询）
   * @param bnr 正序或者倒序排列
   */
  getProductList: ({ pageNum, pageSize, keyword, bnr }) => {
    const params = {
      pageNum,
      pageSize: pageSize || 10,
      bnr: bnr || '',
      keyword: keyword || '',
    };
    return postHttp({ url: '/productcenter/product/search', params });
  },
  /**
   * 获取前几个产品列表
   */
  getTopProducts: () => getHttp({ url: '/productcenter/product/getTopProduct' }),
  /**
   * 获取产品详情
   * @param bm 产品编号
   */
  getProductDetail: ({ bm }) => {
    const params = { bm };
    return getHttp({ url: '/productcenter/product/get', params });
  },
  /**
   * 获取区域货位列表
   * @param userid 用户id
   */
  getShelfList: ({ userid }) => {
    const params = {
      userid,
    };
    return postHttp({ url: '/productcenter/stock/getShelfList', params });
  },
  /**
   * 根据货位获取货架产品信息
   * @param userid 用户id
   * @param shelfId 货位id
   */
  getShelfProductList: ({ userid, shelfId }) => {
    const params = {
      userid,
      shelfId,
    };
    return postHttp({ url: '/productcenter/stock/getShelfProductList', params });
  },
  /**
   * 获取店内模式区域列表
   * @param userid 用户id
   */
  getTopShelfList: ({ userid }) => {
    const params = {
      userid,
    };
    return postHttp({ url: '/productcenter/stock/getTopShelfList', params });
  },
};