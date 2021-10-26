import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Display from '../views/Display.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Display',
    component: () => import(/* webpackChunkName: "about" */ '../views/Display.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
