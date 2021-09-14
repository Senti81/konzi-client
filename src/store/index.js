import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: localStorage.getItem('user-token') || null,
    loading: false
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    isLoading: state => state.loading
  },
  mutations: {
    login: (state, token) => state.token = token,
    toggleLoading: state => state.loading = !state.loading
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
