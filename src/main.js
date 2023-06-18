import { createApp } from 'vue';
import App from '../app.vue';
import router from '../vue-routes/router';
import Toaster from '@meforma/vue-toaster';

import 'tailwindcss/tailwind.css'
import '@/stylesheets/styles.css';

const app = createApp(App);

app.use(Toaster);
app.use(router);
app.mount('#app');
