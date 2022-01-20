<template>
    <div class="lesson_card">
        <div class="lesson_card_details">
            <div class="title">{{ title }}</div>
            <div class="lang">{{ language }}</div>
            <div class="duration">{{ convertTime(duration) }} Minutes </div>
        </div>
        <div class="price">{{ appendCurreny(price) }}</div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import  appendCurreny  from "../../helper/currency.js";
import  duration  from "../../helper/duration.js";

export default defineComponent({
    name: 'lesson-card',
    props: ['title', 'price', 'duration', 'language'],
    data() {
        return {
            appendCurreny
        }
    },
    methods: {
        convertTime(time) {
            return duration.convertMilliSecsToMins(time);
        }
    },
});
</script>

<style scoped>
    .lesson_card{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 96%;
        height: 100px;
        margin: 0% 0% 2% 0%;
        border-radius: 5px;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    .lesson_card_details {
        height: 100%;
    }
     .title{
        font-size: 150%;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        color: rgb(95, 95, 95);
    }
    .lang{
        font-weight: 400;
        color: grey;
        font-size: 110%;
        text-transform: capitalize;
    }
    .duration{
        font-weight: 600;
        color: grey;
        font-size: 100%;
        margin-top: 30px;
    }
    .price{
        border-radius: 25px;
        background: rgba(195, 243, 239, 0.521);
        color: rgb(61, 189, 178);
        font-weight: 600;
        padding: 1% 3%;
    }
</style>