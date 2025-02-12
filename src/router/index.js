import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/pages/mainPage.vue'
import selectorPage from '../views/pages/selectorPage.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: mainPage
  },
  {
    path: "/selector",
    name: "selector",
    component: selectorPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
