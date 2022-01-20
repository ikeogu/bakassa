<template>
    <div class="become_tutor">
        <Header />
        
        <div class="body">
            <router-view />
        </div>

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
    .body {
        width: 90%;
        margin: 5% auto;
    }
</style>