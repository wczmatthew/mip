import { getHttp, postHttp } from '@/http';

export default {
  /**
   * 加入购物单
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   */
  addCart: ({ userid, bm, qty }) => {
    if (!userid) return '';
    const params = { userid, bm, qty };
    return getHttp({ url: '/ordercenter/shopcar/addToShopCar', params });
  },
  /**
   * 根据客户加入购物单
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   * @param clientId 客户id
   */
  addToShopCarWithClient: ({ userid, bm, qty, clientId }) => {
    if (!userid) return '';
    const params = { userid, bm, qty, clientId };
    return getHttp({ url: '/ordercenter/shopcar/addToShopCarWithClient', params });
  },
  /**
   * 加入收藏夹
   * @param userid 用户id
   * @param bm 产品编号
   */
  addCollect: ({ userid, bm }) => {
    if (!userid) return '';
    const params = { userid, bm, qty: 1 };
    return getHttp({ url: '/ordercenter/shopcar/addToCollect', params });
  },
  /**
   * 加入收藏夹带客户
   * @param userid 用户id
   * @param bm 产品编号
   * @param clientId 客户id
   */
  addToCollectWithClient: ({ userid, bm, clientId }) => {
    if (!userid) return '';
    const params = { userid, bm, qty: 1, clientId };
    return getHttp({ url: '/ordercenter/shopcar/addToCollectWithClient', params });
  },
  /**
   * 取消收藏
   * @param userid 用户id
   * @param bm 产品编号
   */
  deleteCollect: ({ userid, bm }) => {
    if (!userid) return '';
    const params = { userid, bm };
    return getHttp({ url: '/ordercenter/shopcar/deleteCollect', params });
  },
  /**
   * 取消收藏
   * @param userid 用户id
   * @param bm 产品编码（复数，逗号隔开）
   * @param clientId 客户id
   */
  deleteCollectWithClient: ({ userid, bm, clientId }) => {
    if (!userid) return '';
    const params = { userid, bm, clientId };
    return getHttp({ url: '/ordercenter/shopcar/deleteCollectWithClient', params });
  },
  /**
   * 根据客户获取收藏夹列表
   * @param userid 用户id
   * @param pageNum 当前页码
   * @param pageSize 每页数量
   * @param clientId 客户id
   */
  getCollectListByClient: ({ userid, pageNum, pageSize, clientId }) => {
    if (!userid) return '';
    const params = { userid, pageNum, pageSize, clientId };
    return getHttp({ url: '/ordercenter/shopcar/getCollectListByClient', params });
  },
  /**
   * 获取购物单列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   */
  getCartList: ({ userid, pageNum, pageSize }) => {
    if (!userid) return '';
    const params = { userid, pageNum, pageSize: pageSize || 20 };
    return postHttp({ url: '/ordercenter/shopcar/getShopCarList', params });
  },
  /**
   * 根据客户获取购物单
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   * @param clientId 客户id
   * @param rateClientId 关联的客户id
   */
  getShopCarListByClient: ({ userid, pageNum, pageSize, clientId, rateClientId }) => {
    if (!userid) return '';
    const params = { userid, pageNum, pageSize: pageSize || 20, clientId, rateClientId };
    return postHttp({ url: '/ordercenter/shopcar/getShopCarListByClient', params });
  },
  /**
   * 编辑购物单数量
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   */
  // editCartNum: ({ userid, bm, qty }) => {
  //   if (!userid) return '';
  //   const params = { userid, bm, qty };
  //   return postHttp({ url: '/ordercenter/shopcar/editShopCar', params });
  // },
  /**
   * 编辑购物单数量
   * @param userid 用户id
   * @param bm 产品编号
   * @param qty 产品数量
   * @param clientId 客户id
   */
  editCartNum: ({ userid, bm, qty, clientId }) => {
    if (!userid) return '';
    const params = { userid, bm, qty, clientId };
    return postHttp({ url: '/ordercenter/shopcar/editShopCarWithClient', params });
  },
  /**
   * 从购物单删除
   * @param userid 用户id
   * @param bm 产品编号
   */
  deleteShopCar: ({ userid, bm }) => {
    if (!userid) return '';
    const params = { userid, bm };
    return postHttp({ url: '/ordercenter/shopcar/deleteShopCar', params });
  },
  /**
   * 从购物单删除
   * @param userid 用户id
   * @param bm 产品编号
   * @param clientId 客户id
   */
  deleteShopCarWithClient: ({ userid, bm, clientId }) => {
    if (!userid) return '';
    const params = { userid, bm, clientId };
    return postHttp({ url: '/ordercenter/shopcar/deleteShopCarWithClient', params });
  },
  /**
   * 获取客户列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   */
  getCustomerList: ({ userid, pageNum, pageSize }) => {
    if (!userid) return '';
    const params = { userid, pageNum, pageSize: pageSize || 20 };
    return postHttp({ url: '/ordercenter/client/getClientList', params });
  },
  /**
   * 获取客户销售区域列表
   * @param userid 用户id
   */
  getAreaList: ({ userid }) => {
    if (!userid) return '';
    const params = { userid };
    return postHttp({ url: '/ordercenter/client/getAreaList', params });
  },
  /**
   * 获取客户职务列表
   * @param userid 用户id
   */
  getDutyList: ({ userid }) => {
    if (!userid) return '';
    const params = { userid };
    return postHttp({ url: '/ordercenter/client/getDeptList', params });
  },
  /**
   * 获取客户行业接口
   * @param userid 用户id
   */
  getIndustryList: ({ userid }) => {
    if (!userid) return '';
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
    if (!userid) return '';
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
   * @param carIds 购物单id,复数用逗号隔开
   * @param payType 付款方式（1 线上付款，2 现金刷卡）
   * @param postType 配送方式（1送货上门，2门店自提）
   * @param certType 相关文件（1资质证书，2发票，3出库单）
   * @param memo 备注
   */
  createOrder: ({
    clientId, userid, carIds,
    payType, memo, postType, certType,
  }) => {
    if (!userid) return '';
    const params = { userid, clientId, carIds, payType, memo, postType, certType };
    return postHttp({ url: '/ordercenter/order/createOrder', params });
  },
  /**
   * 创建订单
   * @param userid 用户id
   * @param clientId 客户id
   * @param address 地址id
   * @param itemList 购物单id,复数用逗号隔开
   * @param payType 付款方式（1 线上付款，2 现金刷卡）
   * @param postType 配送方式（1送货上门，2门店自提）
   * @param memo 备注
   */
  createAppOrder: ({
    address, userid, itemList, clientId,
    payType, memo, postType,
  }) => {
    if (!userid) return '';
    const params = { userid, address, itemList, clientId, payType, memo, postType };
    return postHttp({ url: '/ordercenter/order/createAppOrder', params });
  },
  /**
   * 开单员创建订单
   * @param userid 用户id
   * @param clientId 客户id
   * @param address 地址id
   * @param itemList 购物单id,复数用逗号隔开
   * @param payType 付款方式（1 线上付款，2 现金刷卡）
   * @param postType 配送方式（1送货上门，2门店自提）
   * @param memo 备注
   * @param clientName 客户名称
   * @param clientMobile 客户联系方式
   * @param clientAddress 客户地址
   * @param oddment 抹零金额
   * @param saleClientId 选择的客户id
   */
  createSaleOrder: ({
    address, userid, itemList, clientId, oddment, saleClientId,
    payType, memo, postType, clientName, clientMobile, clientAddress,
  }) => {
    if (!userid) return '';
    const params = { userid, address, itemList, clientId, payType, memo, postType, clientName, clientMobile, clientAddress, oddment, saleClientId };
    return postHttp({ url: '/ordercenter/order/createSaleOrder', params });
  },
  /**
   * 获取订单列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   * @param type 订单类型（不传获取全部）
   */
  getOrderList: ({ userid, pageNum, pageSize, type }) => {
    if (!userid) return '';
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
    if (!userid) return '';
    const params = { userid, orderId, type };
    return postHttp({ url: '/ordercenter/order/changeOrderType', params });
  },
  /**
   * 获取订单详情接口
   * @param userid 用户id
   * @param orderId 订单号
   */
  getOrderDetail: ({ userid, orderId }) => {
    if (!userid) return '';
    const params = { userid, orderId };
    return postHttp({ url: '/ordercenter/order/getOrderDetail', params });
  },
  /**
   * 获取订单相关统计数据
   * @param userid 用户id
   * @param orderId 订单号
   */
  getOrderStatisticInfo: ({ userid }) => {
    if (!userid) return '';
    const params = { userid };
    return postHttp({ url: '/ordercenter/order/getOrderStatisticInfo', params });
  },
  /**
   * 获取收货地址列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示多少条
   */
  getAddressList: ({ userid }) => {
    if (!userid) return '';
    const params = { userid };
    return postHttp({ url: '/ordercenter/address/getAddressList', params });
  },
  /**
   * 新增收货地址
   * @param addressData 地址信息
   */
  addAddress: (addressData) => {
    const params = { ...addressData };
    return postHttp({ url: '/ordercenter/address/addAddress', params });
  },
  /**
   * 编辑收货地址
   * @param addressData 地址信息
   */
  editAddress: (addressData) => {
    const params = { ...addressData };
    return postHttp({ url: '/ordercenter/address/editAddress', params });
  },
  /**
   * 删除收货地址
   * @param userid 用户id
   * @param addressId 收获地址id，批量的话，用逗号隔开
   */
  deleteAddress: ({ userid, addressId }) => {
    const params = { userid, addressId };
    return postHttp({ url: '/ordercenter/address/deleteAddress', params });
  },
  /**
   * 获取默认收货地址
   * @param userid 用户id
   */
  getDefaultAddress: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/ordercenter/address/getDefaultAddress', params });
  },
  /**
   * 获取入库单的产品数据
   * @param url 二维码url
   */
  getReceiveOrderItemList: ({ url }) => {
    const params = { url };
    return postHttp({ url: '/ordercenter/order/getReceiveOrderItemList', params });
  },
  /**
   * 确认入库单
   * @param userid 用户id
   * @param orderId 订单id
   * @param itemList 入库产品数据
   */
  inStore: ({ orderId, userid, itemList }) => {
    const params = { orderId, userid, itemList };
    return postHttp({ url: '/ordercenter/order/inStore', params });
  },
  /**
   * 开单员扫码获取产品西悉尼
   * @param userid 用户id
   * @param code 扫码获取的数据
   */
  scanBarcode: ({ code, userid }) => {
    const params = {
      code, userid,
    };
    return postHttp({ url: '/ordercenter/order/scanBarcode', params });
  },
  /**
   * 新增客户
   * @param userid 用户id
   * @param phone 联系方式
   * @param address 地址
   * @param name 客户名称
   */
  addSaleClient: ({ phone, address, userid, name }) => {
    const params = {
      phone, userid, address, name,
    };
    return postHttp({ url: '/ordercenter/client/addSaleClient', params });
  },
  /**
   * 编辑客户
   * @param userid 用户id
   * @param phone 联系方式
   * @param address 地址
   * @param name 客户名称
   * @param clientId 客户id
   */
  editSaleClient: ({ phone, address, userid, name, clientId }) => {
    const params = {
      phone, address, userid, name, clientId,
    };
    return postHttp({ url: '/ordercenter/client/editSaleClient', params });
  },
  /**
   * 获取客户列表
   * @param userid 用户id
   * @param pageNum 页码
   * @param pageSize 一页显示数量
   * @param keyword 查询关键字
   */
  getSaleClientList: ({ pageNum, pageSize, userid, keyword }) => {
    const params = {
      pageNum, pageSize, userid, keyword,
    };
    return postHttp({ url: '/ordercenter/client/getSaleClientList', params });
  },
};