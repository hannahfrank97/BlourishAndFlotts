<template>
    <div>
        <router-view />
        <navbar />
            <div class="member-container-wrapper">
                <div class="item-container">
                    <h1 class="total_price">Total Price: {{ formatPrice(totalPrice) }}</h1>
                    <div v-for="item in cart" :key="item.bookId" class="cart_item">
                        <img :src="getImageSource(item.image)" class="item_images" :alt="item.title" />
                        <h2 class="item_amount">{{ item.amount }}</h2>
                        <h1 class="item_title">{{ item.title }}</h1>
                        <h3 class="item_price">{{ formatPrice(item.price * item.amount) }}</h3>
                        <redButton :button-text7="buttonText7" @click="deleteFromCart(item.bookId)"/>
                    </div>
                    <div class="button_div">
                    <cartButton class="cartButton" :button-text="buttonText5" @click="buyItems"/>
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
import redButton from "@/components/redButton.vue";

export default {
    components: {CartButton, Banner, Navbar, redButton},
    data() {
        return {
            cart: [],
            books: [],
            members: [],
            buttonText5: 'Buy',
            buttonText7: 'Delete me',
        };
    },
    mounted() {
        this.fetchCart();
    },
    methods: {
        getImageSource(imageName) {
            return '/blourish-and-flotts/images/' + imageName;
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

        buyItems() {
            axios.create({withCredentials: true})
                .post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/cart/buy`)
                .then(() => {
                    this.fetchCart();
                    this.$router.push('/cart/buy');
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        deleteFromCart (itemID) {
            axios.create({ withCredentials: true })
                .post(import.meta.env.VITE_APP_API_BASE_URL + '/api/cart/delete', { bookId: itemID})
                .then(response => {
                    this.$toast.warning('The item was removed successfully from your cart.', { duration: 3000 });
                    setTimeout(this.$toast.clear, 3000);
                    window.location.assign(window.location.href);
                    })

                .catch(error => {
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
                this.cart = [];
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

.button_div {
    display: flex;
    justify-content: center;
    margin-top: 5%;
}
.member-container-wrapper {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.item_title {
    color: #D3A625;
    font-size: 1.4rem;
    text-align: center;
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
    width: 50%;
    height: auto;
}

.total_price {
    color: #D3A625;
    font-size: 2rem;
    white-space: nowrap;
    align-self: center;
}

.item-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 80%;
    margin-top: 3%;
}

.cart_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 2% auto;
}

@media screen and (min-width: 330px) and (max-width:749px) {

    .item-container {
        margin: 2%;


    }
    .total_price {
        font-size: 1.3rem;
    }
}

</style>

