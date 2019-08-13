
import productList from '../products/productList';
import search from '../products/search';
import detail from '../products/detail';

const Guide = () => import('@/views/guide/Guide.vue');
const GuideCategory = () => import('@/views/guide/GuideCategory.vue');

export default [
  {
    path: 'guide',
    component: Guide,
    children: [
      {
        path: 'guideCategory',
        component: GuideCategory,
        children: [
          ...productList,
          ...search,
          ...detail,
        ],
      },
    ],
  },
];