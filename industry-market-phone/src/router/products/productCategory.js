import cart from '../order/cart';
import productDetail from './detail';

const productCategory = () => import('@/views/products/ProductCategory.vue');
const productSelect = () => import('@/views/products/ProductSelect.vue');

export default [
  {
    path: 'category',
    component: productCategory,
    children: [
      ...productDetail,
      {
        path: 'productSelect',
        component: productSelect,
        children: [
          ...cart,
        ],
      },
    ],
  },
];