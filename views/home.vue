<template>
    <navbar />
    <div class="banner">
        <div class="content-container">
            <div class="text-container">
                <h1 class="h1_banner">Your most inspiring magical magic book experience</h1>
            </div>
            <div class="image-container">
                <img src="../src/images/bannerImage.png" alt="two books" class="banner_image">
            </div>
        </div>
        <router-link to="/shop">
        <div class="button-container">
            <Button :button-text="buttonText1"/>
        </div>
        </router-link>
    </div>

</template>


<script>
import Navbar from "../src/components/navbar.vue";
import Button from "../src/components/button.vue";

export default {
    components: {
        Button,
        Navbar,
    },

    data() {
        return {
            buttonText1: 'BOOKSHELF',
        };
    },
};
</script>

