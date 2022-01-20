<template>            
    <div class="schedule">
        <div class="calendar-details">
            <div class="status_outline">
                <div class="available">
                    <div class="dot"></div>
                    <div>Available</div>
                </div>
                <div class="booked">
                    <div class="dot"></div>
                    <div>Booked</div>
                </div>
                <div 
                    class="booked_by_you"
                    v-if="showingTo !== 'tutor'"
                >
                    <div class="dot"></div>
                    <div>Booked by you</div>
                </div>
                <div class="not_available">
                    <div class="dot"></div>
                    <div>Not available</div>
                </div>
            </div>
            <div class="all_days_of_month">
                <div 
                    v-for="(date, index) in dates"
                    :key="index"
                    class="day"
                >
                    <div class="text">{{ date.string }}</div>
                </div>
            </div>
            <div class="schedule_body">
                <div class="time">
                    <div>00:00</div>
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
                            v-for="(date, dateIndex) in dates"
                            :key="dateIndex"
                            class="day event_cell"
                        >
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
                                @click="selectCell(`${date.value} - ${timeIndex-1}:00`)"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import CompleteReg from "./CompleteRegModal.vue";

export default defineComponent({
    name:"tutor-full-schedule-calendar",
    props:['events', 'showingTo'],
    components: { CompleteReg },
    data() {
        var daysInMonth, day, month, year, daysLimit = 7, currentDate,
        isEventSet = null,
        dates = [],
        allBookedEventDates = [],
        allUserEventDates = [],
        allUnavailableEventDates = [];

        return { 
            day, month, year,
            daysInMonth,
            daysLimit,
            currentDate,
            dates,
            isEventSet,
            allBookedEventDates,
            allUserEventDates,
            allUnavailableEventDates 
        }
    },
    beforeMount(){  
        for(var i=0; i<this.events.length; i++) {
            const eventDate = new Date(this.events[i].datetime).getTime();

            if(this.events[i].eventType.toLowerCase() == "lesson")
                if(this.events[i].studentId == this.$store.getters.userData._id) this.allUserEventDates.push(eventDate)
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

            for(var i=0; i<7; i++) {
                this.currentDate = date.getDate() + i;
                
                const dayofMonth = new Date(this.year, this.month, this.currentDate);
                
                const dateString = dayofMonth.toLocaleDateString('en-us', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });

                this.dayName = dateString.split(', ')[0];

                this.dates.push({
                    string: dateString,
                    value: `${this.currentDate}/${this.month+1}/${this.year}`
                });

            }

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
        selectCell(datetime) {

            var date = datetime.split(' - ')[0],
            time = datetime.split(' - ')[1];

            this.$emit('button-action', `${date} - ${time}`)
        }
    }
});
</script>

<style scoped>
    .calendar-details {
        padding: 2% 0% 5%;
        height: 80%;
    }
    .status_outline {
        display: flex;
        width: 75%;
        height: 6%;
        margin: 0 auto;
    }
    .status_outline > div {
        margin-right: 5%;
        display: flex;
        align-items: center;
        width: calc(100%/4);
        font-size: 80%;
        color: grey;
    }
    .status_outline div.dot {
        border-radius: 50%;
        width: 8px;
        height: 8px;
        margin-right: 1%;
    }
    .available .dot {
        border: 1px solid rgb(141, 141, 141);
    }
    .booked .dot {
        background-color: #7ec937;
        background-image: repeating-linear-gradient(45deg ,transparent,transparent 1px,#eee 0,#7ec937 3px);
    }
    .booked_by_you .dot {
        background-color: #7ec937;
    }
    .not_available .dot {
        background: rgb(141, 141, 141);
    }
    .schedule {
        height: 100%;
    }
    .all_days_of_month {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 9.9%;
        padding-right: 15px;
        height: 7%;
        border-bottom: 1px solid lightgrey;
    }
    .day {
        display: flex;
        align-content: center;
        justify-content: center;
        height: 100%;
        width: calc(100% / 7);
    }
    .time{
        width: 10%;
    }
    .time div{
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
   .schedule_body {
        height: 100%;
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
    
    .events_box {
        width: 90%;
    }
    .event_box_row {
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


