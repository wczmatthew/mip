/**
 * 旅馆相关数据存储区域
 */
const state = {
  keywords: '',
};

// getters
const getters = {
  keywords: state => state.keywords,
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
  updateHotelKeywords(state, data) {
    state.keywords = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};