<template>
  <div class="events">
    <div class="spinner" v-if="isLoading"></div>
    <div class="actions">
      <h3>{{ event.band }}</h3>
      <div @click="showDetails = !showDetails" class="icons">
        <span v-if="!showDetails" class="material-icons">expand_more</span>
        <span v-else class="material-icons">expand_less</span>
      </div>
    </div>
    <div v-if="showDetails" class="actions">
      <div>
        <h4>Datum: {{ formatDate }}</h4>
        <h4>Stadt: {{ event.stadt }}</h4>
        <h4>Location: {{ event.location }}</h4>
      </div>
      <div>
        <router-link :to="{ name: 'EditEvent', params: { id: event._id }}">
          <span class="material-icons edit">edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['event'],
  data() {
    return {
      showDetails: false,
      isLoading: false
    }
  },
  methods: {
    async deleteEvent() {
      this.isLoading = true
      await axios.delete('https://konzi-server.herokuapp.com/events/' + this.event._id)
      this.$emit('deleteEvent', this.event)
      this.isLoading = false
    }
  },
  computed: {
    formatDate() {
      return this.event.datum.substring(0,10)
    }
  }

}
</script>

<style scoped>
.events {
  background: white;
  margin: 20px auto;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
.events:hover {
  background: #eee;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 28px;
  padding: 5px;
  color: grey;
  cursor: pointer;
}
.material-icons.edit:hover {
  font-size: 28px;
  color: goldenrod
}
h4 {
  padding: 0 5px;
  margin: 10px auto;
  color: grey;
  letter-spacing: 1px;
  font-weight: bold;
}
button {
  display: block;
  margin: 20px auto 10px;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  cursor: pointer;
}
a {
  text-decoration: none;
}

</style>