import { createStore } from 'vuex'

import cart from "./modules/cart";

const localStoragePlugin = (store) => {
  const savedState = localStorage.getItem('vuex');
  if (savedState) {
    store.replaceState(Object.assign({}, store.state, JSON.parse(savedState)));
  }

  store.subscribe((mutation, state) => {
    localStorage.setItem('vuex', JSON.stringify(state));
  });
};

export default createStore({
  modules: {
    cart,
  },

  plugins: [ localStoragePlugin ],
})
