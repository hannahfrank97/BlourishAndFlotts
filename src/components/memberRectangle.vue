<template>
    <router-link :to="{ name: 'Member', params: { memberId: member.id }}">
        <div class="member-rectangle">
            <img :src="getImageSource(member.image)" class="member_images" :alt="member.username" />
            <h3 class="member_username">{{ member.username }}</h3>
            <p class="member_email">{{ member.email }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['member'],
    methods: {
        getImageSource(imageName) {
            return '/src/images/' + imageName;
        },
    },
};
</script>

<style scoped>
.member-rectangle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.member_images {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0px 10px 40px rgba(103, 128, 156, 1));
    border-radius: 2%;
}

.member_username {
    color: #D3A625;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 3%;
}

.member_email {
    color: #D3A625;
    text-align: center;
    font-size: 1rem;
}

</style>
