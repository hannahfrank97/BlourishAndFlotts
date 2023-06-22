<template>
    <div>
        <navbar />
        <router-view />
        <Banner />
        <contentRectangle>
            <div class="flex flex-col">
                <input
                        type="text"
                        style="margin-bottom: 10px; margin-top: 30px; width:300px ; height: 30px; text-align: center"
                        v-model="street"
                        placeholder="Street and Number"
                />
                <input
                        type="text"
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="city"
                        placeholder="City"
                />
                <input
                        type="text"
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="state"
                        placeholder="State"
                />
                <input
                        type="text"
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="zipCode"
                        placeholder="Zip Code"
                />
                <input
                        type="text"
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="country"
                        placeholder="Country"
                />
                <select
                        style="margin-bottom: 10px; width:300px ; height: 30px; text-align: center"
                        v-model="paymentMethod"
                >
                    <option disabled value="">Please select a payment method</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                </select>
                <Button :button-text="buttonText9" class="" @click="checkout">
                </Button>
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

.checkout_text {
    color: #D3A625;
    text-shadow: 0 0 40px rgba(37, 170, 225, 0.5);
    font-size: 1.1rem;
}




</style>