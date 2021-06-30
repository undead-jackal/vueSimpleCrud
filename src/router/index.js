import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/components/main')
const AppMain = () => import('@/components/redesign')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/ApplicationTest',
    name: 'AppMain',
    component: AppMain
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
