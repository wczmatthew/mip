// 产品分类 路由
import cart from '../cart/cart';
import productDetail from './detail';
import search from './search';
import productList from './productList';

const productCategoryTab = () => import('@/views/products/ProductCategoryTab.vue');

export default [
  {
    path: 'categoryTab',
    component: productCategoryTab,
    meta: { keepAlive: true, isTabbar: true },
    children: [
      ...productDetail,
      ...cart,
      ...search,
      ...productList,
    ],
  },
];