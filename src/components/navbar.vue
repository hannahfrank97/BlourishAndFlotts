<template>

    <div class="navbar-container">
        <div class="logo-container">
            <a href="/" class="logo-link">
            <img src="../images/logo.png" alt="Logo" class="logo">
            </a>
        </div>
        <div class="nav-wrapper">
        <ul class="navbar">
            <li class="navbar-link">
                <router-link to="/shop">Tales & Talk</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/cart/:memberId">Your Cart</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/members">Our Ensemble</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/login">Login</router-link>
            </li>
            <li class="navbar-link">
                <a @click="logout">Logout</a>
            </li>
        </ul>

        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import Button from "@/components/button.vue";
import ContentRectangle from "@/components/contentRectangle.vue";
import Banner from "@/components/banner.vue";
const router = useRouter();

export default {
    data() {
        return {
            member: {}
        };
    },

    methods: {
        async logout() {
            console.log('inside the logout method')
            try {
                console.log('inside the logout method2')
                await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/logout', {}, {withCredentials: true});
                this.$router.push('/');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    }
};

</script>

<style>
.navbar-container {
    font-family: 'Inter', sans-serif;
    letter-spacing: 2px;
    width: 80%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0px 5px 60px #d31027);
    z-index: 1000;
}
.logo-container {
    position: absolute;
    top: 4%;  /* Adjust this value as needed to move the logo up or down */
    left: 8%;
    transform: translateX(-50%);
}

.logo {
    width: 150px;  /* Adjust this value as needed */
    height: auto;

}
.nav-wrapper {
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 0;
    background: #131862;
    color: white;
    height: 150px;
    padding: 0 1rem;
    list-style-type: none;
}

.router-link-active {
    color: #D3A625;
}

.navbar-link router-link {
    color: white;
    text-decoration: none;

}

.navbar-link {
    margin-left: 6rem;

}

</style>