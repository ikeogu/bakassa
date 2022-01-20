<template>
    <div class="account-types-frame">
        <page-title :title="`select your account type`" :align="`center`"></page-title>
        <div class="account-types-list">
            <card></card>
            <card></card>
            <card></card>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import pageTitle from "./title/page-title.vue";
import card from "./card.vue"

export default defineComponent({
    name: "account-types",
    components: { pageTitle, card }
});
</script>

<style scoped>
    .account-types-frame {
        width: 90%;
        margin: 0% auto;
        padding: 5% 0 0;
    }
    .account-types-list {
        padding: 5% 0 0;
        display: flex;
        justify-content: space-between;
    }
</style>