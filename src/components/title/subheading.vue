<template>
    <div class="sub-heading">
        {{ text }}
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:'sub-heading',
    props:['text']
});
</script>

<style scoped>
    div.sub-heading {
        border: 1px solid black;
    }
</style>