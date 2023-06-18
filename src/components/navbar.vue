<template>

    <div class="navbar-container">
        <ul class="navbar">
            <li class="navbar-link">
                <router-link to="/shop">Tales & Talk</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/about">Behind the Spell</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/members">Our Ensemble</router-link>
            </li>
            <li class="navbar-link">
                <router-link to="/login">Login</router-link>
            </li>
        <li class="navbar-link profileContainer">
            <router-link to="/profile" class="profile_icon"></router-link>
        </li>
        </ul>
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
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: #131862;
    color: white;
    height: 110px;
    padding: 0 1rem;
    list-style-type: none;
}

.navbar-link {
    display: flex;
    flex: 1;
}

.navbar-link router-link {
    color: white;
    text-decoration: none;
}

.profileContainer {
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
    margin-left: auto;
    margin-top: 10px;
}

.profile_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #505053;
}
</style>