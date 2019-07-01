import { postHttp } from '@/http';

export default {
  // 获取产品类型
  getSortList: () => postHttp({ url: '/productcenter/product/getSortList' }),
  // 获取自定义产品类型
  getNewSortList: () => postHttp({ url: '/productcenter/product/getNewSortList' }),
  /**
   * 获取问题和答案列表
   * @param clientId 客户id
   */
  getQuestionList: ({ clientId }) => {
    const params = { clientId };
    return postHttp({ url: '/contentcenter/content/getQuestionList', params });
  },
  /**
   * 获取问题和答案列表
   */
  getQuestionListNoAnswer: () => postHttp({ url: '/contentcenter/content/getQuestionListNoAnswer' }),
  /**
   * 提交问题和答案
   * @param clientId 客户id
   * @param questionList 问题列表及答案
   * @param otherDesc 其他内容
   */
  commitAnswer: ({ clientId, questionList, otherDesc }) => {
    const params = { clientId, questionList, otherDesc };
    return postHttp({ url: '/contentcenter/content/commitAnswer', params });
  },
};