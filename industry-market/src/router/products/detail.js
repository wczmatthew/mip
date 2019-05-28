// 商城页
const ProductDetail = () => import('@/views/products/ProductDetail.vue');

export default [
  {
    path: 'detail',
    component: ProductDetail,
    children: [],
  },
];