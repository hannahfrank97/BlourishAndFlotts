<template>
    <div class="btn-red-gradient fancy-effect">
        <div class="text-content">{{ buttonText7 }}</div>
    </div>
</template>

<script>
export default {
    props: {
        buttonText7: {
            type: String,
            required: true,
        },
    },
};
</script>

<style>
.btn-red-gradient {
    margin: 10%;
    text-align: center;
    line-height: 1.5;
    width: 150px;
    height: 40px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20%;
}

.btn-red-gradient:hover {
    background-position: right;
    transition: all 0.4s ease-in-out;
    background-image: linear-gradient(to right, #d31027, #ea384d, #f33434, #f75151, #fc6868);
}

.btn-red-gradient:focus {
    outline: none;
}

.fancy-effect {
    background-image: linear-gradient(to right, #d31027, #ea384d, #f33434, #f75151, #fc6868);
    box-shadow: 0 4px 15px 0 rgba(210, 16, 39, 0.75);
}

.text-content {
    display: inline-block;
    vertical-align: middle;
}
</style>
