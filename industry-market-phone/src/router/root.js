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

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
const HomePrev = () => import('@/views/home/HomePrev.vue');
// 导购
const customerChat = () => import('@/views/customers/CustomerChat.vue');
const activityDetail = () => import('@/views/activity/ActivityDetail.vue');
const invitation = () => import('@/views/my/Invitation.vue');
const frameView = () => import('@/views/common/FrameView.vue');

export default [
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
        path: 'invitation',
        component: invitation,
      },
      {
        path: 'frame/:frameType',
        component: frameView,
      },
    ],
  },
  {
    path: '/homePrev',
    component: HomePrev,
    meta: { notBack: true },
  },
];