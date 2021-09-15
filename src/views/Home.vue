<template>
  <div class="home">
    <EventTable/>
  </div>
</template>

<script>
import EventTable from '@/components/EventTable'

export default {
  name: 'Home',
  components: {
    EventTable
  } 
}
</script>

<style>
.pagination {
  display: flex;
  margin: 20px 10px;
}
</style>
