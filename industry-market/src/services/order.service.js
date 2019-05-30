import { getHttp, postHttp } from '@/http';

export default {
  /**
   * 加入购物车
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   */
  addCart: ({ userid, bm, qty }) => {
    const params = { userid, bm, qty };
    return getHttp({ url: '/ordercenter/shopcar/addToShopCar', params });
  },
  /**
   * 加入收藏夹
   * @param userid 用户id
   * @param bm 产品编号
   */
  addCollect: ({ userid, bm }) => {
    const params = { userid, bm, qty: 1 };
    return getHttp({ url: '/ordercenter/shopcar/addToCollect', params });
  },
  /**
   * 取消收藏
   * @param userid 用户id
   * @param bm 产品编号
   */
  deleteCollect: ({ userid, bm }) => {
    const params = { userid, bm };
    return getHttp({ url: '/ordercenter/shopcar/deleteCollect', params });
  },
  /**
   * 获取购物车列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   */
  getCartList: ({ userid, pageNum, pageSize }) => {
    const params = { userid, pageNum, pageSize: pageSize || 20 };
    return postHttp({ url: '/ordercenter/shopcar/getShopCarList', params });
  },
  /**
   * 编辑购物车数量
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   */
  editCartNum: ({ userid, bm, qty }) => {
    const params = { userid, bm, qty };
    return postHttp({ url: '/ordercenter/shopcar/editShopCar', params });
  },
  /**
   * 从购物车删除
   * @param userid 用户id
   * @param bm 产品编号
   */
  deleteShopCar: ({ userid, bm }) => {
    const params = { userid, bm };
    return postHttp({ url: '/ordercenter/shopcar/deleteShopCar', params });
  },
  /**
   * 获取客户列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   */
  getCustomerList: ({ userid, pageNum, pageSize }) => {
    const params = { userid, pageNum, pageSize: pageSize || 20 };
    return postHttp({ url: '/ordercenter/client/getClientList', params });
  },
};