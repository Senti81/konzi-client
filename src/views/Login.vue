<template>
  <form @submit.prevent="login">
    <label>Password</label>
    <input type="password">
    <button>Login</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      password: ''
    }
  },
  methods: {
    async login() {
      const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/login', { name: 'Matz', password: 'maus1234' })
      this.$store.commit('login', response.data.token)
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>