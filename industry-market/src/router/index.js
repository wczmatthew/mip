import Vue from 'vue';
import Router from 'vue-router';
import root from './root';
import products from './products';
import search from './products/search';

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
      ],
    },
    ...root,
    ...products,
  ],
});
