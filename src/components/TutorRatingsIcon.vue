<template>
    <div class="tutor_rating_icon">
        <font-awesome-icon :icon="['fas', 'star']" v-for="index in rating" :key="index"/>
        <div class="number" v-if="showDigit">{{ rating }}</div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "tutor-ratings-icon",
    props: ['rating', 'showDigit'],
    data() {
        return { }
    },
    methods: {

    }
});
</script>

<style scoped>
    .tutor_rating_icon {
        color: var(--rating-icons);
    }
</style>