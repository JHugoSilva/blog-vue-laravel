//@ts-nocheck
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const option = {}
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)
app.use(Toast, option)
app.mount('#app')
