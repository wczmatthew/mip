import Vue from 'vue';
import Router from 'vue-router';
import root from './root';
import mall from './products/mall';
import search from './products/search';
import productList from './products/productList';
import productDetail from './products/detail';

const Login = () => import('@/views/Login.vue'); // 登录
const Index = () => import('@/views/Index.vue'); // 首页

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/index',
      component: Index,
      children: [
        ...search,
        ...productList,
        ...productDetail,
      ],
    },
    ...root,
    ...mall,
  ],
});
