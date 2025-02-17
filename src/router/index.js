import { createRouter, createWebHistory } from "vue-router";
import mainPage from "../views/pages/mainPage.vue";
import selectorPage from "../views/pages/selectorPage.vue";
import cartPage from "../views/pages/cartPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "ПЧВ ОВЕН" },
    component: mainPage
  },

  {
    path: "/selector",
    name: "selector",
    meta: { title: "Подборщик модификаций ПЧВ" },
    component: selectorPage,
    props: true,
  },

  {
    path: "/cart",
    name: "cart",
    meta: { title: "Корзина" },
    component: cartPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "ПЧВ";
  }

  next();
});

export default router
