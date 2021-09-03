<template>
  <form @submit.prevent="submit">
    <div class="spinner" v-if="isLoading"></div>
    <label><small class="required">*</small>Datum</label>
    <input type="date" required v-model="datum">
    <label><small class="required">*</small>Band</label>
    <input type="text" required v-model="band">
    <label>Stadt</label>
    <input type="text" v-model="stadt">
    <label>Location</label>
    <input type="text" v-model="location">
    <button>Aktualisieren</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      uri: 'https://konzi-server.herokuapp.com/events/' + this.id,
      isLoading: false,
      datum: '',
      band: '',
      stadt: '',
      location: ''
    }
  },
  methods: {
    async submit() {
      const payload = {
        datum: this.datum,
        band: this.band,
        stadt: this.stadt,
        location: this.location
      }     
      await axios.put(this.uri, payload)
      this.$router.push('/')
    }
  },
  mounted() {
    this.isLoading = true
    axios.get(this.uri)
    .then(result => {
      this.datum = result.data.datum.substring(0,10)
      this.band = result.data.band
      this.stadt = result.data.stadt
      this.location = result.data.location
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
button {
  color: white;
  background-color: gold;
}
button:hover {
  background-color: rgb(201, 125, 26);
}
</style>