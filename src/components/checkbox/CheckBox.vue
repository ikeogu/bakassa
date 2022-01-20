<template>
    <div class="checkbox_frame">
        <div 
            tabindex=0
            @click="$emit('select-check-box', index)"
            @keypress.enter="$emit('select-check-box', index)"
            :class="{
                checkbox_box: true,
                is_checked: (selected) ?true :false
            }"
        >
            <font-awesome-icon 
                :icon="['fas', 'check']" 
                class="check" 
                v-if="selected"
            />
        </div>
        <div class="checkbox_label">
            {{ label }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: '',
    props: ['label', 'value', 'selected', 'index'],
    data() {
        return { }
    }
});
</script>

<style scoped>
    *::selection {
        background: none;
    }
    .checkbox_frame {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .checkbox_box {
        border: 2px solid var(--paper-grey-300);
        height: 20px;
        width: 20px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .checkbox_box:hover {
        border-color: var(--paper-light-blue-500);
        box-shadow: var(--shadow-blue-100);
    }
    .checkbox_label {
        width: 90%;
        margin-left: 10px;
        font-weight: 500;
        color: var(--paper-grey-700);
    }

    .checkbox_box.is_checked {
        background: var(--blue-100);
        border-color: var(--blue-100);
        color: white;
    }
</style>