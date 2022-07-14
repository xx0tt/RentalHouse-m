import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    isLogin: false
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
    setLogin(state, val) {
      state.isLogin = val
    }
  },
  actions: {},
  modules: {}
})
