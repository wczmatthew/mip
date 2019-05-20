/**
 * 通讯录数据存储区域
 */
const state = {
  companyData: {}, // 公司信息
};

// getters
const getters = {
  companyData: state => state.companyData,
};

// actions -- 接口调用方法
const actions = {
  // checkout ({ commit, state }, products) {
  //   const savedCartItems = [...state.items]
  //   commit('setCheckoutStatus', null)
  //   // empty cart
  //   commit('setCartItems', { items: [] })
  //   shop.buyProducts(
  //     products,
  //     () => commit('setCheckoutStatus', 'successful'),
  //     () => {
  //       commit('setCheckoutStatus', 'failed')
  //       // rollback to the cart saved before sending the request
  //       commit('setCartItems', { items: savedCartItems })
  //     }
  //   )
  // },

};

// mutations -- 数据更新/存储方法
const mutations = {
  updateCompanyData(state, data) {
    state.companyData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};