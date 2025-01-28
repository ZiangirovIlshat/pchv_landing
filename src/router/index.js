import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/pages/mainPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
