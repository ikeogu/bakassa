<template>
    <div class="calendar-component">
        <div 
            v-for="(date, dateIndex) in dates"
            :key="dateIndex"
            class="day event_cell"
        >
            <div class="month-name">
                <div class="title">Today</div>
                <div>
                    {{ date.string }}
                </div>
            </div>
            
            <div 
                class="schedule_body" 
                @click="$emit('button-action')"
            >
                <div class="time">
                    <div>
                        <div>00:00</div>
                    </div>
                    <div>01:00</div>
                    <div>02:00</div>
                    <div>03:00</div>
                    <div>04:00</div>
                    <div>05:00</div>
                    <div>06:00</div>
                    <div>07:00</div>
                    <div>08:00</div>
                    <div>09:00</div>
                    <div>10:00</div>
                    <div>11:00</div>
                    <div>12:00</div>
                    <div>13:00</div>
                    <div>14:00</div>
                    <div>15:00</div>
                    <div>16:00</div>
                    <div>17:00</div>
                    <div>18:00</div>
                    <div>19:00</div>
                    <div>20:00</div>
                    <div>21:00</div>
                    <div>22:00</div>
                    <div>23:00</div>
                </div>
                <div class="events_box">
                    <div class="event_box_row" v-for="timeIndex in 24" :key="timeIndex">

                        <div
                            class="cell_content event_set_others"
                            v-if="isDateSet(`${date.value} - ${timeIndex-1}:00`) == 'booked'"
                        ></div>
                        <div
                            class="cell_content event_set_you"
                            v-if="isDateSet(`${date.value} - ${timeIndex-1}:00`) == 'bookedbyyou'"
                        ></div>
                        <div
                            class="cell_content event_not_available"
                            v-if="isDateSet(`${date.value} - ${timeIndex-1}:00`) == 'unavailable'"
                        ></div>
                        <div
                            class="cell_content available"
                            v-if="isDateSet(`${date.value} - ${timeIndex-1}:00`) == 'available'"
                        ></div>

                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import BackDrop from "@/components/BackDrop.vue";
import TutorBookingModal from "@/components/tutor/TutorBookingModal.vue";

export default defineComponent({
    name: "tutor-schedule-calendar",
    components: { BackDrop, TutorBookingModal },
    props:['events'],
    data() {
        var day, month;
        
        return { 
            day,
            dayName: '',
            month,
            dayName: '',
            dates: [],
            allBookedEventDates: [],
            allUserEventDates: [],
            allUnavailableEventDates: []
        };
    },
    beforeMount(){
        for(var i=0; i<this.events.length; i++) {
            const eventDate = new Date(this.events[i].datetime).getTime();

            if(this.events[i].eventType.toLowerCase() == "lesson")
                if(this.events[i].studentId == this.$store.state.user._id) this.allUserEventDates.push(eventDate)
                else this.allBookedEventDates.push(eventDate);

            if(this.events[i].eventType.toLowerCase() == "noavail") this.allUnavailableEventDates.push(eventDate)
        }
        this.load();
    },
    methods: {
        load() {
            const date = new Date();
            
            this.day = date.getDate();
            this.month = date.getMonth();
            this.year = date.getFullYear();

            this.currentDate = this.day;
            
            const dayofMonth = new Date(this.year, this.month, this.currentDate);
            
            const dateString = dayofMonth.toLocaleDateString('en-us', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            this.dates.push({
                string: dateString,
                value: `${this.currentDate}/${this.month+1}/${this.year}`
            });

            console.log(this.dates);

        },
        isDateSet(datetime) {
    
            var date = datetime.split(' - ')[0];
            var time = datetime.split(' - ')[1];
            
            var day = date.split('/')[0],
            month = date.split('/')[1]-1,
            year = date.split('/')[2],
            hour = time.split(':')[0],
            min = time.split(':')[1],
            eventCellDate = new Date(year, month, day, hour, min),
            eventCellTime = eventCellDate.getTime();

            if(this.allBookedEventDates.includes(eventCellTime)) return 'booked';
            if(this.allUserEventDates.includes(eventCellTime)) return 'bookedbyyou';
            if(this.allUnavailableEventDates.includes(eventCellTime)) return 'unavailable';
            else return 'available';
        },
        openModal() {
            this.hideNewEventModal = false;
        },
        closeModal() {
            this.hideNewEventModal = true;
        }
    }
});
</script>

<style scoped>
    div.month-name {
        text-align: end;
        padding: 2% 5%;
        font-weight: 600;
        color: grey;
        display: flex;
        justify-content: space-between;
    }
    
    .schedule_body {
        padding: 0 5%;
        height: 300px;
        overflow-y: auto;
        display: flex;
    }

    .schedule_body::-webkit-scrollbar {
        width: 15px;
    }
    .schedule_body::-webkit-scrollbar-track {
        background: rgb(242, 242, 242);
    }
    .schedule_body::-webkit-scrollbar-thumb {
        background: lightgrey;
    }
    
    .time{
        width: 10%;
    }
    .time > div {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .events_box {
        width: 85%;
        margin-left: auto;
    }
    .event_box_row {
        border-top: 1px solid var(--paper-grey-200);
        height: 35px;
        display: flex;
        justify-content: space-between;
    }
    .event {
        border: 1px solid black;
        display: flex;
        align-content: center;
        justify-content: center;
        height: 100%;
        width: calc(100% / 7);
    }
    .text {
        margin: auto;
    }
    .event_cell {
        border: 1px solid rgb(242, 242, 242);
        border-top: none;
        border-right: none;
        cursor: pointer;
    }
    .cell_content {
        width: 100%;
        height: 100%;
    }
    .cell_content:hover {
        background: rgba(195, 243, 239, 0.521);
    }
    .event_set_you {
        background: #7ec937;
    }
    .event_set_others {
        background: #7ec937;
        background-image: repeating-linear-gradient(45deg ,transparent,transparent 1px,#eee 0,#7ec937 3px);
    }
    .event_not_available {
        background: grey;
    }
</style>