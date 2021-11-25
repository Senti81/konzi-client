<template>
  <v-card
    class="ma-3"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{item.datum}}
        </div>
        <v-list-item-title class="mb-1">
          {{item.band}}
        </v-list-item-title>
        <v-list-item-subtitle>{{item.stadt}} / {{item.location}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        outlined
        rounded
        small
        @click="getSetlistLink"
      >
        Setlist suchen...
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      getSetlistLink() {
        window.open('https://www.setlist.fm/search?query='+this.item.band+'+'+this.item.stadt+'+'+this.item.location+'&year='+this.item.datum.substring(0, 4))
      },
    }
  }
</script>