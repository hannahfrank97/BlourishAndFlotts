<template>
    <div id="app">
        <nav>
            <!-- Navigation bar -->
        </nav>

        <header>
            <!-- Header section -->
        </header>

        <main>
            <!-- Main content -->
            <router-view></router-view>
        </main>

        <footer>
            <!-- Footer section -->
        </footer>
    </div>
</template>

<script>

/*export default {
    data () {
        return {
            data :[],
        };
    },

    created () {
    fetch("http://localhost:3000")
        .then(res => res.json())
        .then (data => {
        this data = data;
        })
        .catch (err => console.error(err));

    },
};*/
</script>

<style>
/* Component styles */
</style>