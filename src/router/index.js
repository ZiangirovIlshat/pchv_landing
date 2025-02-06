import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/pages/mainPage.vue'
import modificationSelectorPage from '../views/pages/modificationSelectorPage.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: mainPage
  },
  {
    path: "/selector",
    name: "selector",
    component: modificationSelectorPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
