<template>
  <Loading v-if="this.$store.getters.isLoading"/>
  <div v-else>
    <div class="list-group">
      <div v-for="event in events" :key="event._id">
        <EventTableRow :event="event"/>
      </div>    
      <Pagination
        @next-events="nextEvents"
        @previous-events="previousEvents"
        :skip="skip"
        :allEventsCount="allEventsCount"
        :eventCount="events.length"
      />  
    </div>
  </div>
</template>

<script>
import EventTableRow from './EventTableRow'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import axios from 'axios'

export default {
  components: {
    EventTableRow,
    Loading,
    Pagination 
  },
  data() {
    return {
      skip: 0,
      events: [],
      allEventsCount: 0,
      url: process.env.VUE_APP_BASEURL,
      headers: this.$store.getters.getHeader
    }
  },
  methods: {
    nextEvents(value) {
      this.events = value
      this.skip +=10
    },
    previousEvents(value) {
      this.events = value
      this.skip -=10
    },
    deleteEvent(e) {
      const index = this.events.indexOf(e)
      this.events.splice(index, 1)
    }
  },
  mounted() {
    this.$store.commit('toggleLoading')
    axios.get(this.url + '/events/?limit=10', this.headers)
      .then((res) => {
        this.events = res.data
        this.$store.commit('toggleLoading')
      })
      .catch((e) => {
        this.$store.dispatch('logout')
        this.$router.push('/')
      })

    axios.get(this.url + '/events?count=1', this.headers)
    .then((result) => {
      this.allEventsCount =  result.data.count
    })
  }
}
</script>