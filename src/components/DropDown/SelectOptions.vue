<template>
    <div class="select_options">
        <div 
            class="option"
            v-for="(option, index) in alloptions"
            :key="index"
            @click="$emit('selected', index)"
        >
            {{ option.display_name }}
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: 'select-options',
    props: ['alloptions']
});
</script>

<style scoped>
.select_options {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    background: white;
    color: black !important;
    transition: 0.2s;
}
.option {
    padding: 10% 5%;
    transition: 0.2s;
}
.option:hover {
    background: var(--burgundy-white-text);
}
</style>