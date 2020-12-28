import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HelloWorld from '../components/HelloWorld.vue'
import CreateAccount from '../views/CreateAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: HelloWorld
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/newaccount',
    name: 'newaccount',
    component: CreateAccount
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
