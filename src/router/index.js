import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import TradeList from '../views/TradeList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/list',
    name: 'list',
    component: TradeList
  },
  {
    path: "*",
    name: 'all',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
