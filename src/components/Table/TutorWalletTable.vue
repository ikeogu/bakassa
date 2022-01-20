<template>
    <div class="students_list_table">
        <Table 
            :tableHeadings="headings"
            :tableBody="body"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Table from './Table.vue';

export default defineComponent({
    name: 'tutor-wallet-table',
    components: { Table },
    props: ['txns'],
    data() {
        return {
            headings: [
                'Amount',
                'Student',
                'Lesson',
                'Class Date',
                'Txn Date'
            ],
            body: [],
            allTransactions: []
        }
    },
    methods: {
        getTransactions() {
            this.txns.forEach(tranx => {
                const tempRow = [];
                tempRow.push(tranx.amount);
                
                this.$store.dispatch('fetchuser', tranx.studentId)
                .then((student)=> {
                    tempRow.push(student.fullname);
                    tempRow.push(tranx.lessonTitle);
                    tempRow.push(tranx.event.split('T')[0].toString());

                    tempRow.push(tranx.dateCreated.split('T')[0].toString());
    
                    this.body.push(tempRow);
                })
                .catch((error)=> {
                    console.log(error.response);
                });

            });
        },
        reverseString(s) {
            return s.split("").reverse().join("");
        }
    },
    async beforeMount() {
        this.getTransactions();
    }
})
</script>

<style scoped>

</style>