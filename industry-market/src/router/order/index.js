// 订单
import detail from './detail';

const orderList = () => import('@/views/order/OrderList.vue');

export default [
  {
    path: 'order',
    component: orderList,
    children: [
      ...detail,
    ],
  },
];