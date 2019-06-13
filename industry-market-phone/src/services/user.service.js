import { postHttp } from '@/http';

export default {
  getUserInfo: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getUserInfo', params });
  },
};