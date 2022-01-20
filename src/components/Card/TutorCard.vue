<template>
    <div class="tutor">
        <div class="profile">
            <img :src="image" alt="">
            <div class="rating">
                <TutorRatingsIcon :rating="rating" :showDigit="false"/>
            </div>
            <div class="lessons">{{ lessons.length }} Lessons</div>
            <div class="book_btn_wrapper">
                <ButtonPlainText buttonText="Book Me" />
            </div>
        </div>
        <div class="details">
            <router-link :to="`/tutor/${tutorName}`"><div class="name"> {{ tutorName }} </div></router-link>
            <div class="career">{{ work }}</div>
            <div class="under"></div>

            <div class="field">
                <div class="label">LANGUAGES</div>
                <div class="lang-box">
                    <div class="lang"> {{ languages.join(', ') }} </div>
                </div>
            </div>

            <div class="double_field_equal">
                <div class="field">
                    <div class="label">GENDER</div>
                    <div class="lang-box">
                        <div class="lang"> {{ gender }} </div>
                    </div>
                </div>
                <div class="field">
                    <div class="label">RATE FROM</div>
                    <div class="price">
                        USD {{ (lessons[0].price).toFixed(2) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="engagement">
           <div class="nav">
                <div
                    :class="{
                        selected: (selectedIndex === 0) ?true :false
                    }"
                    @click="showIntroVid()"
                >
                    Introduction
                </div>
               <div
                    :class="{
                        selected: (selectedIndex === 1) ?true :false
                    }"
                    @click="showSchedule()"
                >
                    Schedule
                </div>
           </div>
           <div class="nav_view">
                <div class="video_wrapper" v-if="introvidVisible">
                    <TutorIntroVideo 
                        :videoLink="introVideo" 
                        :controls=true
                        :fullscreen=true
                    />
                </div>
               <div class="schedule_wrapper" v-if="scheduleVisible">
                   <TutorScheduleCalendar :events="events"/>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "../buttons/ButtonPlainText.vue";
import TutorIntroVideo from "../tutor/TutorIntrovideo.vue";
import TutorScheduleCalendar from '../tutor/TutorScheduleCalendar.vue';

export default defineComponent({
    name: 'tutor-card',
    components: { ButtonPlainText, TutorIntroVideo, TutorScheduleCalendar },
    props: [
        'image', 
        'rating',
        'lessons',
        'tutorName',
        'work',
        'languages',
        'gender',
        'introVideo',
        'events'
    ],
    data() {
        return {
            introvidVisible: true,
            scheduleVisible: false,
            selectedIndex: 0
        }
    },
    methods: {
        showIntroVid() {
            this.selectedIndex = 0;
            this.scheduleVisible = false;
            this.introvidVisible = true;
        },
        showSchedule() {
            this.selectedIndex = 1;
            this.introvidVisible = false;
            this.scheduleVisible = true;
        }
    }

});
</script>

<style scoped>
.tutor {
    box-shadow: 0px 0px 10px 1px lightgrey;
    border-radius: 10px;
    height: 200px;
    overflow: hidden;
    padding: 2% 0;
    display: flex;
    margin: 2% 0;
}
.tutor .profile {
    padding: 0%;
    text-align: center;
    width: 20%;
    height: 100%;
}
.profile img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
}
.profile .lessons {
    margin-top: 10px;
    font-weight: 600;
    color: var(--paper-grey-700);
}
.book_btn_wrapper {
    width: 50%;
    height: 40px;
    margin: 2% auto 0;
}
.book_btn_wrapper button {
    border: 1px solid var(--burgundy-100);
    background: var(--burgundy-100);
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

div.details {
    height: 100%;
    width: 40%;
    margin: auto 0 auto 1%;
    border-right: 1px solid lightgrey;
}
div.details div.name {
    font-weight: 700;
    font-size: 130%;
    text-transform: capitalize;
}
div.details div.name:hover {
    text-decoration: underline;
}
div.lang-box {
    display: flex;
    margin-top: 1%;
}
div.details div.lang {
    margin-right: 1%;
    text-transform: capitalize;
}
div.career {
    color: var(--paper-grey-600);
    text-transform: uppercase;
    font-size: 120%;
    font-weight: 400;
    margin-top: 2%;
}
div.under {
    margin-top: 1%;
    width: 6%;
    height: 2px;
    border-radius: 5px;
    background: crimson;
}
div.label {
    font-weight: 600;
    color: var(--paper-grey-500);
}
div.summary {
    color: var(--paper-grey-500);
    font-weight: 300;
    font-size: 110%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-lines: 3;
    margin-top: 1%;
}
div.engagement {
    margin: 0% auto;
    height: 100%;
    width: 30%;
}

.double_field_equal {
    display: flex;
}
.double_field_equal .field {
    width: 50%;
}
.field {
    margin-top: 4%;
}

div.nav {
    display: flex;
    justify-content: space-around;
    height: 10%;
}
div.nav > div {
    cursor: pointer;
    height: 100%;
}
div.nav .selected {
    border-bottom: 3px solid var(--burgundy-100);
    white-space: nowrap;
}
div.nav_view {
    margin-top: 2%;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav_view > div {
    height: 100%;
    width: 100%;
}
.video_wrapper {
    margin-top: 2px;
    border-radius: 5px;
    overflow: hidden;
}
.schedule_wrapper {
    overflow-y: auto;
    font-size: 80%;
}
.schedule_wrapper::-webkit-scrollbar {
    width: 10px;
    background: rgba(242, 241, 241, 0.281);
}
.schedule_wrapper::-webkit-scrollbar-thumb {
    background: var(--burgundy-100);
    border-radius: 25px;
}
.schedule_wrapper:deep .schedule_body {
    height: unset;
    overflow-y: none !important;
}

</style>