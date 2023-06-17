<template>
    <div>
        <h1>Hello this is our shop page</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                <h2>{{ book.title }}</h2>
                <p>{{ book.price }}</p>
                <button @click="addToCart(book.id)">Add to Cart</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
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
        }


    },
};
</script>
