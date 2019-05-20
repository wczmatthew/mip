import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@/views/Login.vue'); // 登录


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
    },
  ],
});
