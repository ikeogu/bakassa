<template>
    <section class="grid-list">
        <div class="list" v-for="(listItem, index) in listItems" :key="index">
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "grid-list",
    props: ["listItems", "listType"]
});
</script>

<style scoped>
section.grid-list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    column-gap: 10px;
    row-gap: 10px;
}
div.list {
    border: 1px solid;
    height: 300px;
    background: black;
}
</style>