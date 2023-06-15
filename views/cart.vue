<template>

    <h1>
        Hello this is my cart page
    </h1>
  <h2>
      {{ cart }}
  </h2>




</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cart: [],
        };
    },
    mounted() {
        this.fetchCart();
    },
    methods: {
        fetchCart() {
            axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/api/cart')
                .then(response => {
                    this.cart = response.data.cart;
                })
                .catch(error => console.error(error));
        },
    },
};



</script>