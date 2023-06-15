<template>
    <div>
        <h1>Hello, this is my member page</h1>
        <div v-if="member">
            <h2>{{ member.username }}</h2>
            <p>{{ member.email }}</p>
        </div>
        <div v-else>Ups.No member!</div>
    </div>

</template>

<script>
import axios from 'axios';
import members from "./members.vue";

export default {
    data() {
        return {
            member: null,
        };
    },
    mounted() {
        this.fetchMember();
    },
    methods: {
        fetchMember() {
            axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/members/${this.$route.params.id}`)
                .then(response => {
                    this.member = response.data.member;
                })
                .catch(error => console.error(error));
        },
    },
};

</script>