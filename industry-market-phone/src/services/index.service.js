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
  /**
   * 获取首页第二屏数据
   * @param userid 用户id
   */
  getIndexOtherData: ({ userid }) => {
    const params = { userid };
    return postHttp({ url: '/productcenter/product/getHomePageCorpPro', params });
  },
  /**
   * 获取首页预览数据
   */
  getIndexPrevData: corpid => postHttp({ url: '/contentcenter/post/previewHomePage', params: { corpid } }),
};