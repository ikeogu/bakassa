<template>
    <section class="vertical_list_frame">
        <LessonCard 
            v-for="lesson in lessons"
            :key="lesson._id"
            :title="lesson.title"
            :language="lesson.language"
            :duration="lesson.durationInMilliSecs"
            :price="lesson.price"
        />
        <TutorCard 
            v-for="(tutor, index) in tutors"
            :key="tutor._id"
            :index="index"
            :image="tutor.profilePicture"
            :rating="0"
            :lessons="tutor.lessons"
            :tutorName="tutor.tutorName"
            :work="tutor.work.position"
            :languages="tutor.languages"
            :gender="tutor.gender"
            :introVideo="tutor.introVideo"
            :events="tutor.events"
        />
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import IntroVideo from "../tutor/TutorIntrovideo.vue";
import TutorRatingsIcon from "../TutorRatingsIcon.vue";
import LessonCard from "../Card/LessonCard.vue";
import TutorCard from "../Card/TutorCard.vue";

export default defineComponent({
    components: { IntroVideo, TutorRatingsIcon, LessonCard, TutorCard },
    name: "vertical-list",
    props: ["lessons", "tutors"],
    data() {
      

        return { 
      
        }
    },
    methods: {
       
    }

});
</script>

<style scoped>
.vertical_list_frame {
    padding: 5% 0;
}
</style>