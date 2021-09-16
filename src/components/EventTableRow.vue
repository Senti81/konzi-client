<template>
  <router-link :to="{ name: 'EditEvent', params: { id: event._id }}" class="list-group-item d-flex gap-3" aria-current="true">
    <img v-if="event.typ === 'Konzert'" src="img/concert.png" alt="concert" width="36" height="36" class="flex-shrink-0">
    <img v-if="event.typ === 'Festival'" src="img/festival.png" alt="festival" width="36" height="36" class="flex-shrink-0">
    <div class="d-flex w-100 justify-content-between">
      <div>
        <h6 class="mb-1 text-dark">{{ event.band }}</h6>
        <p class="mb-1 text-dark">{{ event.stadt }} / {{ event.location }}</p>
      </div>
      <small class="text-muted">
        <span>{{ formatDate }}</span>
      </small>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['event'],
  computed: {
    formatDate() {
      return this.event.datum.substring(0,10)
    }
  }
}
</script>

<style scoped>
.list-group-item{
  padding: 5px;
}

img {
  margin: auto;
}
.list-group-item {
  background: #90a4ae;
}
a.setlist-link {
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  color: #263238;
  padding-left: 5px;
}
p {
  font-size: 12px;
  padding: 0 5px;
}
</style>