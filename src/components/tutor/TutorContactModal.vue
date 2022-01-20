<template>
    <div class="tutor_contact_model">
        <div id="contactModalFrame">
            <div class="contact_modal">
                <div class="contact_head">

                    <div class="tutor_info">
                        <div class="image">
                            <img :src="tutorimage" >
                        </div>
                        <div class="name"> {{ tutorname }} </div>
                    </div>

                </div>

                <div class="messages_list_frame">
                    <div class="messages_list" ref="messageList">
                        <div
                            v-for="(message, index) in allMessages"
                            :key="index"
                            class="message_wrapper"
                        >
                            
                            <div 
                                class="message"
                                :class="{ me: (message.sender === user._id) }"
                            >
                                {{ message.content }}
                            </div>
                            <div 
                                class="status"
                                :class="{ me: (message.sender === user._id) }"
                            >
                                {{ message.status }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="message_box_frame">
                    <div class="message_box">
                        <textarea placeholder="Type something here..." v-model="newmessage"></textarea>
                        <div    
                            class="send_btn_wrapper"
                            :class="{
                                disabled: (newmessage == '') ?true :false
                            }"
                        >
                            <ButtonPlainText 
                                buttonText="SEND"
                                @buttonAction="sendMessage"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";

export default defineComponent({
    name:"tutor-contact-model",
    components: { ButtonPlainText },
    props: ['tutorimage', 'tutorname', 'tutoruserId'],
    data() {
        return { 
            hide: true,
            user: this.$store.getters.userData,
            allMessages: [],
            newmessage: ''
        }
    },
    methods: {
        closeModal() {
            this.hide = false;
        },
        sendMessage() {
            if(this.newmessage != '') {
                if(this.$store.getters.userData != '') {
                    var newMessageObj = {
                        recipient: this.tutoruserId,
                        content: this.newmessage,
                        status: 'sending..',
                        datetime: new Date().toString()
                    };

                    this.allMessages.push(newMessageObj);

                    this.$store.dispatch('sendmessage', newMessageObj)
                    .then((updatedMessages)=> {
                        console.log(updatedMessages);
                        this.allMessages = updatedMessages;
                    })
                    .catch((error)=> {
                        this.allMessages = this.allMessages.filter(element => element.message.status !== 'sending' );
                        console.log(error.response);
                    });
                }
                else this.fetchUser();
            }
        },
        fetchUser() {
            this.$store.dispatch('fetchuserdata')
            .then((response)=> {
                this.sendMessage();
            })
            .catch((error)=> {
                this.$router.push('/logout')
            });
        },
        fetchMessage() {
            this.$store.dispatch('fetchmessages', this.tutoruserId)
            .then((response)=> {
                this.allMessages = response;
            })
            .catch((error)=> {
                console.log(error.response);
            })
        },
        scrollToElement() {
            const parentElement = this.$el.querySelector('.messages_list_frame');
            const element = this.$el.querySelector('.messages_list');

            if(element) {
                parentElement.scrollTop = element.scrollHeight;
            }
        }
    },
    beforeMount() {
        this.fetchMessage();
    },
    mounted() {
        this.scrollToElement();
    },
    updated() {
        this.$nextTick(()=> this.scrollToElement());
        if(this.$store.getters.userData == '') this.fetchUser();
    }
});
</script>

<style scoped>
    div.tutor_contact_model {
        display: flex;
    }
    div#contactModalFrame {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        top: 0px;
        left: 35%;
        height: 100vh;
        position: fixed;
        z-index: 1000;
    }
    .contact_modal {
        width: 100%;
        height: 80vh;
        background: white;
        border-radius: 5px;
    }

    .contact_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(10% - 1px);
        border-bottom: 1px solid var(--paper-grey-300);
        font-weight: 400;
        padding: 0 5%;
    }
    .contact_head .tutor_info {
        display: flex;
        align-items: center;
    }
    .contact_head .tutor_info .image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden; 
    }
    .contact_head .tutor_info .name {
        margin-left: 10px;
        font-size: 130%;
        text-transform: capitalize;
        font-weight: 600;
    }

    .messages_list_frame {
        height: 80%;
        overflow-y: auto;
    }
    .messages_list {
        padding: 5% 0;
        width: 95%;
        margin: 0 auto;
    }
    .me {
        margin-left: auto;
    }
    .message {
        background: #c44444;
        color: white;
        width: max-content;
        max-width: 50%;
        padding: 8px;
        border-radius: 10px;
        margin-top: 5px;
    }
    .status {
        font-size: 80%;
        width: max-content;
    }


    .message_box_frame {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(10% - 1px);
        border-top: 1px solid var(--paper-grey-300);
        font-weight: 400;
        padding: 0 5%;
    }
    .message_box {
        height: 80%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    textarea {
        border: none;
        outline: none;
        resize: none;
        height: 90%;
        width: 80%;
        background: none;
        font-size: 110%;
    }
    textarea::-webkit-scrollbar {
        width: 10px;
        background: none;
    }
    textarea::-webkit-scrollbar-thumb {
        background: var(--paper-grey-300);
        border-radius: 5px;
        cursor: pointer !important;
    }
    div.send_btn_wrapper {
        margin-left: 5px;
        width: calc(20% - 5px);
        height: 70%;
    }
    div.send_btn_wrapper button {
        border-radius: 5px;
        background: var(--burgundy-600);
        border: none;
        color: white;
        font-weight: 700;
        cursor: pointer;
    }
    div.send_btn_wrapper.disabled {
        opacity: 0.5;
    }
</style>