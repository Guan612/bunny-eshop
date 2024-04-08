import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives'
import { componentPlugin } from './components'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
