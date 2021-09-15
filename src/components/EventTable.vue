<template>
  <Loading v-if="this.$store.getters.isLoading"/>
  <div v-else>
    <div class="list-group">
      <div v-for="event in events" :key="event._id">
        <EventTableRow :event="event"/>
      </div>
    </div>
    <div class="pagination">
      <button class="bg-main" :disabled="skip === 0" @click="back">
        <span  class="material-icons">skip_previous</span>
      </button>
      <h6>{{skip + 1}}-{{ calculateEndOfItems }} von {{ allEventsCount }}</h6>
      <button class="bg-main" :disabled="eventCount < 10" @click="foward">
        <span class="material-icons">skip_next</span>
      </button>
    </div>
  </div>
</template>

<script>
import EventTableRow from './EventTableRow'
import Loading from '@/components/Loading'
import axios from 'axios'

export default {
  components: {
    EventTableRow,
    Loading
  },
  data() {
    return {
      skip: 0,
      uri: process.env.VUE_APP_BASEURL + '/events/?limit=10',
      events: [],
      allEventsCount: 0,
      header : {      
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.getToken }
      }      
    }
  },
  computed: {
    eventCount() {
      return this.events.length
    },
    calculateEndOfItems() {
      if (this.skip + 10 > this.allEventsCount)
        return this.allEventsCount
      return this.skip + 10
    }
  },
  methods: {
    async foward() {
      this.$store.commit('toggleLoading')
      this.skip = this.skip + 10
      const result = await axios.get(this.uri + '&skip=' + this.skip, this.header)
      this.events = result.data
      this.$store.commit('toggleLoading')
    },
    async back() {
      this.$store.commit('toggleLoading')
      this.skip = this.skip - 10
      const result = await axios.get(this.uri + '&skip=' + this.skip, this.header)
      this.events = result.data
      this.$store.commit('toggleLoading')
    },
    deleteEvent(e) {
      const index = this.events.indexOf(e)
      this.events.splice(index, 1)
    }
  },
  mounted() {
    this.$store.commit('toggleLoading')
    axios.get(this.uri, this.header)
      .then((res) => {
        this.events = res.data
        this.$store.commit('toggleLoading')
      }
    )
    axios.get(process.env.VUE_APP_BASEURL + '/events?count=1', this.header)
      .then(res => this.allEventsCount = res.data.count)
  }

}
</script>

<style>
h6 {
  color: #999;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>