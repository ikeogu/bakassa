<template>
  <div id="backDrop" @click="$emit('button-action')">
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:"back-drop",
});
</script>

<style scoped>
    div#backDrop {
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.452);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>