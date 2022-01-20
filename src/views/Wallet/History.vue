<template>
    <div class="wallet_history">
        <div class="head">
            <div class="section_title" v-if="isTutor">Wallet</div>
        </div>
        <div class="balance_card" v-if="isTutor">
            <div class="label">Wallet Balance</div>
            <div class="balance">
                ${{ $store.getters.tutorData.wallet.balance }}
            </div>
            <div class="balance_btn_wrapper">
                <ButtonPlainText 
                    buttonText="Withdraw"
                    @buttonAction="showWithdrawModal()"
                />
            </div>
        </div>
        
        <div class="withdraw_section" v-if="isOpen">
            <div class="overlay"></div>
            <div class="withdrawal_form">
                <div class="head">
                    <div class="form_title">
                        Withdrawal
                    </div>
                    <font-awesome-icon 
                        :icon="['fas', 'times']" 
                        class="close"
                        @click="closeWithdrawModal()"
                    />
                </div>
                
                <form @submit.prevent="signInButtonPressed" v-if="!requestSent">
                    <input 
                        placeholder="r"
                        :type=amountModel.type
                        v-model=amountModel.value
                        class="withdraw_amount"
                        readonly
                    />  

                    <label>PayPal Address</label>
                    <input 
                        :type=paypalAddModal.type
                        v-model=paypalAddModal.value
                        class="withdraw_address"
                    />

                    <div class="withdraw_button_wrapper">
                        <ButtonPlainText 
                            buttonText="SUBMIT REQUEST"
                            :isLoading=submitting
                            @buttonAction="submitWithdrawReq()"
                        />
                    </div>
                </form>

                <div class="request_result_box success" v-if="requestSent && withdrawSuccess">
                    <font-awesome-icon :icon="['fas', 'check']" class="icon" />
                    <div class="text">
                        Your request to withdraw ${{ amountModel.value }} has been sent successfully.
                    </div>
                </div>

                <div class="request_result_box error" v-if="requestSent && withdrawError">
                    <font-awesome-icon :icon="['fas', 'times']" class="icon" />
                    <div class="text">
                        There was an error sending your withdrawal request, try again.
                    </div>
                    <div class="result_button_wrapper">
                        <ButtonPlainText 
                            buttonText="GO BACK"
                            @buttonAction=goback()
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="table">
            <div class="section_title">Transaction History</div>

            <TutorWalletTable 
                v-if="isTutor"
                :txns=userTxn
            />

            <StudentWalletTable 
                v-else
                :txns=userTxn
            />
        </div>
    </div>
</template>
<script>

import StudentWalletTable from "@/components/Table/StudentWalletTable.vue";
import TutorWalletTable from "@/components/Table/TutorWalletTable.vue";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";

export default {
    components: { StudentWalletTable, TutorWalletTable, ButtonPlainText },
    data() {
        var userTxn, isTutor;

        if(this.$store.getters.tutorData){
            userTxn = this.$store.getters.tutorData.wallet.history;
            isTutor = true;
        } else {
            userTxn = this.$store.getters.userData.transactions;
            isTutor = false;
        }
        return {
            isTutor,
            userTxn,
            isOpen: false,
            amountModel: {
                type: 'number',
                value: (isTutor) ?this.$store.getters.tutorData.wallet.balance : 0,
                error: ''
            },
            paypalAddModal: {
                type: 'text',
                value: '',
                error: ''
            },
            submitting: false,
            requestSent: false,
            withdrawSuccess: false,
            withdrawError: false
        }
    },
    methods: {
        showWithdrawModal() {
            this.isOpen = true;
        },
        closeWithdrawModal() {
            this.isOpen = false;
            this.requestSent = false;
            this.withdrawSuccess = false;
            this.withdrawError = false;
        },
        submitWithdrawReq() {

            if(this.amountModel.value > 0 && this.paypalAddModal.value != ''){
                const payload = {
                    amount: this.amountModel.value,
                    paypalAdd: this.paypalAddModal.value,
                    tutorname: this.$store.getters.tutorData.tutorName
                };

                this.submitting = true;
                this.$store.dispatch('submitwithdrawalrequest', payload)
                .then(()=> {
                    this.submitting = false;
                    this.requestSent = true;
                    this.withdrawSuccess = true;
                })
                .catch((error)=> {
                    this.submitting = false;
                    console.log(error.response);
                    this.requestSent = true;
                    this.withdrawError = true;
                });
            }
        },
        goback() {
            this.requestSent = false;
            this.withdrawError = false;
        }
    }
}
</script>
<style scoped>
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
        margin-bottom: 2%;
    }
    .table {
        margin-top: 5%;
    }

    .balance_card {
        box-shadow: var(--shadow-100);
        margin-left: auto;
        width: 30%;
        height: 150px;
        padding: 15px;
        border-radius: 5px;
        color: white;
    }
    .balance_card .label {
        color: var(--burgundy-200);
        font-weight: 700;
        height: 20%;
    }
    .balance_card .balance {
        color: var(--burgundy-200);
        font-size: 350%;
        font-weight: 700;
        margin-left: auto;
        width: max-content;
        height: 50%;
    }
    .balance_btn_wrapper {
        height: 30%;
    }
    .balance_btn_wrapper button {
        border: 1px solid var(--burgundy-200);
        background: var(--burgundy-200);
        color: white;
        border-radius: 5px;
    }

    .withdraw_section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.562);
    } 
    .withdrawal_form {
        width: 40%;
        /* height: 60vh; */
        background: white;
        position: absolute;
        border-radius: 5px;
        padding: 3%;
    }
    .form_title {
        font-size: 200%;
        font-weight: 600;
        color: var(--paper-grey-800);
    }
    .close {
        margin: auto 0;
        margin-left: auto;
        width: 20px;
        height: 20px;
        padding: 5px;
        border-radius: 50%;
        background: var(--paper-grey-600);
        color: white;
        cursor: pointer;
    }
    input.withdraw_amount {
        height: 100px;
        width: 100%;
        font-size: 450%;
        font-weight: 800;
        margin-top: 5%;
        outline: none;
        text-align: center;
        border: none;
    }
    input.withdraw_address {
        border: 1px solid;
        border-radius: 5px;
        height: 50px;
        width: 96%;
        font-size: 120%;
        padding: 0 2%;
        margin-top: 1%;
    }
    label {
        font-weight: 700;
        color: grey;
    }

    .withdraw_button_wrapper {
        margin-top: 5%;
        margin-left: auto;
        height: 50px;
        width: 30%;
    }
    .withdraw_button_wrapper button {
        --green: rgb(44, 139, 44);
        border-radius: 5px;
        border: none;
        background: var(--green);
        color: white;
    }

    .request_result_box {
        margin-top: 10%;
    }
    .icon {
        --green: rgb(49, 173, 49);
        /* font-size: 400%; */
        color: var(--green);
        width: 50px;
        height: 50px;
        padding: 3%;
        border-radius: 50%;
        border: 7px solid var(--green);
    }
    .error .icon {
        color: var(--burgundy-200);
        border: 7px solid var(--burgundy-200);
    }
    .text {
        font-size: 250%;
        font-weight: 300;
    }
    .result_button_wrapper {
        width: 30%;
        height: 50px;
        margin-top: 4%;
    }
    .result_button_wrapper button {
        border-radius: 5px;
        background: none;
    }
    .error .result_button_wrapper button {
        border: 1px solid var(--burgundy-200);
        color: var(--burgundy-200);
    }
</style>