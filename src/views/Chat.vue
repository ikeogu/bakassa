<template>
    <div class="chat_page">
        <Header />
        <div class="chat_page_body">
            <div class="chat_frame">
                <div></div>
            </div>
        </div>
        <SiteFooter />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "@/components/Header/Header.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default defineComponent({
    components: { Header, SiteFooter },
    data() {
        return {

        }
    },
    methods: {

    }
})
</script>

<style scoped>
.chat_page_body {
    padding: 5% 0;
}
</style>