import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: localStorage.getItem('user-token') || null,
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    login: (state, token) => state.token = token
  },
  actions: {
    verifyLogin: async ({ commit }, credentials) => {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/login', credentials)
        localStorage.setItem('user-token', response.data.token);
        commit('login', response.data.token)
        return response.status
      } catch (e) {
        localStorage.removeItem('user-token');
      }
    }
  }
})
