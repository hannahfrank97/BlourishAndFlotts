<template>
    <div>
        <navbar class="relative z-30" />
        <router-view />
        <div class="relative h-screen">
            <Banner />
            <contentRectangle>
                <div class="flex flex-col">
                    <input
                        type="text"
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="email"
                        placeholder="email"
                    />
                    <input
                        type="password"
                        style="margin-bottom: 10px; height: 30px; text-align: center"
                        v-model="password"
                        placeholder="password"
                    />
                    <Button :button-text="buttonText2" class="" @click="login">
                    </Button>
                </div>
                <p class="login_text">
                    Not a magical member yet? Click <a href="./register" class="login_link">here</a>
                </p>
            </contentRectangle>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "../src/components/navbar.vue";
import Banner from "@/components/banner.vue";
import ContentRectangle from "@/components/contentRectangle.vue";
import Button from "@/components/button.vue";

export default {
    components: {Button, ContentRectangle, Banner, Navbar},
    data() {
        return {
            email: '',
            password: '',
            buttonText2: 'LOGIN',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/login', {
                    email: this.email,
                    password: this.password,
                }, {withCredentials: true});

                this.$router.push('/');

            } catch (error) {
                console.error(error);
            }
        },

    }
};
</script>

<style>

.login_text {
    color: #04befe;
    text-shadow: 0 0 40px rgba(37, 170, 225, 0.5);
    font-size: 1.1rem;
}

.login_link {
    font-weight: bold;
}
</style>