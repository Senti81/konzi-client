import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || null,
    loading: false
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    isLoading: state => state.loading,
    getHeader(state) {
      return { headers: { 'Authorization': 'Bearer ' + state.token }}
    }
  },
  mutations: {
    login: (state, token) => state.token = token,
    logout: state => state.token = null,
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
    },
    logout: ({ commit }) => {
      commit('logout')
      localStorage.removeItem('user-token')
    }
  }
})
