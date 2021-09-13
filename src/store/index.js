import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    login: (state, token) => state.token = token
  },
  actions: {
  }
})
