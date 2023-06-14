<template>
    <div>
        <h1>Hello this is our members page</h1>
        <ul>
            <li v-for="member in members" :key="member.id">
                <h2>{{ member.username }}</h2>
                <p>{{ member.email }}</p>
            </li>
        </ul>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    data() {
        return {
            members: [],
        };
    },
    mounted() {
        this.fetchMembers();
    },
    methods: {
        fetchMembers() {
            axios.get(import.meta.env.VITE_APP_API_BASE_URL + '/members')
                .then(response => {
                    this.members = response.data.members;
                })
                .catch(error => console.error(error));
        },
    },
};

</script>