<template>
    <div 
        class="empty_list"
        :style="{
            'text-align': position
        }"
    >
        <div 
            :class="{
                icon: true,
                center: (position == 'center') ?true :false 
            }"
        >
            <img 
                src="../../assets/icons/emptyfolder.png" 
                v-if="image=='empty'"
            />
        </div>
        <div class="label">{{ text }}</div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'empty-list',
    props: ['text', 'image', 'position']
});
</script>

<style scoped>
    .empty_list {
        width: 100;
        padding: 4% 0%;
    }
    .icon{
        width: 70px;
        height: 70px;
    }
    .center {
        margin: 0 auto;
    }
    .label {
        font-size: 180%;
        font-weight: 700;
        color: var(--paper-grey-400);
    }
    .label::selection {
        background: none;
    }
</style>