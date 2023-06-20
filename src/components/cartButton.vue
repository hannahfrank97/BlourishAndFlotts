<template>

    <div class="custom-button color-custom">
        <div class="button-text">{{ buttonText }}</div>
    </div>


</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
        },
    },
};

</script>

<style>
.custom-button {
    margin: 10%;
    text-align: center;
    line-height: 1.5;
}

.custom-button {
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

.custom-button:hover {
    background-position: right;
    transition: all 0.4s ease-in-out;
    background-image: linear-gradient(to right, #08a4c5, #6567d2, #dd2536, #43cad8, #e66b1b);
}

.custom-button:focus {
    outline: none;
}

.custom-button.color-custom {
    background-image: linear-gradient(to right, #08a4c5, #6567d2, #dd2536, #43cad8, #e66b1b);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.button-text {
    display: inline-block;
    vertical-align: middle;
}
</style>



