import { getHttp } from '@/http';

export default {
  getBanner: (postSubType) => {
    const params = { postType: 1, postSubType };
    return getHttp({ url: '/contentcenter/content/getAdvList', params });
  },
};