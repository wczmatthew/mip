// 产品详情
import cart from '../order/cart';
import customer from '../customer';

const ProductDetail = () => import('@/views/products/ProductDetail.vue');

export default [
  {
    path: 'detail',
    component: ProductDetail,
    children: [
      ...cart,
      ...customer,
    ],
  },
];