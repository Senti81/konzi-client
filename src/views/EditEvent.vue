<template>
<div>
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
    <a class="btn btn-primary" :href="getSetlistLink(this.band, this.stadt, this.location, this.datum)" target="blank">Setlist bei setlist.fm suchen</a>
    <button class="btn btn-danger" @click="deleteEvent">Event löschen</button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      uri: process.env.VUE_APP_BASEURL + '/events/' + this.id,
      isLoading: false,
      datum: '',
      band: '',
      stadt: '',
      location: '',
      typ: '',
      authHeader: { 
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.getToken }
      }
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
      await axios.put(this.uri, payload, this.authHeader)
      this.$router.push('/')
    },
    async deleteEvent() {
      await axios.delete(this.uri, this.authHeader)
      this.$router.push('/')
    }
  },
  mounted() {
    this.isLoading = true
    axios.get(this.uri, this.authHeader)
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