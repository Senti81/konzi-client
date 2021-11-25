<template>
  <div class="nav">
    <nav class="main-nav navigation-links">
      <router-link :to="{ name: 'Home' }">Events</router-link>
      <router-link :to="{ name: 'NewEvent' }">Neues Event</router-link>
    </nav>
    <nav class="logout-nav navigation-links">
      <a href="#" @click="this.$store.dispatch('logout')">Abmelden</a>
    </nav>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-evenly;
}
.main-nav {
  text-align: start;
  margin: 30px auto;
  flex: 2;
}
.logout-nav {
  text-align: end;
  margin: 30px auto;
  flex: 1;
}
.navigation-links a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px;
  color: #999;
}
.main-nav a:hover {
  color: green;
}
.logout-nav a:hover {
  color: brown;
}
a.router-link-active {
  color: green;
  border-bottom: 2px solid green;
}
</style>