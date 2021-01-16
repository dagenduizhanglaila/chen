import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home
  },
  {
    path: '/home',
    name: 'Home',
    component:Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
