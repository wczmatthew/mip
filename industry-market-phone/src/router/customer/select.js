
import search from './search';

const selectCustomer = () => import('@/views/my/customer/SelectCustomer.vue');
const customerCreate = () => import('@/views/my/customer/CustomerCreate.vue');
const customerEdit = () => import('@/views/my/customer/CustomerEdit.vue');

export default [
  {
    path: 'selectCustomer',
    component: selectCustomer,
    children: [
      ...search,
      {
        path: 'new',
        component: customerCreate,
      },
      {
        path: 'edit',
        component: customerEdit,
      },
    ],
  },
];