<template>
    <navbar />
    <div class="banner">
        <div class="content-container">
            <div class="text-container">
                <h1 class="h1_banner">Your most inspiring magical magic book experience</h1>
            </div>
            <div class="image-container">
                <img src="../public/images/bannerImage.png" alt="two books" class="banner_image">
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

<style>

.banner {
    font-family: 'Inter', sans-serif;
    letter-spacing: 2px;
    width: 80%;
    margin: 0 auto 1rem auto;
    background: #131862;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
}


.content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.text-container {
    flex: 0.6;
    text-align: center;
}

.image-container {
    flex: 1;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
}

.h1_banner {
    margin-left: 8rem;
    font-size: 2rem;
    font-family: 'FKR Area51Life';
    color: #D3A625;
    max-width: 70%;
}

.banner_image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    filter: drop-shadow(100px 40px 50px rgba(50, 73, 78, 0.5));


}

.button-container {
    display: flex;
    justify-content: center;
}

@media screen and (min-width: 330px) and (max-width: 624px) {

    .h1_banner {

        font-size: 0.5rem;
        margin-left: 50%;
        text-align: center;
    }

    .banner {
        margin-top: 0;
    }

    .banner_image {
        width: 100%;
        height: auto;
    }


}

@media screen and (min-width: 625px) and (max-width: 767px) {
    .h1_banner {

        font-size: 0.5rem;
        margin-left: 50%;
        text-align: center;
    }

    .banner {
        margin-top: 0;
    }

    .banner_image {
        width: 82%;
        height: auto;
    }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
    .h1_banner {

        font-size: 0.8rem;
        margin-left: 60%;
        text-align: center;
    }

    .banner {
        margin-top: 0;
    }

    .banner_image {
        width: 60%;
        height: auto;
    }

}

@media screen and (min-width: 1025px) and (max-width: 1300px) {
    .h1_banner {

        font-size: 1.2rem;
        margin-left: 53%;
        text-align: center;
    }

    .banner {
        margin-top: 0;
    }

    .banner_image {
        width: 60%;
        height: auto;
    }

}



</style>

