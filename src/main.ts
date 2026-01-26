import { createApp } from 'vue';
import '@/scss/custom.scss'
import App from './App.vue';
import router from './routes/router';
import { createPinia } from 'pinia';

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app');
