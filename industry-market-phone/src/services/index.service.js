import { getHttp, postHttp } from '@/http';

export default {
  getBanner: (postSubType) => {
    const params = { postType: 2, postSubType };
    return getHttp({ url: '/contentcenter/content/getAdvList', params });
  },
  /**
   * 获取首页第一屏数据
   * @param userid 用户id
   */
  getIndexData: ({ userid }) => {
    const params = {};
    return postHttp({ url: `/contentcenter/post/getPostAttachByUserId?userid=${userid}`, params });
  },
};