// 商城页
const Mall = () => import('@/views/mall/Mall.vue');

export default [
  {
    path: '/mall',
    component: Mall,
    children: [],
  },
];