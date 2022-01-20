<template>
    <div class="student_lesson_list grid_list">
        <ClassCard 
            v-for="(lesson, index) in allLessons"
            :key="index"
            :title="lesson.lessonTitle"
            :tutorId="lesson.tutorId"
            :tutorImage="lesson.tutorImage"
            :tutorName="lesson.tutorName"
            :datetime="lesson.datetime"
            :status="lesson.status"
            :language="lesson.language"
            :duration="lesson.duration"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ClassCard from "@/components/Card/ClassCard.vue";

export default defineComponent({
    name: 'student-lesson-list',
    components: { ClassCard },
    props: ['lessons'],
    data() {
        console.log(this.lessons);

        var tutor, allLessons = [];

        return {
            tutor,
            allLessons
        }
    },
    methods: {
        fetchLessonDetails(lesson) {

            this.$store.dispatch('fetchtutor', lesson.tutor)
            .then(async (tutor)=> {
                
                console.log(tutor.lessons);
                console.log(lesson.lessonId);
                
                const mainLesson = await tutor.lessons.filter(element => element._id == lesson.lessonId);

                console.log(mainLesson);

                this.allLessons.push({
                    tutorId: tutor._id,
                    tutorImage: tutor.profilePicture,
                    tutorName: tutor.tutorName,
                    lessonTitle: mainLesson[0].title,
                    language: mainLesson[0].language,
                    duration: mainLesson[0].durationInMilliSecs,
                    datetime: lesson.datetime,
                    status: lesson.status
                });

                console.log(this.allLessons);
            })
            .catch((error)=> {
                console.log(error);
                console.log(error.response);
            });

        }
    },
    mounted() {
        this.lessons.forEach(lesson => {
            this.fetchLessonDetails(lesson);
        });
    }
});
</script>

<style scoped>
.student_lesson_list {
    --gap: 10px;
}
.grid_list {
    display: grid;
    grid-template-columns: calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4) calc(calc(100% - var(--gap)) / 4);
    gap: 10px;
}
</style>