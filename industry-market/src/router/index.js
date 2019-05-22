import Vue from 'vue';
import Router from 'vue-router';
import root from './root';
import mall from './mall';

const Login = () => import('@/views/Login.vue'); // 登录

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    ...root,
    ...mall,
  ],
});
