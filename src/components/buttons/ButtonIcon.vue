<template>
    <button 
        class="submit" 
        @click="$emit('button-action')"> 
        
        <div
            class="text"
            v-if="!isLoading">
            <font-awesome-icon :icon="['fas', buttonIcon]" />
        </div>

        <div 
            class="loader"
            v-if="isLoading"
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: "button-icon",
    props: ['buttonIcon', 'isLoading']
});
</script>

<style scoped>
    .submit{
        width: 100%;    
        height: 100%;
        font-weight: 500;
        margin: 0% auto 0%;
        font-size: 90%;
        cursor: pointer;
        outline: none;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .submit:disabled{
        opacity: 0.7;
    }
    .text {
        color: inherit;
    }
    .loader {
        height: 13px;
        width: 83px;
    }
    .loader div {
        background: white;
    }
</style>

