import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
// import Vue from 'vue';
// import VTitle from 'v-title';

// Vue.use(VTitle);

createApp(App).mount('#app')

// Import Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// Import vui ui
// import 'v-title/lib/element-ui';

createApp(App).use(router).mount('#app')