import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Shop from "../views/shop.vue";
import Members from "../views/members.vue";
import Member from '../views/Member.vue';
import About from "../views/about.vue";
import Profile from "../views/profile.vue";
import Cart from "../views/cart.vue";
import MyCart from "../views/myCart.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/members',
        name: 'Members',
        component: Members
    },

    {
        path: '/members/:id',
        name: 'Member',
        component: Member
    },

    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },

    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },

    {
        path: '/cart/:id',
        name: 'MyCart',
        component: MyCart
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/register',
        name: 'Register',
        component: Register
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
