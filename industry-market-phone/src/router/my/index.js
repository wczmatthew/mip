
import collect from './collect';
import address from '../address';
import order from '../order';

const my = () => import('@/views/my/My.vue');

export default [
  {
    path: 'my',
    component: my,
    meta: { keepAlive: true, isTabbar: true },
    children: [
      ...collect,
      ...address,
      ...order,
    ],
  },
];