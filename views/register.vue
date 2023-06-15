<template>
  <h1>hello i am the register page</h1>
    <input type="text" v-model="username" placeholder="username">
    <input type="text" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <button @click="register">Register</button>
    <button>Logout</button>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
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