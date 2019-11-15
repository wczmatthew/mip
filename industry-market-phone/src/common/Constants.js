export const USER_ROLE = {
  'user': 0, // 普通用户
  'seller': 1, // 开单员/销售
  'manager': 2, // 老板
};

// 老板相关的操作权限
export const MANAGER_PERMISSIONS = {
  'cart': 1, // 购物车 1: 隐藏
  'order-list': 1, // 订单列表 1: 隐藏
  'order': 1, // 下单 1: 隐藏
  'product-select-edit-num': 1, // 产品选型界面数量操作 1: 隐藏
};