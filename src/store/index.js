import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  getters: {
    token: state => state.token,
    isAuthenticated: state => !!state.token
  },
  mutations: {
  },
  actions: {
  }
})
