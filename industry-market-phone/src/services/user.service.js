import { postHttp } from '@/http';

export default {
  getUserInfo: ({ userid }) => {
    if (!userid) return null;
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
  // 通过openid注册用户，如果已经注册，返回用户信息
  registerByOpenId: ({ openId, key }) => {
    const params = { openId, key };
    return postHttp({ url: '/usercenter/user/registerByOpenId', params });
  },
  // 绑定客户到ecp系统
  bindClientToEcp: ({ userid, clientName, phone, code }) => {
    const params = { userid, clientName, phone, code };
    return postHttp({ url: '/usercenter/user/bindClientToEcp', params });
  },
};