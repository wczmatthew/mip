
// 购物车 路由
import customer from '../customer';
import confirmOrder from '../order/confirmOrder';

const CartTab = () => import('@/views/cart/CartTab.vue');

export default [
  {
    path: 'cartTab',
    component: CartTab,
    meta: { keepAlive: true, isTabbar: true },
    children: [
      ...customer,
      ...confirmOrder,
    ],
  },
];