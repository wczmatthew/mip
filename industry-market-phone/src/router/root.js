import productList from './products/productList';
import productDetail from './products/detail';
import customer from './customer';
import search from './products/search';
import detail from './order/detail';
import order from './order';
import confirmOrder from './order/confirmOrder';
import guide from './guide';
import address from './address';
import collect from './collect';
import cart from './order/cart';

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
// const Home = () => import('@/views/root/Home.vue');
// 导购
// const Guide = () => import('@/views/root/Guide.vue');
const customerChat = () => import('@/views/customers/CustomerChat.vue');
const productCategory = () => import('@/views/products/ProductCategory.vue');
const activityDetail = () => import('@/views/activity/ActivityDetail.vue');

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
      ...confirmOrder,
      ...guide,
      ...address,
      ...productDetail,
      ...collect,
      ...cart,
      {
        path: 'activieyDetail',
        component: activityDetail,
      },
      {
        path: 'chat',
        component: customerChat,
        children: [
          ...customer,
        ],
      },
      {
        path: 'productCategory',
        component: productCategory,
        children: [
          ...productList,
        ],
      },
    ],
  },
];