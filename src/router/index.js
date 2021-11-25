import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewEvent from '../views/NewEvent.vue'
import EditEvent from '../views/EditEvent.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/events',
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
    path: '/:patchMatch(.*)*',
    name: 'Home',
    component: Home,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !store.getters.isAuthenticated)
    next({ name: 'Login' })
  else {
    next()
  }
})

export default router
