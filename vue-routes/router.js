import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ()=> import('../views/home.vue')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: ()=> import('../views/shop.vue')
    },
    {
        path: '/members',
        name: 'Members',
        component: ()=> import('../views/members.vue')
    },

    {
        path: '/members/:memberId',
        name: 'Member',
        params: true,
        component: ()=> import('../views/member.vue')
    },


    {
        path: '/cart/:memberId',
        name: 'Cart',
        component: ()=> import('../views/cart.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: ()=> import('../views/login.vue')
    },

    {
        path: '/register',
        name: 'Register',
        component: ()=> import('../views/register.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

