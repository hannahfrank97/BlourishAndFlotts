<template>
    <div>
        <navbar class="relative z-30" />
        <router-view />
            <Banner />
            <div class="member-container-wrapper absolute w-full top-10">
        <div v-if="member">
            <img :src="getImageSource(member.image)" class="member-image" :alt="member.username" />
            <h2 class="member_username"> {{ member.username }}</h2>
            <p class="member_email"> {{ member.email }}</p>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import memberRectangle from "@/components/memberRectangle.vue";
import Navbar from "@/components/navbar.vue";
import Banner from "@/components/banner.vue";

export default {
    components: {Banner, Navbar},
    props: ['member'],
    data() {
        return {
            member: {},
        }
        },
    mounted() {
        this.fetchMember();
    },
    methods: {
        fetchMember() {
            console.log(this.$route.params.memberId);
            let memberID = this.$route.params.memberId
            axios
                .create({ withCredentials: true })
                .get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/members/${memberID}`)
                .then((response) => {
                    console.log(response.data.member);
                    this.member = response.data.member;
                })
                .catch((error) => console.error(error));
        },

        getImageSource(imageName) {
            if(imageName && imageName.trim() !== '') {
                return '/src/images/' + imageName;
            } else {
                return '/src/images/logo.png';
            }
        },
    },
};
</script>


<style>

.member-image {
    width: 400px;
    height: 400px;
    margin-top: 40%;
    filter: drop-shadow(0px 10px 40px rgba(103, 128, 156, 1));
    border-radius: 4%;
}

.member-container-wrapper {
    position: absolute;
    width: 100%;
    top: 8%;
    display: flex;
    justify-content: center;

}

.member_username {
    color: #D3A625;
    font-size: 1.4rem;
    text-align: center;
    margin-top: 3%;
}

.member_email {
    color: #D3A625;
    text-align: center;
    font-size: 1.2rem;
}
</style>



