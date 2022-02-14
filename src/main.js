import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

export let ip = '192.168.0.104'
// export let ip = 'flaskvideo-env.us-east-2.elasticbeanstalk.com'