<template>

    <div class="navbar-container">
        <div class="logo-container">
            <a href="/" class="logo-link">
            <img src="/images/logo.png" alt="Logo" class="logo">
            </a>
        </div>
        <div class="nav-wrapper">
        <ul class="navbar">
            <li class="navbar-link">
                <router-link to="/shop">Tales & Talk</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/cart/:memberId">Your Cart</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/members">Our Ensemble</router-link>
            </li>
            <li class="navbar-link" v-if="!isLoggedIn">
                <router-link to="/login">Login</router-link>
            </li>
            <li class="navbar-link" v-else>
                <a @click="logout">Logout</a>
            </li>
        </ul>

        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            members: [],
            isLoggedIn: false,
        };
    },

    created() {
        this.checkLoginStatus();
    },

    methods: {
        async logout() {
            try {
                this.isLoggedIn = false;
                await axios.post(import.meta.env.VITE_APP_API_BASE_URL + '/api/logout', {}, {withCredentials: true});
                this.$router.push('/');
            } catch (error) {
                console.error('Error during logout:', error);
            }

            },

        async checkLoginStatus() {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/api/isLoggedIn', {withCredentials: true});
                if (response.data.loggedIn) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }

        },

    },
};

</script>

<style>
.navbar-container {
    font-family: 'Inter', sans-serif;
    letter-spacing: 2px;
    width: 80%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0px 5px 60px #d31027);
    z-index: 1000;
}
.logo-container {
    position: absolute;
    top: 4%;
    left: 8%;
    transform: translateX(-50%);
}

.logo {
    width: 150px;
    height: auto;

}
.nav-wrapper {
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10%;
    background: #131862;
    color: white;
    height: 10rem;
    padding: 0 1rem;
    list-style-type: none;
}

.router-link-active {
    color: #D3A625;
}

.navbar-link router-link {
    color: white;
    text-decoration: none;

}

@media screen and (min-width: 330px) and (max-width: 622px) {
    .navbar-link {
        margin-left: 2%;
        margin-top: 28%;
        text-align: center;
    }

    .navbar-container {
        width: 80%;
        font-size: 0.5rem;
    }

    .logo-container {
        width: 27%;
        height: auto;
        margin: 0 12%;

    }
}

@media screen and (min-width: 623px) and (max-width: 768px) {
    .navbar {
        justify-content: flex-end;
        gap: 8%;
    }

    .navbar-container {
        width: 80%;
        font-size: 0.6rem;

    }

    .logo-container {
        width: 23%;
        height: auto;
        margin: 0 3%;

    }


}

@media screen and (min-width: 769px) and (max-width: 1024px)  {
    .navbar {
        gap: 8%;
        justify-content: right;
    }

    .navbar-container {
        width: 80%;
        font-size: 0.7rem;
    }

    .logo-container {
        width: 36%;
        height: auto;
        margin: 0 12%;

    }



}

@media screen and (min-width: 1025px) {
    .navbar {
        gap: 7%;
        justify-content: center;
    }

    .navbar-container {
        font-size: 1rem;
    }
}



</style>