<template>
  <div class="d-flex" style="height: 100vh">
    <form class="login-form" @submit.prevent="login">
      <label>Benutzername</label>
      <input type="text" v-model="name" @focus="error = false">
      <label>Passwort</label>
      <input type="password" v-model="password">
      <p class="error" v-if="error">Benutzername / Passwort falsch</p>
      <button :disabled="this.$store.getters.isLoading">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="this.$store.getters.isLoading"></span>
        Anmelden
        </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      error: false,
    }
  },
  methods: {
    async login() {
      this.$store.commit('toggleLoading')
      this.error = false
      const payload = { name: this.name, password: this.password }
      const status = await this.$store.dispatch('verifyLogin', payload)
      if (status === 200) {
        this.$router.replace('/')
      } else {
        this.error = true,
        this.name = '',
        this.password = ''
      }
      this.$store.commit('toggleLoading')
    }
  }
}
</script>

<style>
.login-form {
  display: block;
  width: 80%;
  margin: auto;
}
.error {
  color: #c62828;
  margin: 15px auto;
  font-size: 12px;
}
</style>