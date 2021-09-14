<template>
  <router-link :to="{ name: 'EditEvent', params: { id: event._id }}" class="list-group-item list-group-item-action d-flex gap-3 py-2" aria-current="true">
    <img v-if="event.typ === 'Konzert'" src="img/concert.png" alt="concert" width="48" height="48" class="rounded-circle flex-shrink-0">
    <img v-if="event.typ === 'Festival'" src="img/festival.png" alt="festival" width="48" height="48" class="rounded-circle flex-shrink-0">
    <div class="d-flex w-100 justify-content-between">
      <div>
        <h5 class="mb-1 placeholder-glow">
          <span class="placeholder col-12" v-if="this.$store.getters.isLoading"></span>
          <span v-else>{{ event.band }}</span>
        </h5>
        <small class="mb-1 placeholder-glow">
          <span class="placeholder col-8" v-if="this.$store.getters.isLoading"></span>
          <span v-else>{{ event.stadt }} / {{ event.location }}</span>
        </small>
      </div>
      <small class="text-muted placeholder-glow">
        <span class="placeholder col-4" v-if="this.$store.getters.isLoading"></span>
        <span v-else>{{ formatDate }}</span>
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
h5 {
  font-size: 16px;
  text-transform: none;
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
  color:black;
  padding: 0 5px;
}
.material-icons {
  padding: 0 10px;
  font-size: 20px;
  color: grey;
  cursor: pointer;
}
.material-icons.edit:hover {
  color: goldenrod
}
</style>