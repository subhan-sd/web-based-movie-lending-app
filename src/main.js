import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

createApp(App).mount('#app')

// Import Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

createApp(App).use(router).mount('#app')