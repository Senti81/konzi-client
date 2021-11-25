<template>
  <v-app>
    <v-main>
      <TopNav/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import TopNav from '@/components/TopNav'
export default {
  components: {
    TopNav
    }
}
</script>
