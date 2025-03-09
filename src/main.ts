import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import 'swiper/css'
import 'swiper/css/pagination'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import layouts
import Private from './layouts/private.vue'
import Public from './layouts/public.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('public-pages', Public)
app.component('private-pages', Private)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
