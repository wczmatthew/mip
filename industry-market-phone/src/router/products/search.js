import productList from './productList';
import productDetail from './detail';
import productCategory from './productCategory';
import cart from '../cart/cart';

const searchView = () => import('@/views/products/SearchView.vue');

export default [
  {
    path: 'search',
    component: searchView,
    children: [
      ...productList,
      ...productDetail,
      ...productCategory,
      ...cart,
    ],
  },
];