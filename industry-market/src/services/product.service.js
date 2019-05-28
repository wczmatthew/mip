import { getHttp } from '@/http';

export default {
  /**
   * 获取产品列表
   * @param pageNum 页码
   * @param pageSize 一页多少条
   * @param orderByColumn pc表示热门
   * @param isAsc 正序或者倒序排列
   */
  getProductList: ({ pageNum, pageSize, orderByColumn, isAsc }) => {
    const params = {
      pageNum,
      pageSize: pageSize || 10,
      orderByColumn: orderByColumn || 'pc',
      isAsc: isAsc || 'desc',
    };
    return getHttp({ url: '/productcenter/product/search', params });
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
};