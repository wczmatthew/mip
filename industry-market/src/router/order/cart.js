import customer from '../customer';
import detail from './detail';

const Cart = () => import('@/views/cart/Cart.vue');

export default [
  {
    path: 'cart',
    component: Cart,
    children: [
      ...customer,
      ...detail,
    ],
  },
];