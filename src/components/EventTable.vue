<template>
  <v-card dark tile class="mt-6" height="95vh">
    <v-card-title>
      <v-text-field        
        v-model="search"
        append-icon="mdi-magnify"
        label="Suche nach Band oder Datum..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table      
      dense    
      :headers="headers"
      :items="events"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="this.$store.getters.isLoading"
      :expanded.sync="expanded"
      item-key="_id"
      loading-text="Loading... Please wait"
      hide-default-footer
      class="elevation-1"
      show-expand
      single-expand
      @page-count="pageCount = $event"
      mobile-breakpoint="350"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <EventDetails
            :item="item"
          />
        </td>
      </template>
    </v-data-table>
    <v-bottom-navigation
      fixed
      :value="value"
      color="primary"    
    >
      <v-pagination
        class="text-center ma-auto"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
      ></v-pagination>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
import Loading from '@/components/Loading'
import EventDetails from '@/components/EventDetails'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    Loading,
    EventDetails
  },
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 12,
      value: 0,
      headers: [
          { text: 'Band', value: 'band', align: 'start' },
          { text: 'Datum', value: 'datum', align: 'end'},
          { text: '', value: 'data-table-expand' },
        ],        
      events: [],
      expanded: [],
      url: process.env.VUE_APP_BASEURL,
      header: this.$store.getters.getHeader
    }
  },
  mounted() {
    this.$store.commit('toggleLoading')
    axios.get(this.url + '/events', this.header)
      .then((res) => {
        res.data.forEach(element => {
          element.datum = moment(element.datum).format('DD.MM.YYYY')
        });
        this.events = res.data
        this.$store.commit('toggleLoading')
      })
      .catch(() => {
        this.$store.dispatch('logout')
        this.$router.push('/')
      })
  }
}
</script>