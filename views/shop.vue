<template>
    <div>
        <navbar />
        <router-view />
        <div class="container_p">
            <p class="loggedin_text" v-if="!isLoggedIn">
                Please <a href="./login">login</a> or <a href="./register">register</a> to see our magical shop!
            </p>
        </div>
        <div class="whole_content">
                <Banner style="height: 0vh;"/>
             <div class="book-container-wrapper">
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
import {apiUrl} from "@/main";

export default {
    components: {BookRectangle, Banner, Navbar},
    data() {
        return {
            books: [],
            isLoggedIn: false,

        };
    },
    mounted() {
        this.fetchBooks();
    },
    methods: {
        fetchBooks() {
            axios.create({ withCredentials: true })
                .get(apiUrl + '/api/shop')
                .then(response => {
                    this.books = response.data.books;
                    this.isLoggedIn = this.books.length > 0;
                })
                .catch(error => console.error(error));
        },

        addToCart(itemId) {
            axios.create({ withCredentials: true })
                .post(import.meta.env.VITE_APP_API_BASE_URL + '/api/cart', { bookId: itemId })
                .then(response => {
                    this.$toast.success('You successfully added the book to your cart!', { duration: 3000 });
                    setTimeout(this.$toast.clear, 3000)
                })
                .catch(error => {
                    this.$toast.warning('Be sure to log in to add our magical books to the cart!', { duration: 3000 });
                    setTimeout(this.$toast.clear, 3000);
                    console.error(error);
                });
        },

        getImageSource(imageName) {
            return '/images/' + imageName;
        }
    },
};


</script>

<style>

.book-container-wrapper {
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
}

.book-container > div {
    flex: 1 0 20%; /* grow | shrink | basis */
    margin: 2.5em;
}

.banner-container {
    position: relative;
    margin-top: 6%;
}


@media screen and (min-width: 330px) and (max-width:622px) {

    .book-container {
        width: 100%;
        flex-direction: column;
        margin: 2% auto;

    }

    .book-container-wrapper {
        flex-direction: column;
    }

}

</style>