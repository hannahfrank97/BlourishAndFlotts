<template>
<h1>
    Hello this is my member page
</h1>

</template>

<script>
import axios from 'axios';
import members from "./members.vue";

export default {
    computed: {
        members() {
            return members
        }
    },
    data() {
        return {
            member: null,
        };
    },
    created() {
        axios
            .get(`/api/members/${this.$route.params.id}`)
            .then(response => {
                this.member = response.data.member;
            })
            .catch(error => console.error(error));
    },
};
</script>