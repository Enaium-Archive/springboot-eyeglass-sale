import 'virtual:windi.css'
import { createApp } from 'vue'
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from './App'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(router)
app.use(store)

app.mount('#app')
