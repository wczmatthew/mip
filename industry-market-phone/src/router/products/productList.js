// 产品列表页面
import detail from './detail';
import cart from '../order/cart';

// const ProductList = () => import('@/views/products/ProductList.vue');
const ProductList = () => import('@/views/products/ProductList.vue');


export default [
  {
    path: 'productList',
    component: ProductList,
    children: [
      ...detail,
      ...cart,
    ],
  },
];