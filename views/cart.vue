<template>
    <div>
        <h1>
            Hello this is my cart page
        </h1>
        <ul>
            <li v-for="item in cart" :key="item.bookId">
                {{ item.title }} {{ item.amount }} {{ formatPrice(item.price * item.amount) }}
                <button @click="buyItems(item.bookId)">Buy</button>
            </li>

        </ul>
        <p>Total Price: {{ formatPrice(totalPrice) }}</p>
    </div>

  <div>
  </div>
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
            axios.create({withCredentials: true})
                .get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/cart`)
                .then(response => {
                    this.cart = response.data.cartData;
                    console.log(response.data.cartData)
                })
                .catch(error => console.error(error));
        },


        formatPrice(price) {
            let priceDisplay = price + " ₲";
            return priceDisplay;

        },

        buyItems(selectedBookIds) {
            axios.create({withCredentials: true})
                .post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/cart/buy`, { itemIds: selectedBookIds }) // assuming your buy route is /api/cart/buy
                .then(() => {
                    this.$toast.success('Thank you for shopping at Flourish & Blotts!', { duration: 3000 });
                    setTimeout(this.$toast.clear, 3000);
                    this.fetchCart();
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    },

    //cart clears when another member logs in
    watch: {
        $route(to, from) {
            if (to.name === 'cart' && to.meta.requiresAuth) {
                const currentMemberId = to.params.memberId;
                const previousMemberId = from.params.memberId;

                if (currentMemberId !== previousMemberId) {
                    this.cart = [];
                    this.fetchCart();
                }
            } else {
                this.cart = []; // Reset the cart data if not on the cart page or if not logged in
            }
        },

    },

    computed: {
            totalPrice() {
                if (this.cart.length === 0) {
                    return 0;
                }
                return this.cart[0].totalPrice;
            }
        }
    }
</script>