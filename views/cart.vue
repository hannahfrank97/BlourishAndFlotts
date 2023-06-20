<template>
    <div>
        <navbar class="relative z-30" />
        <router-view />
        <div class="banner-container relative">
            <Banner style="height: 190vh;" />
            <div class="member-container-wrapper absolute w-full top-10">
                <div class="item-container">
                    <div v-for="item in cart" :key="item.bookId">
                        <img :src="getImageSource(item.image)" class="item_images" :alt="item.title" />
                        <h2 class="item_amount">{{ item.amount }}</h2>
                        <h1 class="item_title">{{ item.title }}</h1>
                        <h3 class="item_price">{{ formatPrice(item.price * item.amount) }}</h3>
                        <cartButton :button-text="buttonText5"  @click="buyItems(item.bookId)" />

                    </div>

                    <h1 class="total_price">Total Price: {{ formatPrice(totalPrice) }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "@/components/navbar.vue";
import Banner from "@/components/banner.vue";
import CartButton from "@/components/cartButton.vue";

export default {
    components: {CartButton, Banner, Navbar},
    data() {
        return {
            cart: [],
            books: [],
            buttonText5: 'Buy this cool item',
        };
    },
    mounted() {
        this.fetchCart();
    },
    methods: {
        getImageSource(imageName) {
            return '/src/images/' + imageName;
        },

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

<style>
.member-container-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;

}

.item_title{
    color: #D3A625;
    font-size: 1.4rem;
    text-align: center;
    margin-top: 3%;
}

.item_amount {
    color: #D3A625;
    text-align: center;
    font-size: 1.2rem;
}

.item_price {
    color: #D3A625;
    text-align: center;
    font-size: 1.2rem;


}

.item_images {
    filter: drop-shadow(0px 10px 40px rgba(103, 128, 156, 1));
    height: 300px;
    width: 250px;
}

.total_price {
    margin-top: 30%;
    color: #D3A625;
    font-size: 2rem;


}

.item-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>
