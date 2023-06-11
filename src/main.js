import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../app.vue'
import Home from '../views/home.vue'

import '@/stylesheets/styles.css';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // Add more routes here if needed
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
