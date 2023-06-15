<template>

  <h1>
      hello i am the login page
  </h1>
    <input type="text" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <button @click="login">Login</button>
  <button>Logout</button>

</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/login', {
                    email: this.email,
                    password: this.password,
                }, {withCredentials: true});

            } catch (error) {
                console.error(error);
            }
        },

    }
};
</script>