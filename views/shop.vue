<template>
    <div>
        <h1>Hello this is our shop page</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                <h2>{{ book.title }}</h2>
                <p>{{ book.price }}</p>
                <button>Add to cart</button>
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
            axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/api/shop')
                .then(response => {
                    this.books = response.data.books;
                })
                .catch(error => console.error(error));
        },
    },
};



</script>