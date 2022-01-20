<template>
    <div class="question_card">
        <router-link :to="'question' + '/' + id">
            <div class="question_title">
                {{ capitalize(title) }}
            </div>
        </router-link>
        <div class="user_details">
            <div class="user_image">
                <img src="@/assets/userimage.png">
            </div>
            <div class="dets">
                <div class="user_name">
                    {{ userData.fullname }}
                </div>
                <div class="date">
                    {{ calcTimeLapse() }}
                </div>
            </div>
            <div 
                class="language"
                v-for="language in languages"
                :key="language"
            >
                {{ language }}
            </div>
        </div>
        <div class="desc">
            {{ description }}
        </div>

        <div class="others">
            <div class="likes">
                <div class="number">
                    {{ likes.length }}
                </div>
                <div class="label">Likes</div>
            </div>
            <div class="comments">
                <div class="number">
                    {{ comments.length }}
                </div>
                <div class="label">Comments</div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import duration from "@/helper/duration.js";

export default defineComponent({
    name: 'question-card',
    props: ['id', 'title', 'user', 'date', 'description', 'languages', 'comments', 'likes'],
    data() {
        return {
            userData: ''
        }
    },
    methods: {
        capitalize(text) {
            return text[0].toUpperCase() + text.substr(1, text.length)
        },
        calcTimeLapse() {
            return duration.timeLapse(this.date);
        }
    },
    mounted() {
        this.$store.dispatch('fetchuser', this.user)
        .then((userdata)=> this.userData = userdata )
        .catch((error)=> console.log(error));
    }
});
</script>

<style scoped>
    .question_card {
        box-shadow: var(--shadow-100);
        border-radius: 10px;
        padding: 3%;
        transition: 0.5s;
    }
    .question_card:hover {
        box-shadow: var(--shadow-100-deeper);
    }

    .question_title {
        height: 15%;
        font-size: 150%;
        font-weight: 600;
        color: var(--paper-grey-800);
        display: flex;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .user_details {
        height: 50px;
        display: flex;
        align-items: center;
    }
    
    .user_image {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .dets {
        margin-left: 2%; 
    }
    .user_name {
        font-weight: 500;
        font-size: 90%;
        text-transform: capitalize;
    }
    .date {
        font-size: 80%;
        color: var(--paper-grey-600);
    }

    .language {
        font-size: 90%;
        margin-left: auto;
        text-transform: capitalize;
        padding: 5px 20px;
        background: var(--burgundy-faded);
        color: var(--burgundy-100);
        border-radius: 5px;
        font-weight: 600;
    }

    .desc {
        margin-top: 5px;
        color: var(--paper-grey-700);
        font-size: 100%;
        overflow: hidden;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .others {
        display: flex;
        align-items: center;
        height: 30%;
        margin-top: 2%;
    }
    .others > div {
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 4px;
        padding-left: 0;
        margin-right: 1%;
        font-weight: 400;
        color: var(--paper-grey-700);
    }
    .number {
        padding: 0 5px;
    }
</style>



