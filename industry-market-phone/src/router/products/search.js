import productList from './productList';
import productDetail from './detail';
// import cart from '../order/cart';

const searchView = () => import('@/views/products/SearchView.vue');
const CategoryList = () => import('@/views/products/CategoryList.vue');
const CategoryDetail = () => import('@/views/products/CategoryDetail.vue');

export default [
  {
    path: 'search',
    component: searchView,
    children: [
      ...productList,
      ...productDetail,
      {
        path: 'category',
        component: CategoryList,
        children: [
          {
            path: 'detail',
            component: CategoryDetail,
            children: [
              ...productDetail,
            ],
          },
        ],
      },
    ],
  },
];