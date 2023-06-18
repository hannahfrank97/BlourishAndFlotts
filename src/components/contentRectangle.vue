<template>
    <div class="absolute top-0 w-full h-full flex items-center justify-center">
        <div class="w-1/2 h-1/2 border-4 border-color-blue1 p-2 flex justify-center items-center custom-width custom-height custom-shadow">
            <div class="w-full h-full border-4 border-color-blue2 p-2 flex justify-center items-center">
                <div class="w-full h-full border-4 border-color-blue3 p-2 flex justify-center items-center">
                    <div class="w-full h-full border-4 border-color-blue4 flex flex-col justify-center items-center">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.custom-width {
    width: 50%;
}

.custom-height {
    height: 50%;
}

.custom-shadow {
    box-shadow: 10px 0 30px rgba(37, 170, 225, 0.5);
}

</style>






