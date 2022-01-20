<template>
    <div class="tutor">
        <Header />
        <section class="body" v-if="!isLoading">
            <div class="details">
                <div class="intro-vid">
                    <TutorIntroVideo 
                        :videoLink="tutor.introVideo"
                        :controls=true
                        :fullscreen=true
                    />
                </div>
                <div class="tutor-profile">
                    <div class="left">
                        <img :src="tutor.profilePicture">
                        <div class="buttons">
                            <button @click="openContactModal">
                                <font-awesome-icon :icon="['fas', 'comments']" />
                                <div class="text">Chat Me</div>
                            </button>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">TUTOR</div>
                        <div class="tutor-name">{{ tutor.tutorName }}</div>
                        <div class="languages">
                            <div class="lang"> {{ tutor.languages.join(', ') }} </div>
                        </div>
                        <div class="ratings">
                            <TutorRatingsIcon :rating="tutor.ratings" :showDigit="false"/>
                        </div>
                        <div class="metrics">
                            <div>
                                <div class="title">Total Students</div>
                                <div class="number"> {{ tutor.students.length }} </div>
                            </div>
                            <div>
                                <div class="title">Ratings</div>
                                <div class="number">{{ tutor.ratings }}</div>
                            </div>
                            <div>
                                <div class="title">Reviews</div>
                                <div class="number">{{ tutor.reviews.length }}</div>
                            </div>
                        </div>
                        <div class="bio">
                            <div class="section-title">About Me</div>
                            <div class="content">
                                {{ tutor.aboutMe.substr(0, 1).toUpperCase() + tutor.aboutMe.substr(1, tutor.aboutMe.length) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action">
                <div class="package-box">
                    <div class="section-title">Lessons</div>
                    <div class="all-packages">
                        <VerticalList 
                            :lessons="tutor.lessons"
                        />
                        <!-- <div class="package">
                            <div class="package-details">
                                <div class="duration">50 mins</div>
                                <div class="lang">English Class</div>
                            </div>
                            <div class="price">{{ appendCurreny(150) }}</div>
                        </div>
                        <div class="package">
                            <div class="package-details">
                                <div class="duration">45 mins</div>
                                <div class="lang">Spanish Class</div>
                            </div>
                            <div class="price">{{ appendCurreny(250) }}</div>
                        </div> -->
                    </div>
                </div>
                <div class="calendar">
                    <div class="section-title">Schedule For The Day</div>
                    <TutorScheduleCalendar 
                        :events="tutor.events" 
                        @buttonAction="openBookingModal" 
                    />
                </div>
            </div> 
            <div class="modals" v-if="showModals">

                <TutorBookingModal 
                    v-if="showBookingModal" 
                    :tutorEvents="tutor.events" 
                    :tutorname="tutor.tutorName"
                    :lessons="tutor.lessons"
                    @setNewTutorEventAction="setNewEvent" 
                    @buttonAction="closeBookingModal" 
                />
                
                <TutorContactModal 
                    v-if="showContactModal" 
                    :tutorimage="tutor.profilePicture"
                    :tutorname="tutor.tutorName"
                    :tutoruserId="tutor.userId"
                    @buttonAction="closeContactModal" 
                />
                
                <BackDrop @buttonAction="closeModal"/>

            </div>
        </section>
        <SiteFooter />
    </div>
</template>

<script>
    import Header from '../components/Header/Header.vue';
    import BackDrop from "../components/BackDrop.vue";
    import TutorContactModal from "../components/tutor/TutorContactModal.vue";
    import TutorBookingModal from "../components/tutor/TutorBookingModal.vue";
    import TutorIntroVideo from "../components/tutor/TutorIntrovideo.vue";
    import TutorRatingsIcon from "../components/TutorRatingsIcon.vue";
    import TutorScheduleCalendar from '../components/tutor/TutorScheduleCalendar.vue';
    import SiteFooter from '../components/SiteFooter.vue';
    import net from '../services/http';
    import appendCurreny  from "../helper/currency.js";
    import VerticalList from '../components/lists/VerticalList.vue';

    export default {
        name: 'Tutor',
        components: {
            Header,
            TutorIntroVideo,
            TutorRatingsIcon,
            TutorScheduleCalendar,
            TutorContactModal,
            TutorBookingModal,
            BackDrop,
            SiteFooter,
            VerticalList
        },  
        data() {
            return {
                appendCurreny,
                isLoading: true,
                tutor: { },
                showModals: false,
                showContactModal: false,
                showBookingModal: false,
            }
        },
        methods: {
            checkSessionStatus() {
                if(this.$store.getters.token == '') {
                    this.$router.push('/login');
                }
            },
            openContactModal() {
                this.checkSessionStatus();
                this.showModals = true;
                this.showContactModal = true;
            },
            closeContactModal() {
                this.showModals = false;
                this.showContactModal = false;
            },
            openBookingModal(date) {
                this.checkSessionStatus();
                this.showModals = true;
                this.showBookingModal = true;
            },
            closeBookingModal() {
                this.showModals = false;
                this.showBookingModal = false;
            },
            closeModal() {
                this.showModals = false;
                this.showBookingModal = false;
                this.showContactModal = false;
            },
            async fetchTutorData() {
                await this.$store.dispatch('fetchtutor', this.$route.params.name)
                .then((tutor)=> {
                    this.tutor = tutor;
                    this.isLoading = false;
                })
                .catch((error)=> { console.log(error.response) });
            },
            async setNewEvent(eventInfo) {
                this.checkSessionStatus();
                console.log(eventInfo);
                try {
                    const response = await net.httpSec.post(
                        '/tutors/'+ this.$route.params.name +'/newevent', 
                        {newevent: eventInfo}
                    );
                    this.tutor = response.data.data;
                    console.log(this.tutor);

                } catch (error) {
                    console.log(error.response);
                }
            }
        },
        beforeMount() {
            this.fetchTutorData();
        }
    }
</script>

<style scoped>
    section.body {
        width: 90%;
        margin: 2% auto;
        display: flex;
        justify-content: space-between; 
    }
    div.details {
        width: 60%;
    }
    div.action {
        width: 30%;
    }
    div.intro-vid {
        border-radius: 0px 0px 15px 15px;
        overflow: hidden;
        height: 400px;
        width: 100%;
    }
    div.tutor-profile {
        z-index: 10;
        position: relative;
        margin: 0% 0% 0%;
        display: flex;
        padding: 1% 0% 0%;
    }
    div.left {
        width: 16%;
        /* text-align: center; */
    }
    div.left img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        object-position: top;
        margin: 0% auto 0%;
        display: block;
    }
    div.left div.buttons {
        margin: 4% 0% 0%;
    }
    div.left button {
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        font-size: 100%;
        background: none;
        font-weight: 700;
        margin: 10px 0% 2%;
        background: var(--burgundy-100);
        color: white;
        border-radius: 5px;
    }
    div.left button > svg {
        width: 30%;
    }
    div.left button > div.text {
        width: 60%;
        text-align: start;
    }
    div.left button:hover {
        background: black;
        cursor: pointer;
    }
    div.left button:hover > * {
        color: white;
    }
    div.right {
        padding: 2% 0% 0% 4%;
        margin-left: 0%;
        width: 80%;
        font-size: 110%;
    }
    div.right div.title {
        font-weight: 700;
        font-size: 100%;
        color: grey;
    }
    div.right div.tutor-name {
        font-size: 240%;
        font-weight: 700;
        text-transform: capitalize;
    }
    div.right div.languages {
        text-transform: capitalize;
    }
    div.right div.languages > div{
        margin-right: 1%;
        font-weight: 700;
    }
    div.ratings {
        padding: 2% 0%;
        display: flex;
    }
    div.ratings div.number {
        margin-left: 5%;
        font-weight: 700;
    }
    div.metrics {
        margin: 3% 0%;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    div.metrics > div > div.title{
        font-weight: 600;
        font-size: 100%;
    }
    div.metrics > div > div.number{
        font-weight: 700;
        font-size: 150%;
        margin-top: 4%;
    }
    div.bio div.content{
        padding: 0 2%;
        font-size: 110%;
        font-weight: 300;
        color: rgb(63, 63, 63);
    }
    div.schedule {
        margin: 0 auto;
    }
    div.section-title {
        font-weight: 600;
        font-size: 110%;
        padding: 3% 0%;
    }

    div.action {
        
    }
    div.action div.section-title {
        font-size: 140%;
        font-weight: 700;
        padding: 4%;
    }
    div.package-box {
        margin-top: 5%;
        border-radius: 5px;
    }
    div.all-packages {
        font-size: 90%;
    }
    div.package {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4%;
        border-top: 1px solid lightgrey;
    }
    div.package div.duration {
        font-weight: 500;
        font-size: 90%;
    }
    div.package div.lang {
        font-size: 80%;
        margin-top: 5%;
        font-weight: 400;
    }
    div.price {
        font-size: 150%;
        font-weight: 600;
    }
    div.calendar {
        border: 1px solid lightgrey;
        border-radius: 4px;
        margin-top: 5%;
    }
    
    
    div.modals {
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        position: absolute;
    } 


</style>


