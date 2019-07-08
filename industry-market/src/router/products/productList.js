// 产品列表页面
import detail from './detail';
import cart from '../order/cart';
import customer from '../customer';

// const ProductList = () => import('@/views/products/ProductList.vue');
const ProductList = () => import('@/views/products/ProductList.vue');
const searchView = () => import('@/views/products/SearchView.vue');


export default [
  {
    path: 'productList',
    component: ProductList,
    children: [
      ...detail,
      ...cart,
      ...customer,
      {
        path: 'search',
        component: searchView,
      },
    ],
  },
];