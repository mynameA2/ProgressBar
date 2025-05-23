import './assets/main.scss'
import router from './router' 
import 'vue-color-kit/dist/vue-color-kit.css'


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
