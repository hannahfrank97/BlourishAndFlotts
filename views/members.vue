<template>
    <navbar />
    <div>
        <router-view />
        <div class="container_p">
            <p class="loggedin_text" v-if="!isLoggedIn">
                Please <a href="./login">login</a> or <a href="./register">register</a> to see our magical ensemble!
            </p>
        </div>
        <div class="whole_content">
            <Banner class="banner_class" style="height: 0vh;"/>
        </div>
            <div class="member-container-wrapper">
                <div class="member-container">
                    <div v-for="member in members" :key="member.id">
                        <memberRectangle :member="member" />
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
import login from "./login.vue";

export default {
    computed: {
        login() {
            return login
        }
    },
    components: {Banner, Navbar, MemberRectangle, member},
    data() {
        return {
            members: [],
            isLoggedIn: false,
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
                    this.isLoggedIn = this.members.length > 0;
                })
                .catch(error => console.error(error));
        },
    },
};

</script>

<style>

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

.member-container-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.member-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    align-self: center;
}

.member-container > div {
   width: 20%;
    margin: 2.5em;
}

@media screen and (min-width: 330px) and (max-width:749px) {

    .member-container-wrapper {
        flex-direction: column;
    }

    .member-container > div {
        flex: 1 0 20%;
        margin: 2.5em;
    }

    .loggedin_text {
        font-size: 0.8rem;

    }

}

@media screen and (min-width: 750px) and (max-width:1200px) {

}

</style>