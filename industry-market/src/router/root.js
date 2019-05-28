import productList from './products/productList';

const Root = () => import('@/views/root/Root.vue'); // tabbar navigation
// 首页
const Home = () => import('@/views/root/Home.vue');
// 导购
const Guide = () => import('@/views/root/Guide.vue');

export default [
  {
    path: '/market',
    component: Root,
    children: [
      ...productList,
      {
        path: 'index',
        component: Home,
      },
      {
        path: 'guide',
        component: Guide,
      },
    ],
  },
];