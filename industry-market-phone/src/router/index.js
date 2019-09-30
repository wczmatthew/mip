import Vue from 'vue';
import Router from 'vue-router';
import root from './root';
import mall from './products/mall';
import search from './products/search';

const Login = () => import('@/views/Login.vue'); // 登录
const Index = () => import('@/views/Index.vue'); // 首页
const Register = () => import('@/views/Register.vue'); // 首页
const NotFound = () => import('@/views/root/NotFound.vue'); // 404

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/market?tab=home',
    // },
    {
      path: '/login',
      component: Login,
      meta: { notBack: true },
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/index',
      component: Index,
      meta: { notBack: true },
      children: [
        ...search,
      ],
    },
    ...root,
    ...mall,
    { // 全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
      path: '*',
      component: NotFound,
    },
  ],
});
