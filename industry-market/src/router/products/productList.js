// 产品列表页面
import detail from './detail';
import cart from '../order/cart';
import customer from '../customer';

// const ProductList = () => import('@/views/products/ProductList.vue');
const ProductList = () => import('@/views/products/ProductList.vue');
const ProductCategory = () => import('@/views/products/ProductCategory.vue');


export default [
  {
    path: 'productCategory',
    component: ProductCategory,
  },
  {
    path: 'productList',
    component: ProductList,
    children: [
      ...detail,
      ...cart,
      ...customer,
    ],
  },
];