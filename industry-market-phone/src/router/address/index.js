
const AddressList = () => import('@/views/my/address/AddressList.vue');
const AddressEdit = () => import('@/views/my/address/AddressEdit.vue');
const AddressCreate = () => import('@/views/my/address/AddressCreate.vue');

export default [
  {
    path: 'address',
    component: AddressList,
    children: [
      {
        path: 'new',
        component: AddressCreate,
      },
      {
        path: 'edit',
        component: AddressEdit,
      },
    ],
  },
];