
import cart from '../cart/cart';
import list from './list';
import category from '../products/productSelectRoot';

const Storage = () => import('@/views/common/storage/Storage.vue');
const ConfirmReceiveProducts = () => import('@/views/products/ConfirmReceiveProducts.vue');
const frameView = () => import('@/views/common/FrameView.vue');

export default [
  {
    path: 'storage',
    component: Storage,
    children: [
      ...list,
      ...cart,
      ...category,
      {
        path: 'confirmReceive',
        component: ConfirmReceiveProducts,
      },
      {
        path: 'frame',
        component: frameView,
      },
    ],
  },
];