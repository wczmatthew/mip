// 产品详情
import cart from '../order/cart';

const ProductDetail = () => import('@/views/products/ProductDetail.vue');

export default [
  {
    path: 'detail',
    component: ProductDetail,
    children: [
      ...cart,
    ],
  },
];