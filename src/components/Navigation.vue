<template>
  <nav class="main-nav">
    <router-link :to="{ name: 'Home' }">Events</router-link>
    <router-link :to="{ name: 'NewEvent' }">Neues Event</router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.main-nav {
  text-align: center;
  margin: 30px auto
}
.main-nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px;
  color: #999;
}
.main-nav a:hover {
  color: green;
}
a.router-link-active {
  color: green;
  border-bottom: 2px solid green;
}
</style>