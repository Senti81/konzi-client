<template>
  <Navigation/>
  <router-view/>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation    
  }
}
</script>
<style>
.bg-main {
  background: #90a4ae;
}
body {
  background: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 80%;
  margin: 0px auto;
}
</style>
