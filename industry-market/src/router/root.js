import productList from './products/productList';
import customer from './customer';
import search from './products/search';

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
// const Home = () => import('@/views/root/Home.vue');
// 导购
// const Guide = () => import('@/views/root/Guide.vue');
const CategoryList = () => import('@/views/products/CategoryList.vue');
const Cart = () => import('@/views/cart/Cart.vue');

export default [
  {
    path: '/market',
    component: Root,
    children: [
      ...productList,
      ...customer,
      ...search,
      {
        path: 'cart',
        component: Cart,
      },
      {
        path: 'category',
        component: CategoryList,
      },
    ],
  },
];