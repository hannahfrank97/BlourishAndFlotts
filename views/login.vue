<template>
    <div>
        <navbar />
        <router-view />
            <contentRectangle class="rectangle">
                <div class="flex flex-col mt-6">
                    <input class="input_login"
                        type="text"
                        v-model="email"
                        placeholder="email"
                    />
                    <input class="input_login"
                        type="password"
                        v-model="password"
                        placeholder="password"
                    />
                    <div class="button_div">
                    <Button :button-text="buttonText2" class="button_login" @click="login">
                    </Button>
                    </div>
                </div>
                <p class="login_text">
                    Not a magical member yet? Click  <a href="./register" class="login_link">here</a>
                </p>
            </contentRectangle>
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

                this.$router.push('/')
                .then (() => {
                this.$toast.success('Login successfull!', { duration: 3000 });
                setTimeout(this.$toast.clear, 3000);
                })
                

            } catch (error) {
                console.error(error)
                this.$toast.error('Wrong username or password!', { duration: 3000 });
                setTimeout(this.$toast.clear, 3000);
                
            }
        },



    }
};
</script>

<style>

.input_login {
    margin: 4% 0;
    text-align: center;

}

.button_div {
    margin: 10% 0;
    display: flex;
    justify-content: center;
}


.login_text {
    color: #D3A625;
    text-shadow: 0 0 40px rgba(37, 170, 225, 0.5);
    font-size: 1.3rem;
    margin: 3%;
    text-align: center;
}

.login_link {
    font-weight: bold;
}

@media screen and (min-width: 330px) and (max-width:749px) {

    .login_text {
        font-size: 0.8rem;
    }

    .input_login {
        margin: 4% 4%;

    }

}
</style>