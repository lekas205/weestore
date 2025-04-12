import './assets/main.css'
import axios from './https'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify.ts'
import '@mdi/font/css/materialdesignicons.css'

import 'swiper/css'
import 'swiper/css/pagination'

import Private from './layouts/private.vue'
import Public from './layouts/public.vue'

const token = localStorage.getItem('ACCESS_TOKEN')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.component('public-pages', Public)
app.component('private-pages', Private)
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
