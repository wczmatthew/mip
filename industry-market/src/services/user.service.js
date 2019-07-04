import { postHttp } from '@/http';

export default {
  getUserInfo: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/usercenter/user/getUserInfo', params });
  },
  // 名片扫描
  uploadImageData: ({ imgData }) => {
    const params = { imgData };
    return postHttp({ url: '/usercenter/user/uploadImageData', params });
  },
};