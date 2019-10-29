// 客户列表
import search from './search';

const customer = () => import('@/views/my/customer/CustomerList.vue');
const customerCreate = () => import('@/views/my/customer/CustomerCreate.vue');
const customerEdit = () => import('@/views/my/customer/CustomerEdit.vue');

export default [
  {
    path: 'customer',
    component: customer,
    children: [
      {
        path: 'new',
        component: customerCreate,
      },
      {
        path: 'edit',
        component: customerEdit,
      },
      ...search,
    ],
  },
];