<template>
    <div>
        <navbar />
        <router-view />
        <contentRectangle>
            <div class="flex flex-col">
                <input class="checkout_input"
                        type="text"
                        v-model="street"
                        placeholder="Street and Number"
                />
                <input class="checkout_input"
                        type="text"
                        v-model="city"
                        placeholder="City"
                />
                <input class="checkout_input"
                        type="text"
                        v-model="state"
                        placeholder="State"
                />
                <input class="checkout_input"
                        type="text"
                        v-model="zipCode"
                        placeholder="Zip Code"
                />
                <input class="checkout_input"
                        type="text"
                        v-model="country"
                        placeholder="Country"
                />
                <select class="payment_input"
                        v-model="paymentMethod"
                >
                    <option disabled value="">Please select a payment method</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                </select>
                <div class="button_div">
                <Button :button-text="buttonText9" class="button_login" @click="checkout">
                </Button>
                </div>
            </div>
            <p class="checkout_text">
            </p>
        </contentRectangle>
    </div>
</template>



<script>
import ContentRectangle from "@/components/contentRectangle.vue";
import Navbar from "@/components/navbar.vue";
import Banner from "@/components/banner.vue";
import Button from "@/components/button.vue";

export default {
    components: {Button, ContentRectangle, Banner, Navbar},
    data() {
        return {
            email: '',
            password: '',
            buttonText9: 'Checkout',
        }

    },

        methods: {
            async checkout () {
                this.$router.push('/')
                .then (() => {
                this.$toast.success('Good choice! Your books will soon arrive at your address.', { duration: 3000 });
                setTimeout(this.$toast.clear, 3000);

                })

            }
        }

}

</script>

<style>


.checkout_input {
    margin: 2% auto;
}

.payment_input {
    margin: 2% 15%;
}

.checkout_text {
    color: #D3A625;
    text-shadow: 0 0 40px rgba(37, 170, 225, 0.5);
    font-size: 1.1rem;
}

.button_div {
    display: flex;
    justify-content: center;
}

.button_div {
    margin: 5% 0;
}

</style>