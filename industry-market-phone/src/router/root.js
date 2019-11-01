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
import contact from './my/contact';
import productSelectSearch from './products/productSelectRoot';
import storage from './my/storage';

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
const HomePrev = () => import('@/views/home/HomePrev.vue');
const activityDetail = () => import('@/views/activity/ActivityDetail.vue');
const activity = () => import('@/views/activity/Activity.vue');
const invitation = () => import('@/views/my/Invitation.vue');
const frameView = () => import('@/views/common/FrameView.vue');
const Launch = () => import('@/views/root/Launch.vue');
const ConfirmReceiveProducts = () => import('@/views/products/ConfirmReceiveProducts.vue');

export default [
  {
    path: '/',
    component: Launch,
    meta: { notBack: true },
  },
  {
    path: '/market',
    component: Root,
    meta: { notBack: true },
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
      ...contact,
      ...productSelectSearch,
      ...storage,
      {
        path: 'activieyDetail',
        component: activityDetail,
      },
      {
        path: 'invitation',
        component: invitation,
      },
      {
        path: 'frame',
        component: frameView,
      },
      {
        path: 'confirmReceive',
        component: ConfirmReceiveProducts,
      },
    ],
  },
  {
    path: '/homePrev',
    component: HomePrev,
    meta: { notBack: true },
  },
  {
    path: '/activityPrev',
    component: activity,
    meta: { notBack: true },
  },
];