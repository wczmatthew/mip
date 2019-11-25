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
  registerByOpenId: ({ openId, key, recId }) => {
    const params = { openId, key, recId };
    return postHttp({ url: '/usercenter/user/registerByOpenId', params });
  },
  // 绑定客户到ecp系统
  bindClientToEcp: ({ userid, clientName, phone, code }) => {
    const params = { userid, clientName, phone, code };
    return postHttp({ url: '/usercenter/user/bindClientToEcp', params });
  },
  // 名片扫描
  uploadImageData: ({ imgData }) => {
    const params = { imgData };
    return postHttp({ url: '/usercenter/user/uploadImageData', params });
  },
  /**
   * 获取老板角色相关统计数据
   * @param userid 用户id
   */
  getBossStatistic: ({ userid }) => {
    if (!userid) return '';
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getBossStatistic', params });
  },
  /**
   * 提交反馈问题
   * @param loginName 用户账号
   * @param problem 问题内容
   * @param title 标题
   * @param qq qq
   */
  submitFeedback: ({ loginName, problem, title, qq }) => {
    const params = { loginName, problem, title, qq };
    return postHttp({ url: '/usercenter/feedback/submitFeedback', params });
  },
  /**
   * 获取运维信息
   * @param userid 用户账号
   */
  getOperationsPhone: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getOperationsPhone', params });
  },
  /**
   * 获取反馈列表
   * @param loginName 账号
   * @param pageNo 页码
   */
  getFeedbackList: ({ loginName, pageNo }) => {
    const params = { loginName, pageNo };
    return postHttp({ url: '/usercenter/feedback/getFeedbackList', params });
  },
  getBossShareInfo: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getBossShareInfo ', params });
  },
};