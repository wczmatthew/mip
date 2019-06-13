import productList from './productList';

const searchView = () => import('@/views/products/SearchView.vue');

export default [
  {
    path: 'search',
    component: searchView,
    children: [
      ...productList,
    ],
  },
];