<template>
    <div class="lessons_list">
        
        <div
            class="grid_list"
            v-if="
                    user.role === 'tutor' &&
                    tutor.events.length > 0
                "
        >
            <ClassCard
                v-for="(event, index) in tutor.events"
                :key="index"
                :studentId="event.studentId"
                :title="event.lesson.title"
                :datetime="event.datetime"
                :language="event.lesson.language"
                :duration="event.lesson.durationInMilliSecs"
            />
        </div>
        
        <div class="no_lesson" v-else>
            <div>
                <div class="icon">
                    <img src="@/assets/icons/empty.png" />
                </div>
            <div class="label">No class has been booked yet</div>
        </div>

   
        </div>
    
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ClassCard from "@/components/Card/ClassCard.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import StudentLessonsList from "@/components/student/StudentLessonsList.vue";

export default defineComponent({
    name:"lessons",
    components: { ClassCard, ButtonIcon, StudentLessonsList },
    data()  {
        var user, tutor;

        return {
            user,
            tutor
        }
    },
    methods: {
        createNewLesson() {
            this.$router.push('lessons/create');
        }
    },
    beforeMount() {
        this.user = this.$store.getters.userData;

        if(this.user.role == 'tutor') {
            this.tutor = this.$store.getters.tutorData
        }
    }
});
</script>

<style scoped>
    .lessons_frame {
        padding: 1%;
        position: relative;
        height: 100%;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }

    .tutor_lessons {
        width: 60%;
    }
    .grid_list {
        display: grid;
        --gap: 10px;
        grid-template-columns: calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4);
        margin-top: 5%;
    }

    .sub_nav {
        display: flex;
        width: 100%;
        margin-top: 3%;
    }
    .sub_menu_item {
        height: 50px;
    }
    .sub_menu_item:hover {
        background: var(--paper-grey-100);
    }
    .sub_menu_item .icon {
        width: 25px;
        height: 25px;
    }
    .sub_menu_item .icon img {
        filter: grayscale(100%);
    }
    .sub_menu_item .label {
        text-transform: capitalize;
        font-weight: 600;
        color: var(--paper-grey-700);
    }
    .menu_item_link {
        border-bottom: 2px solid black;
        display: flex;
        align-items: center;
        height: 100%;
        width: max-content;
        padding-left: 5px;
        padding-right: 10px;
    }
    .menu_item_link.router-link-active {
        background: var(--paper-grey-100);
    }

    .create_new_wrapper {
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 20%;
        right: 5%;
    }
    .create_new_wrapper button {
        border-radius: 50%;
        border: none;
        background: var(--paper-light-blue-100);
        box-shadow: var(--shadow-100);
        color: var(--paper-light-blue-800);
        font-size: 200%;
    }
    .no_lesson {
        height: 100%;
        margin-top: 15%;
        text-align: center;
    }
    .no_lesson  .icon{
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
    .no_lesson .label {
        font-size: 140%;
        font-weight: 700;
        color: var(--paper-grey-400);
    }
    .no_lesson .label::selection {
        background: none;
    }

</style>