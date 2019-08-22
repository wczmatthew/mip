
import productDetail from '../products/detail';

const CollectionList = () => import('@/views/my/collect/CollectionList.vue');

export default [
  {
    path: 'collections',
    component: CollectionList,
    children: [
      ...productDetail,
    ],
  },
];