import { createRouter, createWebHistory } from "vue-router";

import mainPage from "../views/pages/mainPage.vue";
import selectorPage from "../views/pages/selectorPage.vue";
import cartPage from "../views/pages/cartPage.vue";
import personalDataProcessingPolicy from "../views/pages/personalDataProcessingPolicy.vue";

const base_url = "https://dev.owen.ru/pchv_landing/";

const routes = [
  {
    path: "/",
    name: "home",

    meta: {
      title: "ПЧВ ОВЕН",
      description: "Преобразователи частоты ПЧВ ОВЕН для насосов, вентиляторов и другой приводной техники",

      ogType: "website",
      ogTitle: "ПЧВ ОВЕН",
      ogDescription: "Преобразователи частоты ПЧВ ОВЕН для насосов, вентиляторов и другой приводной техники.",
      ogImage: base_url + "/img/pchvTopSection.15fe3a9a.png",
      ogUrl: base_url,
    },

    component: mainPage
  },

  {
    path: "/selector",
    name: "selector",
    meta: {
      title: "Подборщик модификаций ПЧВ",
      description: "Инструмент для подбора модификаций ПЧВ ОВЕН.",

      ogType: "website",
      ogTitle: "Подборщик модификаций ПЧВ",
      ogDescription: "Инструмент для подбора модификаций ПЧВ ОВЕН.",
      ogImage: base_url + "/img/pchvTopSection.15fe3a9a.png",
      ogUrl: base_url + "/selector",
    },

    component: selectorPage,

    props: true,
  },

  {
    path: "/cart",
    name: "cart",

    meta: {
      title: "Оформление заказа",
      description: "",

      ogType: "website",
      ogTitle: "Оформление заказа",
      ogImage: base_url + "/img/pchvTopSection.15fe3a9a.png",
      ogUrl: base_url + "/cart"
    },

    component: cartPage,
  },

  {
    path: "/privacy",
    name: "privacy",

    meta: {
      title: "Политика обработки персональных данных",
      description: "",

      ogType: "website",
      ogTitle: "Политика обработки персональных данных",
      ogImage: base_url + "/img/pchvTopSection.15fe3a9a.png",
      ogUrl: base_url + "/privacy"
    },

    component: personalDataProcessingPolicy,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "ПЧВ";

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", to.meta.description || "");
  }

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute("content", to.meta.ogType || "");
  } else {
    const newOgType = document.createElement('meta');
    newOgType.setAttribute("property", "og:type");
    newOgType.content = to.meta.ogType || "";
    document.head.appendChild(newOgType);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", to.meta.ogTitle || "");
  } else {
    const newOgTitle = document.createElement('meta');
    newOgTitle.setAttribute("property", "og:title");
    newOgTitle.content = to.meta.ogTitle || "";
    document.head.appendChild(newOgTitle);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", to.meta.ogDescription || "");
  } else {
    const newOgDescription = document.createElement('meta');
    newOgDescription.setAttribute("property", "og:description");
    newOgDescription.content = to.meta.ogDescription || "";
    document.head.appendChild(newOgDescription);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute("content", to.meta.ogImage || "");
  } else {
    const newOgImage = document.createElement('meta');
    newOgImage.setAttribute("property", "og:image");
    newOgImage.content = to.meta.ogImage || "";
    document.head.appendChild(newOgImage);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute("content", to.meta.ogImage || "");
  } else {
    const newOgUrl = document.createElement('meta');
    newOgUrl.setAttribute("property", "og:image");
    newOgUrl.content = to.meta.ogImage || "";
    document.head.appendChild(newOgUrl);
  }

  next();
});


export default router
