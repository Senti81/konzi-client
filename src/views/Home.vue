<template>
  <div class="home">
    <div class="spinner" v-if="isLoading"></div>
    <div v-for="event in events" :key="event._id">
      <Event :event="event" @deleteEvent="deleteEvent"/>
    </div>
  </div>
</template>

<script>
import Event from '@/components/Event'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Event
  },
  data() {
    return {
      isLoading: false,
      uri: 'https://konzi-server.herokuapp.com/events/',
      events: []
    }
  },
  methods: {
    deleteEvent(e) {
      const index = this.events.indexOf(e)
      this.events.splice(index, 1)
    }
  },
  mounted() {
    this.isLoading = true
    axios.get(this.uri)
      .then((res) => {
        this.events = res.data
        this.isLoading = false
      })
  }
}
</script>

<style>
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
