const AddressEdit = () => import('@/views/my/address/AddressEdit.vue');
const AddressCreate = () => import('@/views/my/address/AddressCreate.vue');
const SelectAddress = () => import('@/views/my/address/SelectAddress.vue');

export default [
  {
    path: 'selectAddress',
    component: SelectAddress,
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