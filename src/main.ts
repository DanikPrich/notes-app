import './assets/styles/main.css'
import './assets/styles/tailwind.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MasonryWall from '@yeger/vue-masonry-wall'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(MasonryWall)
app.use(pinia)
app.use(router)
app.mount('#app')
