import cart from '../order/cart';

const productCategory = () => import('@/views/products/ProductCategory.vue');
const productSelect = () => import('@/views/products/ProductSelect.vue');

export default [
  {
    path: 'category',
    component: productCategory,
    children: [
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