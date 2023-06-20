<template>

    <div class="navbar-container">
        <div class="logo-container">
            <a href="/" class="logo-link">
            <img src="../images/logo.png" alt="Logo" class="logo">
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
            <li class="navbar-link">
                <router-link to="/login">Login</router-link>
            </li>
        </ul>

        </div>
    </div>
</template>


<script setup>
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
}
.logo-container {
    position: absolute;
    top: 4%;  /* Adjust this value as needed to move the logo up or down */
    left: 8%;
    transform: translateX(-50%);
}

.logo {
    width: 150px;  /* Adjust this value as needed */
    height: auto;

}
.nav-wrapper {
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 0;
    background: #131862;
    color: white;
    height: 150px;
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

.navbar-link {
    margin-left: 6rem;

}


</style>