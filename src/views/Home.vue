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
  },
  data() {
    return {
      isLoading: false,
    }
  }
}
</script>

<style>
.pagination {
  display: flex;
  margin: 20px 10px;
}
</style>
