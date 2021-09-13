<template>
  <form @submit.prevent="submit">
    <label><small class="required">*</small>Datum</label>
    <input type="date" required v-model="datum">
    <label><small class="required">*</small>Band</label>
    <input type="text" required v-model="band">
    <label>Stadt</label>
    <input type="text" v-model="stadt">
    <label>Location</label>
    <input type="text" v-model="location">
    <label><small class="required">*</small>Typ</label>
    <select v-model="typ">
      <option disabled value="">Bitte wählen</option>
      <option>Konzert</option>
      <option>Festival</option>
    </select>
    <div>
      <p>*Pflichtfelder</p>
      <button>Eintragen</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
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
    async submit() {
      const payload = {
        datum: this.datum,
        band: this.band,
        typ: this.typ
      }
      if (this.stadt)
        payload.stadt = this.stadt
      if (this.location)
        payload.location = this.location

      await axios.post(process.env.VUE_APP_BASEURL + '/events/', payload, this.authHeader)
      this.$router.push('/')
    }
  }

}
</script>

<style>
form {
  background: #90a4ae;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #263238;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 5px 0;
}
input {
  background: #90a4ae;
  padding: 5px;
  border: 0;
  border-bottom: 1px solid black;
  width: 100%;
  box-sizing: border-box
}
select {
  padding: 5px;
  background: #90a4ae;
  border: 0;
  border-bottom: 1px solid black;
  width: 100%;
}
input:hover {
  border-bottom: 2px solid black;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: black;
  cursor: pointer;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
form button:hover {
  background: #00dd89;
}
.required {
  color: red;
  font-size: 14px;
}
p {
  padding-top: 20px;
  color: black;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
}
</style>