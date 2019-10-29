import customer from '../customer/select';
import selectAddress from '../address/select';

const OrderConfirm = () => import('@/views/order/OrderConfirm.vue');
const OrderSaleConfirm = () => import('@/views/order/OrderSaleConfirm.vue');

export default [
  {
    path: 'confirmOrder',
    component: OrderConfirm,
    children: [
      ...customer,
      ...selectAddress,
    ],
  },
  {
    path: 'confirmSaleOrder', // 开单员的确认订单界面
    component: OrderSaleConfirm,
    children: [
      ...customer,
    ],
  },
];