import Vue from 'vue'
import VueRouter from 'vue-router'

import Number from '../components/Number.vue'
const myDate =() => import('../components/Date.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/number'
  },
  {
    path: '/number',
    name: 'Number',
    component: Number
  },
  {
    path: '/date',
    name: 'myDate',
    component:myDate
  },
]

const router = new VueRouter({
  mode: 'history',//使用history模式，浏览器的url不会加#
  routes
})

export default router
