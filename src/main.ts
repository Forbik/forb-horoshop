import './assets/scss/app.scss'
import { initialDb } from './composables/db'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
initialDb()

app.mount('#app')
