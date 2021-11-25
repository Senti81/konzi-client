<template>
  <v-main>
    <EventTable/>
  </v-main>
</template>

<script>
import EventTable from '@/components/EventTable'
import TopNav from '@/components/TopNav'

export default {
  name: 'Home',
  components: {
    EventTable,
    TopNav
  } 
}
</script>
