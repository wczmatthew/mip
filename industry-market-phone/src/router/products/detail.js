// 产品详情
import cart from '../order/cart';

const ProductDetail = () => import('@/views/products/ProductDetail.vue');

export default [
  {
    path: 'productDetail',
    component: ProductDetail,
    children: [
      ...cart,
    ],
  },
];