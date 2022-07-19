import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',

    inCity: { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0' } // 默认北京
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    delToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    },

    setinCity(state, cityObj) {
      state.inCity = cityObj
    }
  },
  actions: {},
  modules: {}
})
