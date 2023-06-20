<template>
    <div class="flex justify-center items-center custom-height book-rectangle">
        <div class="items-center justify-center">
            <h2 class="book_title">{{ book.title }}</h2>
            <p class="book_price">{{ book.price }}₲</p>
            <img :src="getImageSource(book.image)" class="shop_images" :alt="book.title" />
            <Button :button-text="buttonText3" @click="$emit('addToCart', book.id)"></Button>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button.vue";

export default {

    components: {Button},
    props: ['book'],
    data() {
        return {
            buttonText3: 'Add to Cart',
        };
    },
    methods: {
        getImageSource(imageName) {
            return '/src/images/' + imageName;
        },
    },
};
</script>

<style scoped>
.book-rectangle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.shop_images {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0px 10px 40px rgba(103, 128, 156, 1));
}

.book_title {
    color: #D3A625;
    font-size: 1.2rem;
    text-align: center;
}

.book_price {
    color: #D3A625;
    text-align: center;
    font-size: 1rem;
}

</style>