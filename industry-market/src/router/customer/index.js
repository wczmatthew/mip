// 客户列表
import search from './search';

const customer = () => import('@/views/customers/CustomerList.vue');
const RateCustomerList = () => import('@/views/customers/RateCustomerList.vue');
const customerCreate = () => import('@/views/customers/CustomerCreate.vue');
const customerEdit = () => import('@/views/customers/CustomerEdit.vue');

export default [
  {
    path: 'customers',
    component: customer,
    children: [
      {
        path: 'new',
        component: customerCreate,
      },
      {
        path: 'customerEdit',
        component: customerEdit,
      },
      ...search,
    ],
  },
  {
    path: 'selectRateCustomer',
    component: RateCustomerList,
    children: [
      ...search,
      {
        path: 'new',
        component: customerCreate,
      },
      {
        path: 'customerEdit',
        component: customerEdit,
      },
    ],
  },
  {
    path: 'customerNew',
    component: customerCreate,
  },
  {
    path: 'customerEdit',
    component: customerEdit,
  },
];