<template>
    <section class="students">
        <div class="head">
            <div class="section_title"> Students  </div>
        </div>
        <div
            class="lessons_list grid_list"
            v-if="students.length > 0"
        >
            <UserCard
                v-for="(student, index) in students"
                :key="index"
                :name="student.fullname"
            />
        </div>
        <div class="no_lesson" v-else>
            <div>
                <div class="icon">
                    <img src="" />
                </div>
                <div class="label">No subcribed students yet</div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import UserCard from "@/components/Card/UserCard.vue";

export default defineComponent({
    name:"students",
    components: { UserCard },
    data() {
        console.log(this.$store.getters.tutorData);
        return {
            students: []
        }
    },
    methods: {
        fetchStudentDetails() {
            this.$store.getters.tutorData.students.forEach(async student => {

                await this.$store.dispatch('fetchuser', student)
                .then((studentDetails)=> this.students.push(studentDetails))
                .catch((error)=> console.log(error.response));

            });
        }
    },
    beforeMount() {
        this.fetchStudentDetails();
    }
});
</script>

<style scoped>
    .lessons {
        padding: 1%;
        position: relative;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }

    .lessons_list {
        margin-top: 5%;
    }
    .grid_list {
        --gap: 10px;
        display: grid;
        grid-template-columns: calc(calc(100% - var(--gap))/3) calc(calc(100% - var(--gap))/3) calc((100% - var(--gap))/3);
    }

    .create_new_wrapper {
        margin-left: auto;
        width: 15%;
        position: fixed;
        bottom: 10%;
        right: 10%;
    }
    .create_new_wrapper button {
        border: none ;
        border-radius: 5px;
        background: var(--paper-light-blue-100);
        color: var(--paper-light-blue-800);
    }
    .no_lesson {
        height: 100%;
        margin-top: 15%;
        text-align: center;
    }
    .no_lesson  .icon{
        width: 40px;
        height: 40px;
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
