// 商城页
import detail from './detail';

const Mall = () => import('@/views/products/Mall.vue');

export default [
  {
    path: '/mall',
    component: Mall,
    children: [
      ...detail,
    ],
  },
];