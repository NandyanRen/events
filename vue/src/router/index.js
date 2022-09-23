import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue";
import CreateUser from "../views/CreateUser.vue";
import CreateEvent from "../views/CreateEvent.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
      path: '/user',
      name: 'CreateUser',
      component: CreateUser,
  },
  {
    path: '/event/:id',
    name: 'CreateEvent',
    component: CreateEvent,
  },
]

const router = new VueRouter({
  routes
})

export default router
