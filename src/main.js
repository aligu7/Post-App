import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

import '@/assets/styles/main.css'
import './registerServiceWorker'

let app

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(createPinia()).use(router).mount('#app')
  }
})
