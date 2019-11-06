
// 首页路由
import productList from '../products/productList';
import productDetail from '../products/detail';
import search from '../products/search';
import productCategory from '../products/productCategory';

const Home = () => import('@/views/home/Home.vue');
const invitation = () => import('@/views/my/Invitation.vue');

export default [
  {
    path: 'home',
    component: Home,
    meta: { keepAlive: true, isTabbar: true },
    children: [
      ...productList,
      ...productDetail,
      ...search,
      ...productCategory,
      {
        path: 'invitation',
        component: invitation,
      },
    ],
  },
];