import customer from '../customer';
import selectAddress from '../address/select';

const OrderConfirm = () => import('@/views/order/OrderConfirm.vue');

export default [
  {
    path: 'confirmOrder',
    component: OrderConfirm,
    children: [
      ...customer,
      ...selectAddress,
    ],
  },
];