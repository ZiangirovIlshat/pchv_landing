import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import { createMetaManager } from 'vue-meta'

const app = createApp(App)
    .use(store)
    .use(router)
    .use(createMetaManager())

await router.isReady()
app.mount('#app')