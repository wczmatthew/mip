// 客户列表
import customer from './index';

const customerChat = () => import('@/views/customers/CustomerChat.vue');

export default [
  {
    path: 'chat',
    component: customerChat,
    children: [
      ...customer,
    ],
  },
];