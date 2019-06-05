import { postHttp } from '@/http';

export default {
  // 获取产品类型
  getSortList: () => postHttp({ url: '/productcenter/product/getSortList' }),
};