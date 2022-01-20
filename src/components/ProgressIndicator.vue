<template>
    <div class="progress-indicator">
        <div class="section-title"> 
            <div class="prevBtn" @click="$emit('prev-section-button-action')" v-if="currentSectionIndex > 0">
                <font-awesome-icon :icon="['fas', 'angle-left']" />
            </div>
            <div class="title">{{ sections[currentSectionIndex].title  }} </div>
        </div>
        <div class="bar">
            <div class="bar-color" style="width: 8%" ></div>
            <div 
                v-for="(section, index) in sections" 
                class="number" 
                :class="{ fill: (index < currentSectionIndex ) ? true : false }"
                :key="index" >
            </div>
        </div> 
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "progress-indicator",
    props: ['sections', 'currentSectionIndex'],
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        nextSection() {
            if(this.currentIndex == this.index) {
                
            }
        },
        prevSection() {

        }
    }
});
</script>

<style scoped>
    .progress-indicator {
        height: 100%;
    }
    .section-title {
        font-size: 140%;
        padding: 1% 2%;
        font-weight: 700;
        height: 60%;
        display: flex;
        align-items: center;
    }
    .prevBtn {
        cursor: pointer;
    }
    .title {
        margin: 0 auto;
    }
    .bar {
        display: flex;
        align-items: center;
        justify-content: center;
        /* border: 1px solid rgb(238, 238, 238); */
        background: rgb(238, 238, 238);
        border-left: none;
        border-right: none;
        height: 1px;
        width: 100%;
        padding: 0 0 0 0;
        position: relative;
    }
    .bar-color {
        background: var(--burgundy-200);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .number {
        margin-right: 4%;
        background: white;
        border: 1px solid var(--burgundy-200);
        border-radius: 50%;
        width: 10px;
        height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }
    .number:last-child {
        margin-right: 0;
    }
    .fill {
        background: var(--burgundy-200);
    }
</style>






