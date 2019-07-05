// 订单
import customer from '../customer';

const orderDetail = () => import('@/views/order/OrderDetail.vue');

export default [
  {
    path: 'orderDetail',
    component: orderDetail,
    children: [
      ...customer,
    ],
  },
];