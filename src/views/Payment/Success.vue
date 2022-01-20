<template>
    <div class="success">
        <div class="message">
            <font-awesome-icon :icon="['fas', 'check']" class="icon" />
            <div class="text">
                You have successfully booked a class
            </div>
            <div class="button_wrapper">
                <ButtonPlainText 
                    buttonText="See Your Schedule"
                    @buttonAction=gotodashboard()
                />
            </div>
        </div>
    </div>
</template>
<script>
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";
export default {
    components: { ButtonPlainText },
    methods: {
        gotodashboard() {
            this.$router.push('/profile');
        }
    }
}
</script>
<style scoped>
    .success {
        min-height: 70vh;
    }
    .message {
        width: 60%;
        margin: auto;
        margin-top: 8%;
        text-align: center;
    }
    .icon {
        --green: rgb(49, 173, 49);
        /* font-size: 400%; */
        color: var(--green);
        width: 80px;
        height: 80px;
        padding: 3%;
        border-radius: 50%;
        border: 7px solid var(--green);
    }
    .text {
        font-size: 300%;
        font-weight: 300;
    }
    .button_wrapper {
        width: 20%;
        height: 50px;
        margin: 4% auto 0;
    }
    .button_wrapper button {
        border-radius: 5px;
        background: none;
        border: 1px solid var(--burgundy-200);
        color: var(--burgundy-200);
    }
</style>