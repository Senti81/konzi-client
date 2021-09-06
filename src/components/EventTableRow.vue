<template>
  <h2 class="accordion-header" :id="createHeadingForAccordion">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="createIndexForAccordion" aria-expanded="false" :aria-controls="createIdForAccordion">
        {{ formatDate }}: {{ event. band }}
    </button>
  </h2>
  <div :id="createIdForAccordion" class="accordion-collapse collapse" :aria-labelledby="createHeadingForAccordion" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <div class="details">
        <span class="badge rounded-pill" 
          :class="{ 'bg-success': event.typ === 'Konzert', 'bg-warning': event.typ === 'Festival'}">{{ event.typ }}</span>
        <p>{{ event.stadt }} / {{ event.location }}</p>
      </div>
      <div class="action-buttons">
        <router-link :to="{ name: 'EditEvent', params: { id: event._id }}">
          <span class="material-icons edit">edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event', 'index'],
  computed: {
    createIndexForAccordion() {
      return '#collapse' + this.index
    },
    createHeadingForAccordion() {
      return 'heading' + this.index
    },
    createIdForAccordion() {
      return 'collapse' + this.index
    },
    formatDate() {
      return this.event.datum.substring(0,10)
    }
  }
}
</script>

<style scoped>
.accordion-button {
  background-color: #90a4ae;
}
.accordion-body{
  background-color: #90a4ae;
  display: flex;
  justify-content: space-between;
}
p {
  font-size: 12px;
  color:black;
  padding: 0 5px;
}
.material-icons {
  padding: 0 10px;
  font-size: 20px;
  color: grey;
  cursor: pointer;
}
.material-icons.edit:hover {
  color: goldenrod
}
</style>