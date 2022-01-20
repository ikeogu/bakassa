<template>
    <div class="comment_card">
        <div class="user_details">
            <div class="user_image">
                <img src="@/assets/userimage.png">
            </div>
            <div class="dets">
                <div class="user_name">
                    {{ userData.fullname }}
                </div>
                <div class="date">
                    {{ calcTimeLapse() }}
                </div>
            </div>
        </div>
        
        <div class="desc">
            <div class="parent_reply" v-if="parentUser">
                @{{ parentData.fullname }}
            </div>
            {{ content }}
        </div>

        <div class="others">
            <div class="likes" v-if="!parentUser">
                <div class="number">
                    {{ likes.length }}
                </div>
                <div class="label">Likes</div>
            </div>
            <div class="comments" v-if="!parentUser">
                <div class="number" v-if="replies">
                    {{ replies.length }}
                </div>
                <div class="number" v-else>
                    0
                </div>
                <div class="label">replies</div>
            </div>

            <div class="reply_action" @click="showReplyBox()">
                Reply
            </div>
        </div>

        <div class="reply_section" v-if="replyBoxVisibility" ref="replyBox">
            <div class="new_comment_box">
                <div
                    class="custom_scroll textarea"
                    ref="comment_reply"
                    contenteditable
                ></div>
                <div class="submit_btn_wrapper">
                    <ButtonIcon 
                        buttonIcon="paper-plane"
                        @buttonAction="submitCommentReply()"
                    />
                </div>
            </div>
        </div>

        <CommentCard 
            v-for="comments in replies"
            :key="comments._id"
            :id="comments._id"
            :user="comments.user"
            :parentUser="comments.parentUser"
            :date="comments.dateCreated"
            :content="comments.content"
            :replies="comments.replies"
            :likes="comments.likes"
            :branchNo="branchNo + 1"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import duration from "@/helper/duration.js";

export default defineComponent({
    name: 'comment-card',
    props: ['id', 'user', 'date', 'parentUser', 'content', 'replies', 'likes', 'branchNo'],
    components: { ButtonIcon },
    data() {
        return {
            userData: '',
            parentData: '',
            replyBoxVisibility: false
        }
    },
    methods: {
        submitCommentReply(id) {
            const payload = {
                questionid: this.$route.params.question,
                userid: this.user,
                commentid: this.id,
                reply: this.$refs.comment_reply.innerText
            };

            if(this.branchNo == 1) {
                this.$store.dispatch('submitcommentreply', payload)
                .then((response)=> console.log(response))
                .catch((error)=> console.log(error.response));
                
            } else {
                this.$store.dispatch('submitreplytoreply', payload)
                .then((response)=> console.log(response))
                .catch((error)=> console.log(error.response));
            }
        },
        showReplyBox() {
            this.replyBoxVisibility = true;
        },
        async detReplyBranch() {
            if(this.parentUser)
                this.parentData = await this.fetchUser(this.parentUser);
        },
        fetchUser(userid) {
            return new Promise((resolve)=> {
                this.$store.dispatch('fetchuser', userid)
                .then((userdata)=> resolve(userdata))
                .catch((error)=> console.log(error));
            }); 
        },
        calcTimeLapse() {
            return duration.timeLapse(this.date);
        }
    },
    async mounted() {
      this.userData = await this.fetchUser(this.user);
      await this.detReplyBranch();
    }
});
</script>

<style scoped>
    .comment_card {
        border-bottom: 1px solid var(--paper-grey-300); 
        padding: 3%;
        transition: 0.5s;
    }
    .comment_card:last-child {
        border: none;
    }

    .comment_title {
        height: 15%;
        font-size: 180%;
        font-weight: 600;
        color: var(--paper-grey-800);
        display: flex;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .user_details {
        display: flex;
        align-items: center;
    }
    
    .user_image {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .dets {
        margin-left: 2%; 
    }
    .user_name {
        font-weight: 500;
        font-size: 90%;
        text-transform: capitalize;
    }
    .date {
        font-size: 90%;
        color: var(--paper-grey-600);
    }

    .desc {
        margin-top: 5px;
        color: var(--paper-grey-700);
        font-size: 100%;
        overflow: hidden;
        padding: 2% 0;
    }
    .desc > div {
        display: inline;
    }
    .parent_reply {
        color: var(--burgundy-200);
        text-decoration: underline;
    }

    .others {
        display: flex;
        align-items: center;
    }
    .others > div {
        border-radius: 15px;
        display: flex;
        align-items: center;
        margin-right: 1%;
        font-weight: 400;
        color: var(--paper-grey-700);
        font-size: 90%;
    }
    .number {
        padding: 0 5px 0 0;
    }
    .others > .comments {
        margin-right: 5%;
    }
    .reply_action {
        font-weight: 600 !important;
        color: var(--burgundy-100) !important;
        cursor: pointer;
    }
    
    .reply_section {
        margin-top: 2%;
    }
    .new_comment_box {
        display: flex;
        align-items: flex-end;
    }
    .new_comment_box .textarea {
        border: 1px solid var(--paper-grey-500);
        width: 90%;
        min-height: 50px;
        max-height: 100px;
        overflow: hidden;
        overflow-y: auto;
        resize: none;
        border-radius: 25px;
        outline: none;
        font-size: 120%;
        padding: 4px 8px;
    }
    .submit_btn_wrapper {
        width: 60px;
        height: 60px;
        margin-left: auto;
    }
    .submit_btn_wrapper button {
        border-radius: 50%;
        border: none;
        background: var(--burgundy-100);
        color: white;
        box-shadow: var(--shadow-100);
    }
</style>