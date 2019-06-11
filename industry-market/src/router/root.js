import productList from './products/productList';
import customer from './customer';
import search from './products/search';
import productDetail from './products/detail';
import detail from './order/detail';
import order from './order';
import cart from './order/cart';

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
// const Home = () => import('@/views/root/Home.vue');
// 导购
// const Guide = () => import('@/views/root/Guide.vue');
const CategoryList = () => import('@/views/products/CategoryList.vue');
const customerChat = () => import('@/views/customers/CustomerChat.vue');

export default [
  {
    path: '/market',
    component: Root,
    children: [
      ...productList,
      ...customer,
      ...search,
      ...detail,
      ...order,
      {
        path: 'chat',
        component: customerChat,
        children: [
          ...customer,
        ],
      },
      {
        path: 'category',
        component: CategoryList,
        children: [
          ...productDetail,
          ...cart,
          ...search,
        ],
      },
    ],
  },
];