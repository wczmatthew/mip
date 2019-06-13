// 商城页
import detail from './detail';
import search from './search';
import cart from '../order/cart';

const Mall = () => import('@/views/products/Mall.vue');

export default [
  {
    path: '/mall',
    component: Mall,
    children: [
      ...detail,
      ...search,
      ...cart,
    ],
  },
];