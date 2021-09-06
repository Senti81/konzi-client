import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewEvent from '../views/NewEvent.vue'
import EditEvent from '../views/EditEvent.vue'
import News from '../views/News.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'NewEvent',
    component: NewEvent
  },
  {
    path: '/events/:id',
    name: 'EditEvent',
    component: EditEvent,
    props: true
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
