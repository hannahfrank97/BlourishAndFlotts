<template>
    <div>
        <navbar class="relative z-30" />
        <router-view />
        <div class="banner-container relative">
            <Banner style="height: 190vh;"/>
            <div class="member-container-wrapper absolute w-full top-10">
                <div class="member-container">
                    <div v-for="member in members" :key="member.id">
                        <memberRectangle :member="member" />
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
import MemberRectangle from "@/components/memberRectangle.vue";
import member from "./member.vue";

export default {
    components: {Banner, Navbar, MemberRectangle, member},
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
            axios.create({ withCredentials: true }).get(import.meta.env.VITE_APP_API_BASE_URL + '/api/members')
                .then(response => {
                    this.members = response.data.members;
                })
                .catch(error => console.error(error));
        },
    },
};

</script>

<style>
.banner-container {
    position: relative;
}

.member-container-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
}

.member-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    margin-left: 2%;
    margin-top: 5%;
    margin-bottom: 10%;
}

.member-container > div {
    flex: 1 0 20%; /* grow | shrink | basis */
    margin: 2.5em;
}

</style>