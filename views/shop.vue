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
    import login from "./login.vue";


    export default {
        computed: {
        login() {
            return login
        }
    },
        components: {BookRectangle, Banner, Navbar},
        data() {
            return {
                books: [],
                isLoggedIn: false,

            };
        },
        mounted() {
            this.checkLoggedIn();
            this.fetchBooks();
        },
        methods: {
            checkLoggedIn() {
            axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/isLoggedIn', { withCredentials: true })
            console.log("checkLoggedIn ")
                .then(response => {
                    this.isLoggedIn = response.data.loggedIn;
                    console.log("checkLoggedIn nach this. ")
                })
                .catch(error => console.error('Error checking logged in status:', error));
        },
            fetchBooks() {
                this.checkLoggedIn();
                axios.create({ withCredentials: true })
                    .get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/shop`)
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
                return '/blourish-and-flotts/images/' + imageName;
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

    .container_p {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .loggedin_text {
        color: #D3A625;
        text-shadow: 0 0 40px rgba(37, 170, 225, 0.5);
        font-size: 1.1rem;
        align-items: center;
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