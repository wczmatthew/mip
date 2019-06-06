const Cart = () => import('@/views/cart/Cart.vue');
export default [
  {
    path: 'cart',
    component: Cart,
    children: [],
  },
];