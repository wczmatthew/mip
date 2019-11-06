import productList from './productList';
import productDetail from './detail';
// import productCategory from './productCategory';
import cart from '../cart/cart';

const searchView = () => import('@/views/products/SearchView.vue');
const productCategory = () => import('@/views/products/ProductCategory.vue');
const productSelect = () => import('@/views/products/ProductSelect.vue');

export default [
  {
    path: 'category',
    component: productCategory,
    children: [
      ...productList,
      {
        path: 'productSelect',
        component: productSelect,
        children: [
          ...cart,
        ],
      },
      {
        path: 'search',
        component: searchView,
        children: [
          ...productDetail,
          ...cart,
          ...productList,
        ],
      },
    ],
  },
];