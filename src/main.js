import { createApp } from 'vue'
import store from './store/index';
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'

import './assets/main.css'



const app = createApp(App)
app.use(router)
app.use(plugin, defaultConfig(config))
app.use(store)


app.mount('#app')