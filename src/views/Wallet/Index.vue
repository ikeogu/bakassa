<template>
    <div class="become_tutor">
        <router-view />
    </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "@/components/Header/Header.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default defineComponent({
    components: { Header, SiteFooter }
})
</script>
<style scoped>
    
</style>