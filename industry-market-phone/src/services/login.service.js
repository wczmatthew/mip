import { getHttp } from '@/http';

export default {
  login: (username, password) => {
    const params = { username, password };
    return getHttp({ url: '/usercenter/user/login', params });
  },
  loginByCode: (mobile, code) => {
    const params = { mobile, code };
    return getHttp({ url: '/usercenter/user/loginByCode', params });
  },
};