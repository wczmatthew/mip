// 订单
const orderDetail = () => import('@/views/order/OrderDetail.vue');

export default [
  {
    path: 'orderDetail',
    component: orderDetail,
    children: [],
  },
];