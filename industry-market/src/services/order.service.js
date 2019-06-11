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
  /**
   * 获取客户销售区域列表
   * @param userid 用户id
   */
  getAreaList: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/client/getAreaList', params });
  },
  /**
   * 获取客户职务列表
   * @param userid 用户id
   */
  getDutyList: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/client/getDeptList', params });
  },
  /**
   * 获取客户行业接口
   * @param userid 用户id
   */
  getIndustryList: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/client/getIndustryList', params });
  },
  /**
   * 添加客户
   * @param data 客户信息
   */
  addClient: data => postHttp({ url: '/ordercenter/client/addClient', params: data }),
  /**
   * 删除客户
   * @param userid 用户id
   * @param clientId 客户id
   */
  deleteClient: ({ userid, clientId }) => {
    const params = { userid, clientId };
    return postHttp({ url: '/ordercenter/client/deleteClient', params });
  },
  /**
   * 编辑客户
   * @param data 客户信息
   */
  editClient: data => postHttp({ url: '/ordercenter/client/editClient', params: data }),
  /**
   * 创建订单
   * @param userid 用户id
   * @param clientId 客户id
   * @param carIds 购物车id,复数用逗号隔开
   * @param payType 付款方式（1 线上付款，2 现金刷卡）
   * @param postType 配送方式（1送货上门，2门店自提）
   * @param certType 相关文件（1资质证书，2发票，3出库单）
   * @param memo 备注
   */
  createOrder: ({
    clientId, userid, carIds,
    payType, memo, postType, certType,
  }) => {
    const params = { userid, clientId, carIds, payType, memo, postType, certType };
    return postHttp({ url: '/ordercenter/order/createOrder', params });
  },
  /**
   * 获取订单列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   * @param type 订单类型（不传获取全部）
   */
  getOrderList: ({ userid, pageNum, pageSize, type }) => {
    const params = { userid, pageNum, pageSize: pageSize || 10, type: type || '' };
    return postHttp({ url: '/ordercenter/order/getOrderList', params });
  },
  /**
   * 修改订单状态
   * @param userid 用户id
   * @param orderId 订单号
   * @param type 状态id（1待发货，2 待收货，3已完成，4退货中，5已取消）
   */
  changeOrderType: ({ userid, orderId, type }) => {
    const params = { userid, orderId, type };
    return postHttp({ url: '/ordercenter/order/changeOrderType', params });
  },
  /**
   * 获取订单详情接口
   * @param userid 用户id
   * @param orderId 订单号
   */
  getOrderDetail: ({ userid, orderId }) => {
    const params = { userid, orderId };
    return postHttp({ url: '/ordercenter/order/getOrderDetail', params });
  },
  /**
   * 获取订单相关统计数据
   * @param userid 用户id
   * @param orderId 订单号
   */
  getOrderStatisticInfo: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/order/getOrderStatisticInfo', params });
  },
};