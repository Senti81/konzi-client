<template>
  <div class="spinner" v-if="isLoading"></div>
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
import axios from 'axios'
export default {
  components: {
    EventTableRow
  },
  data() {
    return {
      isLoading: false,
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
      this.skip = this.skip + 10
      const result = await axios.get(this.uri + '&skip=' + this.skip, this.header)
      this.events = result.data
    },
    async back() {
      this.skip = this.skip - 10
      const result = await axios.get(this.uri + '&skip=' + this.skip, this.header)
      this.events = result.data
    },
    deleteEvent(e) {
      const index = this.events.indexOf(e)
      this.events.splice(index, 1)
    }
  },
  mounted() {
    this.isLoading = true
    axios.get(this.uri, this.header)
      .then((res) => {
        this.events = res.data
        this.isLoading = false
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
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  height:60px;
  width:60px;
  margin:0px auto;
  -webkit-animation: rotation .6s infinite linear;
  -moz-animation: rotation .6s infinite linear;
  -o-animation: rotation .6s infinite linear;
  animation: rotation .6s infinite linear;
  border-left:6px solid rgba(0,174,239,.15);
  border-right:6px solid rgba(0,174,239,.15);
  border-bottom:6px solid rgba(0,174,239,.15);
  border-top:6px solid rgba(0,174,239,.8);
  border-radius:100%;
}

@-webkit-keyframes rotation {
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(359deg);}
}
@-moz-keyframes rotation {
  from {-moz-transform: rotate(0deg);}
  to {-moz-transform: rotate(359deg);}
}
@-o-keyframes rotation {
  from {-o-transform: rotate(0deg);}
  to {-o-transform: rotate(359deg);}
}
@keyframes rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(359deg);}
}
</style>