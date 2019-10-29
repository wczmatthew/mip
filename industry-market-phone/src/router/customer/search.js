
const customerSearch = () => import('@/views/my/customer/CustomerSearch.vue');
const customerEdit = () => import('@/views/my/customer/CustomerEdit.vue');

export default [
  {
    path: 'search',
    component: customerSearch,
    children: [
      {
        path: 'edit',
        component: customerEdit,
      },
    ],
  },
];