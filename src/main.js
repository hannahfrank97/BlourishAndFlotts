import { createApp } from 'vue';
import App from '../app.vue';
import router from '../vue-routes/router';

import '@/stylesheets/styles.css';

createApp(App).use(router).mount('#app');
