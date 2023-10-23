<template>
    <div class="whole_container">
    <div class="flex items-center justify-center custom-width custom-height ">
        <div class="border-4 border-color-blue1 p-2 flex justify-center items-center custom-shadow">
            <div class="border-4 border-color-blue2 p-2 flex justify-center items-center">
                <div class="border-4 border-color-blue3 p-2 flex justify-center items-center">
                    <div class="border-4 border-color-blue4 flex flex-col justify-center items-center">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>


<style scoped>

.whole_container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 5%;
}


.custom-shadow {
    box-shadow: 10px 0 30px rgba(37, 170, 225, 0.5);
}

@media screen and (min-width: 330px) and (max-width:749px) {
    .custom-width {
        width: 74%;
    }

    .custom-height {
        height: auto;
    }


}

</style>


<script setup>
</script>