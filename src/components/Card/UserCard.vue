<template>
    <div class="user_card">
        <div class="image_wrapper">
            <img src="@/assets/userimage.png" >
        </div>
        <div class="lesson_card_details">
            <div class="title">{{ name }}</div>
            <div class="bottom">
                <font-awesome-icon :icon="['']" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonIconText from "@/components/buttons/ButtonIconText.vue";

export default defineComponent({
    name: 'user-card',
    components: { ButtonIconText },
    props: ['name', 'datetime', 'status', 'language'],
    data() {
        return {
            
        }
    },
    methods: {
       
    }
});
</script>

<style scoped>
    .user_card{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 100%;
        margin: 0% 0% 2% 0%;
        height: 120px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .image_wrapper {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        overflow: hidden;
    }
    .lesson_card_details {
        padding: 2%;
    }
    .tutor  {
        display: flex;
        align-items: center;
    }
    .tutor .image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }
    .name {
        text-transform: capitalize;
        margin-left: 1%;
        font-weight: 700;
    }
    .title {
        text-transform: capitalize;
        height: 28%;
        margin: 4% 0;
        color: var(--paper-grey-700); 
        font-weight: 500;
        font-size: 150%;
        overflow: hidden;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .lang {
        text-transform: capitalize;
        border-radius: 5px;
        padding: 5px 10px;
        width: min-content;
        background: var(--burgundy-faded);
        color: var(--burgundy-400);
        font-weight: 500;
        font-size: 90%;
    }
    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .date_time {
        font-weight: 600;
        text-transform: capitalize;
        color: var(--paper-grey-700); 
    }
</style>