
const StorageList = () => import('@/views/common/storage/list/StorageList.vue');
const StorageSearch = () => import('@/views/common/storage/list/StorageSearch.vue');

export default [
  {
    path: 'storageList',
    component: StorageList,
    children: [
      {
        path: 'search',
        component: StorageSearch,
      },
    ],
  },
];