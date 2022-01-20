<template>
    <section class="students">
        <div class="head">
            <div class="section_title"> Tutors </div>
        </div>
        <div 
            class="lessons_list grid_list" 
            v-if="tutors.length > 0"
        >
            <UserCard
                v-for="(tutor, index) in students"
                :key="index"
                :name="tutor.fullname"
            />
        </div>
        <div class="no_lesson" v-else>
            <div>
                <!-- <div class="icon">
                    <img src="" />
                </div> -->
                <div class="label">You are not subcribed to any tutor</div>
                <div class="explore_tutors_btn_wrapper">
                    <ButtonPlainText 
                        buttonText="Explore Tutors"
                        @buttonAction="gotoexploretutors()"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import UserCard from "@/components/Card/UserCard.vue";
import ButtonPlainText from "../buttons/ButtonPlainText.vue";

export default defineComponent({
    name:"students",
    components: { UserCard, ButtonPlainText },
    data() {
        console.log(this.$store.getters.userData);
        return {
            tutors: []
        }
    },
    methods: {
        fetchStudentDetails() {            
            this.$store.getters.userData.tutors.forEach(async tutor => {
                await this.$store.dispatch('fetchtutor', tutor)
                .then((tutorDetails)=> this.tutors.push(tutorDetails))
                .catch((error)=> console.log(error.response));
            });
        },
        gotoexploretutors() {
            this.$router.push('/tutors/explore');
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

    .explore_tutors_btn_wrapper {
        width: 20%;
        height: 50px;
        margin: 2% auto 0;
    }
    .explore_tutors_btn_wrapper button {
        border: none ;
        border-radius: 5px;
        background: var(--burgundy-100);
        color: white;
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
        font-size: 200%;
        font-weight: 600;
        color: var(--paper-grey-400);
    }
    .no_lesson .label::selection {
        background: none;
    }

</style>