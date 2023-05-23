import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/js/all'
import dotenv from 'dotenv'
dotenv.config()



createApp(App).use(router).mount('#app')
// const app = createApp(App);



// import 'bootstrap/dist/js/bootstrap.js'
