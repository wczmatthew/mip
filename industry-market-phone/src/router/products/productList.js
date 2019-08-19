// 产品列表页面
import detail from './detail';
import cart from '../order/cart';
import productCategory from './productCategory';

const ProductList = () => import('@/views/products/ProductListView.vue');
const searchView = () => import('@/views/products/SearchView.vue');

export default [
  {
    path: 'productList',
    component: ProductList,
    children: [
      ...detail,
      ...cart,
      {
        path: 'search',
        component: searchView,
        children: [
          ...productCategory,
        ],
      },
    ],
  },
];