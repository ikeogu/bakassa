<template>
    <div class="all-lessons">
        <div 
            v-for="(lesson, index) in lessons" 
            :key="lesson._id"
            class="package" 
            :class="{ selected: (index === selectedIndex) ? true : false }"
            @click="$emit('button-action', index)"
        >
            <div class="package-details">
                <div class="title">{{ lesson.title }}</div>
                <div class="lang">{{ lesson.language }}</div>
                <div class="duration">{{ convertDuration(lesson.durationInMilliSecs) }} Minutes </div>
            </div>
            <div class="price">{{ appendCurreny(lesson.price) }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import  appendCurreny  from "../../helper/currency.js";
import  duration  from "../../helper/duration.js";

export default defineComponent({
    name:"tutor-lessons-list",
    props: ['lessons', 'selectedIndex'],
    data() {
        return {
            appendCurreny
        }
    },
    methods: {
        convertDuration() {
            duration.convertMilliSecsToMins();
        }
    }
});
</script>

<style scoped>
    .all-lessons {
        padding: 5% 0;
    }
    .package{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 60%;
        height: 100px;
        margin: 0% auto 2%;
        border-radius: 5px;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: .5s;
    }
    .package:hover {
        box-shadow: 0px 0px 15px 3px rgb(241, 241, 241);
        transition: .5s;
        background: rgba(195, 243, 239, 0.521);
    }
    .package.selected {
        box-shadow: 0px 0px 15px 0px rgb(241, 241, 241);
        transition: .5s;
        background: rgba(195, 243, 239, 0.521);
    }
     .title{
        height: 15%;
        font-size: 150%;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        color: rgb(95, 95, 95);
        margin-bottom: 5%;
    }
    .lang{
        font-weight: 400;
        color: grey;
        font-size: 100%;
        text-transform: capitalize;
    }
    .duration{
        font-weight: 600;
        color: grey;
        font-size: 100%;
        margin-top: 10%;
    }
    .price{
        border-radius: 25px;
        background: rgba(195, 243, 239, 0.521);
        color: rgb(61, 189, 178);
        font-weight: 600;
        padding: 1% 3%;
    }

</style>