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
    <label>Typ</label>
    <select v-model="typ">
      <option disabled value="">Bitte wählen</option>
      <option>Konzert</option>
      <option>Festival</option>
    </select>
    <button class="update-event">Speichern</button>
  </form>
  <div class="actions">
    <div class="alert alert-primary" role="alert">
      <a class="btn btn-outline-primary" :href="getSetlistLink(this.band, this.stadt, this.location, this.datum)" target="blank">Setlist bei setlist.fm suchen</a>
    </div>
    <div class="alert alert-danger" role="alert">
      <button class="btn btn-outline-danger" @click="deleteEvent">Event löschen</button>
    </div>
  </div>
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
      location: '',
      typ: ''
    }
  },
  methods: {
    getSetlistLink(band, stadt, location, datum) {
      return 'https://www.setlist.fm/search?query='+band+'+'+stadt+'+'+location+'&year='+datum.substring(0, 4)
    },
    async submit() {
      const payload = {
        datum: this.datum,
        band: this.band,
        stadt: this.stadt,
        location: this.location,
        typ: this.typ
      }     
      await axios.put(this.uri, payload)
      this.$router.push('/')
    },
    async deleteEvent() {
      await axios.delete(this.uri)
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
      this.typ = result.data.typ
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.danger-zone {
  display: flex;
}
.update-event {
  color: black;
  background-color: gold;
}
.update-event:hover {
  background-color: rgb(201, 125, 26);
}
</style>