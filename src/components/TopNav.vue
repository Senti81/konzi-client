<template>
  <v-app-bar
    color="grey darken-3"
    dense
    dark
    fixed
  >
    <v-toolbar-title>Konzi DB</v-toolbar-title>

    <v-spacer></v-spacer>
    <div v-if="this.$store.getters.isAuthenticated">
      <v-btn icon>
        <router-link :to="{ name: 'Home' }">
          <v-icon color="white">mdi-home</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <router-link :to="{ name: 'NewEvent' }">
          <v-icon color="white">mdi-plus</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {    
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
  },
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>