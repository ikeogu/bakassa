<template>
    <div id="newEventsModal">

        <div class="modal_head">
            <ProgressIndicator 
                :sections="bookingSections" 
                :currentSectionIndex="currentSection" 
                @prevSectionButtonAction="goToPrevSection"
            />
        </div>

        <div class="modal_content">
            <TutorLessonsList 
                v-if="currentSection == 0"
                :lessons="lessons" 
                :selectedIndex="selectedIndex" 
                @buttonAction="selectLesson" 
            />

            <TutorFullScheduleCalendar 
                v-if="currentSection == 1" 
                :events="tutorEvents"
                :tutorname="tutorname"
                @buttonAction="createEvent"
            />
        </div>

        <div class="modal_floor" v-if="showBtn">
            <button class="next_btn" @click="goToNextSection">Next</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ProgressIndicator from "../ProgressIndicator.vue";
import TutorLessonsList from "../lists/TutorLessonsList.vue";
import TutorFullScheduleCalendar from "./TutorFullScheduleCalendar.vue";
import TutorCommunicationTools from "./TutorCommunicationTools.vue";

export default defineComponent({
    name:"tutor-booking-modal",
    components: { ProgressIndicator, TutorLessonsList, TutorFullScheduleCalendar, TutorCommunicationTools },
    props: ['tutorEvents', 'tutorname', 'lessons'],
    data() {
        var commtools = [
            {   
                image: 'https://res.cloudinary.com/labilawal/image/upload/v1635031631/5e8ce423664eae0004085465_sjppb7.png',
                name: 'zoom'
            },
            {   
                image: 'https://res.cloudinary.com/labilawal/image/upload/v1635031805/skype-logo-vector-icon-template-clipart-download-0_od2bti.png',
                name: 'skype'
            },
            {   
                image: 'https://res.cloudinary.com/labilawal/image/upload/v1635031669/Google-Meet-Logo_vjaqyx.png',
                name: 'meet'
            },
        ]; 

        var allEvents = [], newEvent = null;

        var selectedIndex = null, 
            selectedLesson = null, 
            selectedToolIndex = null,
            selectedTool = null;
    
        return {
            bookingSections: [
                {
                    title: "Select A Lesson",
                    status: 'uncompleted'
                },
                {
                    title: "Schedule Your Lesson",
                    status: 'uncompleted'
                }
            ],
            selectedIndex,
            selectedLesson,
            currentSection: 0,
            allEvents,
            newEvent,
            selectedToolIndex,
            selectedTool,
            commtools,
            showBtn: false
        }
    },
    methods: {
        showNextBtn() {
            this.showBtn = true;
        },
        hideNextBtn() {
            this.showBtn = false;
        },
        selectLesson(index) {
            this.selectedIndex = index;
            this.selectedLesson = this.lessons[this.selectedIndex];
            this.showNextBtn();
        },
        selectTool(index) {
            this.selectedToolIndex = index;
            this.selectedTool = this.commtools[this.selectedToolIndex];
            this.newEvent.communication_tool = this.selectedTool;
            
            this.showNextBtn();
        },
        createEvent(datetime) {
            console.log(datetime);

            var date = datetime.split(' - ')[0];
            var time = datetime.split(' - ')[1];
            
            var day = date.split('/')[0],
            month = date.split('/')[1]-1,
            year = date.split('/')[2],
            hour = time.split(':')[0],
            min = time.split(':')[1];

            this.newEvent = {
                tutorname: this.tutorname,
                type: "Lesson",
                datetime: new Date(year, month, day, hour, min),
                studentId: this.$store.getters.userData._id || '',
                lesson: this.selectedLesson,
                paymentId: '',
            };

            this.goToNextSection();
        },
        setEvent() {
            this.$emit('set-new-tutor-event-action', this.newEvent);
        },
        goToNextSection() {
            if(this.currentSection < this.bookingSections.length-1) this.currentSection++
            else {
                this.$store.dispatch('storenewevent', this.newEvent);
                this.$router.push({path: '/booking-payment'});
            }
            this.hideNextBtn();
        },
        goToPrevSection() {
            if(this.currentSection > 0) this.currentSection--
        }
    }
});
</script>

<style scoped>
    div.modal_head {
        height: 10%;
    }
    div.modal_content {
        height: 80%;
        overflow-y: auto;
    }
    div#newEventsModal {
        width: 70%;
        height: 90vh;
        position: fixed;
        top: 5%;
        left: 15%;
        background: white;
        z-index: 10000;
        border-radius: 5px;
    }
    
   
    .modal_floor {
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .next_btn {
        border: 1px solid var(--burgundy-200);
        margin-right: 2%;
        height: 60%;
        width: 100px;
        border-radius: 5px;
        font-size: 100%;
        background: var(--burgundy-200);
        color: white;
        cursor: pointer;
    }
    
</style>