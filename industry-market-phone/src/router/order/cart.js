import customer from '../customer';
import confirmOrder from './confirmOrder';

const Cart = () => import('@/views/cart/Cart.vue');

export default [
  {
    path: 'cart',
    component: Cart,
    children: [
      ...customer,
      ...confirmOrder,
    ],
  },
];