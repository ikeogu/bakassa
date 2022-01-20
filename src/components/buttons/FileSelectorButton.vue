<template>
    <label class="file_selector_button">
        <div class="button">
            {{ buttonText }}
        </div>
        <input 
            type="file"
            accept="video/*"
            @change="handleFileChange"
        >
    </label>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: "file-selector-button",
    props: ['buttonText'],
    methods: {
        handleFileChange(event) {
            this.$emit('input', {file: event.target.files[0]});
        }
    }
});
</script>

<style scoped>
label .button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(208, 75, 75);
    color: rgb(208, 75, 75);
    background: rgba(231, 154, 154, 0.083);
}
input {
    display: none;
}
</style>