import { createRouter, createWebHistory } from "vue-router";

import mainPage from "../views/pages/mainPage.vue";
import selectorPage from "../views/pages/selectorPage.vue";
import cartPage from "../views/pages/cartPage.vue";
import personalDataProcessingPolicy from "../views/pages/personalDataProcessingPolicy.vue";

const routes = [
  {
    path: "/",
    name: "home",

    component: mainPage
  },

  {
    path: "/selector",
    name: "selector",

    props: true,

    component: selectorPage,
  },

  {
    path: "/cart",
    name: "cart",

    component: cartPage,
  },

  {
    path: "/privacy",
    name: "privacy",

    component: personalDataProcessingPolicy,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



export default router
