// 客户列表
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
    ],
  },
  {
    path: 'selectRateCustomer',
    component: RateCustomerList,
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