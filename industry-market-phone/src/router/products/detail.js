// 产品详情
import cart from '../order/cart';
import confirmOrder from '../order/confirmOrder';

const ProductDetail = () => import('@/views/products/ProductDetail.vue');

export default [
  {
    path: 'productDetail',
    component: ProductDetail,
    children: [
      ...cart,
      ...confirmOrder,
    ],
  },
];