import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Map from '../views/Map.vue'
import Vehicles from '../views/Vehicles.vue'
import VehicleDetails from '../views/VehicleDetails.vue'
import Users from '../views/Users.vue'
import About from '../views/About.vue'
import UserDetails from '@/views/UserDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: Vehicles
    },
    {
      path: '/vehicle/:plate',
      name: 'vehicle-details',
      component: VehicleDetails,
      props: true
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: UserDetails,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
  ]
})

export default router
