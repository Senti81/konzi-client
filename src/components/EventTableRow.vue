<template>
  <td>{{ formatDate }}</td>
  <td>{{ event.band }}</td>
  <td>{{ event.stadt }}</td>
  <td>{{ event.location }}</td>
  <td>
    <router-link :to="{ name: 'EditEvent', params: { id: event._id }}">
      <span class="material-icons edit">edit</span>
    </router-link>
  </td>
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
.material-icons {
  font-size: 16px;
  color: grey;
  cursor: pointer;
}
.material-icons.edit:hover {
  color: goldenrod
}
</style>