<template>
    <div class="class_card">
        <div class="image_wrapper">
            <img src="@/assets/class2.jpg" >
            <div class="overlay">
                <font-awesome-icon :icon="['fas', 'clock']" />
            </div>
        </div>
        <div class="lesson_card_details">
            <div class="tutor">
                <div class="image">
                    <img :src="tutorImage" v-if="tutorImage" >
                    <img src="@/assets/userimage.png" v-else>
                </div>
                <div class="name" v-if="tutorName != ''"> {{ tutorName }}  </div>
                <div class="name" v-else> {{ studentName }} </div>
            </div>
            <div class="title"> {{ title }} </div>
            <div class="bottom">
                <div class="lang">
                    {{ language }}
                </div>
                <div class="attend_btn_wrapper" v-if="liveClass">
                    <ButtonPlainText 
                        buttonText="Attend"
                        @buttonAction="gotoClass()"
                    />
                </div>
                <div class="date_time">
                    {{ calctimeRemaining(datetime) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import  appendCurreny  from "../../helper/currency.js";
import duration  from "../../helper/duration.js";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";

export default defineComponent({
    name: 'class-card',
    components: { ButtonPlainText },
    props: ['title', 'tutorImage', 'tutorId', 'tutorName', 'studentId', 'datetime', 'status', 'language', 'duration'],
    data() {
        return {
            appendCurreny,
            studentName: '',
            liveClass: false
        }
    },
    methods: {
        calctimeRemaining(datetime) {

            const result = duration.timeRemaning(datetime, this.duration);

            if(result.toLowerCase() == 'in session') this.liveClass = true;
            return 'Class in ' + result
        },
        gotoClass() {
            
            var studentID, tutorID, 
            classData = {
                id: '', 
                title: ''
            };
            
            if(this.$store.getters.userData.role == 'student') {
                studentID = this.$store.getters.userData._id;
                tutorID = this.tutorId;

            } else {
                studentID = this.studentId;
                tutorID = this.$store.getters.tutorData._id;
            }

            classData.id = studentID + '-' + tutorID;
            classData.title = this.title;

            this.$store.dispatch('setupclass', classData)
            .then(()=> this.$router.push('/live-class'))
        }
    },
    beforeMount() {
        if(this.studentId) {

            this.$store.dispatch('fetchuser', this.studentId)
            .then((studentDetails)=> this.studentName = studentDetails.fullname )
            .catch((error)=> console.log(error.response) );
        
        }
    }
});
</script>

<style scoped>
    .class_card{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 100%;
        margin: 0% 0% 2% 0%;
        height: 360px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .image_wrapper {
        height: 180px;
        position: relative;
    }
    .image_wrapper img {
        object-fit: cover;
    }
    .overlay {
        background: rgba(0, 0, 0, 0.309);
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: var(--paper-grey-100);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 400%;
    }
    .tutor  {
        display: flex;
        align-items: center;
    }
    .tutor .image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
    }
    .name {
        text-transform: capitalize;
        margin-left: 1%;
        font-weight: 700;
    }

    .lesson_card_details {
        height: calc(180px - 4%);
        padding: 2%;
    }
    .title {
        text-transform: capitalize;
        height: 52%;
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
        margin-right: auto;
    }
    .bottom {
        height: 30px;
        display: flex;
        align-items: center;
    }
    .attend_btn_wrapper {
        margin-right: 5px;
        height: 100%;
        width: 30%;
    }
    .attend_btn_wrapper button {
        font-size: 90%;
        font-weight: 500;
        border: 2px solid var(--burgundy-400);
        color: white;
        background: var(--burgundy-400);
        border-radius: 5px;
    }

   
    .date_time {
        font-weight: 500;
        color: var(--paper-grey-700); 
    }

 
</style>