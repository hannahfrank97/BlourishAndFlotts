<template>
    <div>
        <navbar class="relative z-30" />
        <router-view />
        <div class="banner-container relative">
            <Banner style="height: 370vh;"/>
            <div class="book-container-wrapper absolute w-full top-10">
                <div class="book-container">
                    <div v-for="book in books" :key="book.id">
                        <bookRectangle :book="book" @addToCart="addToCart" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Navbar from "@/components/navbar.vue";
import Banner from "@/components/banner.vue";
import BookRectangle from "@/components/bookRectangle.vue";

export default {
    components: {BookRectangle, Banner, Navbar},
    data() {
        return {
            books: [],

        };
    },
    mounted() {
        this.fetchBooks();
    },
    methods: {
        fetchBooks() {
            axios.create({ withCredentials: true })
                .get(import.meta.env.VITE_APP_API_BASE_URL + '/api/shop')
                .then(response => {
                    this.books = response.data.books;
                })
                .catch(error => console.error(error));
        },

        addToCart(itemId) {
            axios.create({ withCredentials: true })
                .post(import.meta.env.VITE_APP_API_BASE_URL + '/api/cart', { bookId: itemId })
                .then(response => {
                    this.$toast.success('You successfully added the book to your cart!', { duration: 3000 });
                    setTimeout(this.$toast.clear, 3000)
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        getImageSource(imageName) {
            return '/src/images/' + imageName;
        }
    },
};


</script>

<style>
.banner-container {
    position: relative;
}

.book-container-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
}

.book-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    margin-left: 2%;
    margin-top: 0;
    margin-bottom: 10%;
}

.book-container > div {
    flex: 1 0 20%; /* grow | shrink | basis */
    margin: 2.5em;
}

</style>