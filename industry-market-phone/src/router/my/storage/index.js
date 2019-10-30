
const StorageList = () => import('@/views/my/storage/list/StorageList.vue');
const StorageSearch = () => import('@/views/my/storage/list/StorageSearch.vue');

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