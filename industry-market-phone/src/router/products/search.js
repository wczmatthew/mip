import productList from './productList';
import productDetail from './detail';
import cart from '../order/cart';

const searchView = () => import('@/views/products/SearchView.vue');
const CategoryList = () => import('@/views/products/CategoryList.vue');

export default [
  {
    path: 'search',
    component: searchView,
    children: [
      ...productList,
      {
        path: 'category',
        component: CategoryList,
        children: [
          ...productDetail,
          ...cart,
        ],
      },
    ],
  },
];