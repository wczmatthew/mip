const OrderConfirm = () => import('@/views/order/OrderConfirm.vue');

export default [
  {
    path: 'confirmOrder',
    component: OrderConfirm,
    children: [
    ],
  },
];