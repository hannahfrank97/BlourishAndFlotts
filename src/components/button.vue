<template>
    <div class="buttons">
    <div class="btn-hover color-9">
        {{ buttonText }}
    </div>
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
.buttons {
    margin: 10%;
    text-align: center;
    line-height: 1.5;
}

.btn-hover {
    width: 200px;
    height: 55px;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    text-align: center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    display: flex; /* Added */
    justify-content: center; /* Added */
    align-items: center; /* Added */
}

.btn-hover:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.button-text {
    display: inline-block;
    vertical-align: middle;
}
</style>