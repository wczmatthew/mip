import service from '@/services/order.service';

/**
 * 用户相关数据存储区域
 */
const state = {
  areaOptions: [],
  dutyOptions: [],
  industryOptions: [],
};

// getters
const getters = {
  areaOptions: state => state.areaOptions,
  dutyOptions: state => state.dutyOptions,
  industryOptions: state => state.industryOptions,
};

// actions -- 接口调用方法
const actions = {
  // 获取客户销售区域
  async getAreaOptions({ commit }) {
    if (this.state.options.areaOptions.length) return;
    const result = await service.getAreaList({ userid: this.getters['user/userId'] });
    if (!result) return;
    commit('updateAreaOptions', result);
  },
  // 获取职务列表
  async getDutyOptions({ commit }) {
    if (this.state.options.dutyOptions.length) return;
    const result = await service.getDutyList({ userid: this.getters['user/userId'] });
    if (!result) return;
    commit('updateDutyOptions', result);
  },
  // 获取行业列表
  async getIndustryOptions({ commit }) {
    if (this.state.options.industryOptions.length) return;
    const result = await service.getIndustryList({ userid: this.getters['user/userId'] });
    if (!result) return;
    commit('updateIndustryOptions', result);
  },
};

// mutations -- 数据更新/存储方法
const mutations = {
  // 更新销售区域数据
  updateAreaOptions(state, data) {
    const list = [];
    data.forEach((item) => {
      list.push({
        text: item.dictLabel,
        value: item.dictCode,
      });
    });
    state.areaOptions = [...list];
  },
  // 更新职务数据
  updateDutyOptions(state, data) {
    const list = [];
    data.forEach((item) => {
      list.push({
        text: item.dictLabel,
        value: item.dictCode,
      });
    });
    state.dutyOptions = [...list];
  },
  // 更新行业
  updateIndustryOptions(state, data) {
    const list = [];
    data.forEach((item) => {
      list.push({
        text: item.dictLabel,
        value: item.dictCode,
      });
    });
    state.industryOptions = [...list];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};