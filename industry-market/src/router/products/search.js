import productList from './productList';
import detail from './detail';
import customer from '../customer';

const searchView = () => import('@/views/products/SearchView.vue');

export default [
  {
    path: 'search',
    component: searchView,
    children: [
      ...productList,
      ...detail,
      ...customer,
    ],
  },
];