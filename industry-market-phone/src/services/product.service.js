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
    if (!userid) return '';
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
    if (!userid) return '';
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
    if (!userid) return '';
    const params = {
      userid,
    };
    return postHttp({ url: '/productcenter/stock/getTopShelfList', params });
  },
  // 获取产品选型类型
  getSelectSortList: () => postHttp({ url: '/productcenter/product/getSelectSortList' }),
  /**
   * 获取产品选型数据
   */
  productSelectInfo: ({ userid, seriesId }) => postHttp({ url: '/productcenter/product/productSelectInfo', params: { seriesId, userid } }),
  /**
   * 获取产品选型选项状态
   * @param x 当前属性x坐标
   * @param y 当前属性y坐标
   * @param sbX 同标题下面的上一个属性x坐标
   * @param sbY 同标题下面的上一个属性y坐标
   * @param action add\remove 点击已选属性用remove，点击非已选add（为了简单，暂时不给用户取消属性的选项了）
   * @param sessionId productSelectInfo接口返回的sessionId
   */
  propertyChange: ({ x, y, sbX, sbY, action, sessionId }) => {
    const params = {
      x, y, sbX, sbY, action, sessionId,
    };
    return postHttp({ url: '/productcenter/product/propertyChange', params });
  },
  /**
   * 获取产品选型的产品信息
   * @param sku 选择的所有属性, ',' 分割
   * @param seriesId 产品系列id
   */
  getSelectProductDetail: ({ sku, seriesId, userid }) => {
    const params = {
      sku, seriesId, userid,
    };
    return postHttp({ url: '/productcenter/product/getSelectProductDetail', params });
  },
};