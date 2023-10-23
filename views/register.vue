<template>
    <div>
        <Navbar />
        <router-view />
        <div class="whole_content">
            <contentRectangle class="content_rectangle">
                <div class="flex flex-col w-4">
    <input class="input_register" type="text" v-model="username" placeholder="username">
    <input class="input_register" type="text" v-model="email" placeholder="email">
    <input class="input_register" type="password" v-model="password" placeholder="password">
                    <div class="button_div">
                    <Button :button-text="buttonText3" class="button_login" @click="register">
                    </Button>
                    </div>
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
            async getUserData() {
                try {
                    const response = await axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/api/userdata', {withCredentials: true});
                } catch (error) {
                    console.error(error);
                }
            },

        async register() {
            try {
                 await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }, {withCredentials: true});

                await this.getUserData();

                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        },
        },
};
</script>

<style>
.input_register {
    margin: 4% 30px;
    text-align: center;

}

.button_div {
    margin: 10% 0;
    display: flex;
    justify-content: center;
}

.flex flex-col {
    margin: 0 40%;
}

</style>