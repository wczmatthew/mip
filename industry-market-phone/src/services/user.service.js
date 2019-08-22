import { postHttp } from '@/http';

export default {
  getUserInfo: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getUserInfo', params });
  },
  // 发送验证码
  sendVerifyCode: ({ mobile }) => {
    const params = { mobile };
    return postHttp({ url: '/usercenter/user/sendVerifyCode', params });
  },
  // 注册绑定客户接口
  registerBindUser: (data) => {
    const params = { ...data };
    return postHttp({ url: '/usercenter/user/registerBindUser', params });
  },
};