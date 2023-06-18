<template>
    <div>
        <Navbar class="relative z-30" />
        <div class="relative h-screen">
            <Banner />
            <contentRectangle>
                <div class="flex flex-col">
    <input type="text" style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center" v-model="username" placeholder="username">
    <input type="text" style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center" v-model="email" placeholder="email">
    <input type="password" style=" width:300px ; height: 30px; text-align: center" v-model="password" placeholder="password">
                    <Button :button-text="buttonText3" class="" @click="register">
                    </Button>
                </div>
            </contentRectangle>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ContentRectangle from "@/components/contentRectangle.vue";
import Navbar from "@/components/navbar.vue";
import Banner from "@/components/banner.vue";
import Button from "@/components/button.vue";

export default {
    components: {Button, Banner, Navbar, ContentRectangle},
    data() {
        return {
            username: '',
            email: '',
            password: '',
            buttonText3: 'REGISTER',
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/register', {
                    username: this.username,
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