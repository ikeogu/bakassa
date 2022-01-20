<template>
    <section class="lessons_frame">
        <div class="head">
            <div class="section_title"> Lessons </div>
        </div>

        <div class="lessons_list">
           
            <VerticalList 
                class="tutor_lessons"
                v-if="
                        user.role === 'tutor' &&
                        tutor.lessons.length > 0 
                    "
                :lessons="tutor.lessons" 
            />
           
            <StudentLessonsList
                v-else-if="
                        user.role === 'student' &&
                        user.classes.length > 0
                    "
                :lessons="user.classes" 
            />
           
            <div class="no_lesson" v-else>
                <div>
                    <div class="icon">
                        <img src="@/assets/icons/empty.png" />
                    </div>
                    <div class="label">You have not added any lesson</div>
                </div>
            </div>

            <div class="create_new_wrapper" v-if="user.role === 'tutor'">
                <ButtonIcon 
                    buttonIcon="plus" 
                    @buttonAction="createNewLesson()"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import VerticalList from "../../lists/VerticalList.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import StudentLessonsList from "@/components/student/StudentLessonsList.vue";

export default defineComponent({
    name:"lessons",
    components: { VerticalList, ButtonIcon, StudentLessonsList },
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