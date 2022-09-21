import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue";
import CreateUser from "../views/CreateUser.vue";
import UserEvent from "../views/UserEvent.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
      path: '/event/:id',
      name: 'UserEvent',
      component: UserEvent,
      params: true,
  },
  {
      path: '/user',
      name: 'CreateUser',
      component: CreateUser,
  }
]

const router = new VueRouter({
  routes
})

export default router
