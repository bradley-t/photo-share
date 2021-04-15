import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Photo from '../views/Photo.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
   path: '/dashboard',
   name: 'Dashboard',
   component: Dashboard
 },
 {
   path: '/photo/:id',
   name: 'photo',
   component: Photo
 },
 {
   path: '*',
   name: '404',
   component: NotFound
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
