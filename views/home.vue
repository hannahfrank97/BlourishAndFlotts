<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
        <TestComponent /> <!-- Make sure TestComponent is used -->
    </div>
</template>

<script>
import TestComponent from '../src/components/testcomponent.vue';

export default {
    components: {
        TestComponent,
    },
};
</script>
