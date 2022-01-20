<template>
    <div class="become_tutor">
        <Header />
        
        <router-view />

        <SiteFooter />
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