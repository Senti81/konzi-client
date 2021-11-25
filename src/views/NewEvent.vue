  <!-- <form @submit.prevent="submit">
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
  </form> -->

<template>
<v-card 
  dark 
  tile
  height="100vh" 
  class="pt-16">

  <v-form>
    <v-text-field
      type="date"
      class="mx-10"
      v-model="datum"
      label="Datum"
      :rules="[v => !!v || 'Datum is required']"
      required
    ></v-text-field>

    <v-text-field
      class="mx-10"
      v-model="band"
      label="Band"
      :rules="[v => !!v || 'Band is required']"
      required
    ></v-text-field>

    <v-text-field
      class="mx-10"
      v-model="stadt"
      label="Stadt"      
    ></v-text-field>

    <v-text-field
      class="mx-10"
      v-model="location"
      label="Location"      
    ></v-text-field>

    <v-select      
      class="mx-10"  
      v-model="typ"
      :items="items"
      :rules="[v => !!v || 'Typ is required']"
      label="Typ"
      required
    ></v-select>

    <div class="text-center">  
      <v-btn      
        color="success"
        :disabled="disabled"
        @click="submit"
      >
        Add
      </v-btn>
    </div>
  </v-form>
  </v-card>
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
      items: ['Konzert', 'Festival'],
      authHeader: { 
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.getToken }
      }
    }
  },
  computed: {
    disabled() {
			return this.datum.length == 0 || this.band.length == 0 || !this.typ
		},
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