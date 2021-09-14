<template>
  <div class="container">  
    <form class="login-form" @submit.prevent="login">
      <label>Benutzername</label>
      <input type="text" v-model="name" @focus="error = false">
      <label>Passwort</label>
      <input type="password" v-model="password">
      <p class="error" v-if="error">Benutzername / Passwort falsch</p>
      <button>Anmelden</button>
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
    }
  }
}
</script>

<style>
.container {
  margin-top: 100px
}
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