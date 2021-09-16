<template>
  <div class="pagination">
    <button class="bg-main" :disabled="skip === 0" @click="back">
      <span  class="material-icons">skip_previous</span>
    </button>
    <h6 class="text-light">{{skip + 1}}-{{ calculateEndOfItems }} von {{ allEventsCount }}</h6>
    <button class="bg-main" :disabled="eventCount < 10" @click="foward">
      <span class="material-icons">skip_next</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    skip: Number,
    allEventsCount: Number,
    eventCount: Number
  },
  data() {
    return {   
      url: process.env.VUE_APP_BASEURL + '/events/?limit=10',
      headers: this.$store.getters.getHeader
    }
  },
  computed: {
    calculateEndOfItems() {
      if (this.skip +10 > this.allEventsCount)
        return this.allEventsCount
      return this.skip +10
    }
  },
  methods: {
    async foward() {
      this.$store.commit('toggleLoading')
      const result = await axios.get(this.url + '&skip=' + parseInt(this.skip + 10), this.headers)
      this.$emit('nextEvents', result.data)
      this.$store.commit('toggleLoading')
    },
    async back() {
      this.$store.commit('toggleLoading')
      const result = await axios.get(this.url + '&skip=' + parseInt(this.skip - 10), this.headers)
      this.$emit('previousEvents', result.data)
      this.$store.commit('toggleLoading')
    },
  }  
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>