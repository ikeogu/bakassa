<template>
    <div class="community_question">
        <div class="main">
            <div class="question section">
                <div class="question_title" v-if="question.title">
                    {{ capitalize(question.title) }}
                </div>
                
                <div class="user_details">
                    <div class="user_image">
                        <img src="@/assets/userimage.png">
                    </div>
                    <div class="dets">
                        <div class="user_name">
                            {{ userData.fullname }}
                        </div>
                        <div class="date">
                            {{ calcTimeLapse(question.dateCreated) }}
                        </div>
                    </div>
                    <div 
                        class="language"
                        v-for="language in question.languages"
                        :key="language"
                    >
                        {{ language }}
                    </div>
                </div>
                
                <div class="desc">
                    {{ question.desc }}
                </div>

                <div class="others">
                    <div class="likes">
                        <div class="number">
                            {{ likes.length }}
                        </div>
                        <div class="label">Likes</div>
                    </div>
                    <div class="comments" v-if="comments.length > 0">
                        <div class="number">
                            {{ comments.length }}
                        </div>
                        <div class="label">Comments</div>
                    </div>
                    <div class="comments empty" v-else>
                        <div class="label">No Comments</div>
                    </div>
                </div>
            </div>

            <div class="comments section ">
                
                <div class="new_comment_box">
                    <textarea 
                        class="custom_scroll"
                        v-model="newCommentModel.value"
                    ></textarea>
                    <div class="submit_btn_wrapper">
                        <ButtonIcon 
                            buttonIcon="paper-plane"
                            @buttonAction="submitComment()"
                        />
                    </div>
                </div>

                <div class="comments_list">
                    <CommentCard 
                        v-for="comments in comments"
                        :key="comments._id"
                        :id="comments._id"
                        :user="comments.user"
                        :date="comments.dateCreated"
                        :content="comments.content"
                        :replies="comments.replies"
                        :likes="comments.likes"
                        :branchNo="1"
                    />
                </div>
            </div>
        </div>

        <!-- 
            <div class="related">
                <div class="head">Related</div>
                <div class="related_list">
                    <div 
                        v-for="related in relatedList"
                        :key="related._id"
                        class="related_question"
                    >
                        <router-link :to="related._id">
                            <div class="title"> {{ related.title }} </div>
                        </router-link>
                        <div class="desc">{{ related.desc }}</div>
                    </div>
                </div>
            </div>
        -->

    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CommentCard from "@/components/Card/CommentCard.vue";
import duration from "@/helper/duration.js";

export default defineComponent({
    components: { ButtonIcon, CommentCard },
    data() {
        return {
            question: '',
            likes: [],
            comments: [],
            userData: '',
            newCommentModel: {
                value: '',
                error: ''
            }
            // relatedList: [
            //     {   
            //         _id: '12321',
            //         title: 'How to greet properly',
            //         desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, placerat platea lobortis leo maecenas neque felis senectus, commodo augue orci sodales semper varius. Mauris porta purus vehicula bibendum parturient egestas quis fusce, pretium vestibulum suscipit ornare dignissim ad torquent commodo cum, hac inceptos ut vulputate dapibus ac sed. Aptent dictumst aliquet mus nunc litora vitae purus conubia volutpat est, inceptos feugiat porttitor metus quis arcu pretium at platea natoque magna, sociosqu bibendum ultrices hendrerit vestibulum ligula molestie cursus nulla.',
            //         desc: 'lorem ipsum',
            //         user: '61c211f4f6d8f52b0cdd143f',
            //         language: 'english',
            //         comments: [
            //             {
            //                 _id: '1',
            //                 content: 'lorem ipsum',
            //                 user: '61c211f4f6d8f52b0cdd143f',
            //                 replies: [],
            //                 date: '11/04/2019',
            //                 likes: [],
            //             },
            //             {
            //                 _id: '2',
            //                 content: 'lorem ipsum',
            //                 user: '61c211f4f6d8f52b0cdd143f',
            //                 replies: [],
            //                 date: '11/04/2019',
            //                 likes: [],
            //             }       
            //         ],
            //         date: '11/04/2019',
            //         likes: [],
            //     },
            //     {   
            //         _id: '299843',
            //         title: 'How to greet properly',
            //         desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, placerat platea lobortis leo maecenas neque felis senectus, commodo augue orci sodales semper varius. Mauris porta purus vehicula bibendum parturient egestas quis fusce, pretium vestibulum suscipit ornare dignissim ad torquent commodo cum, hac inceptos ut vulputate dapibus ac sed. Aptent dictumst aliquet mus nunc litora vitae purus conubia volutpat est, inceptos feugiat porttitor metus quis arcu pretium at platea natoque magna, sociosqu bibendum ultrices hendrerit vestibulum ligula molestie cursus nulla.',
            //         desc: 'lorem ipsum',
            //         user: '61c211f4f6d8f52b0cdd143f',
            //         language: 'english',
            //         comments: [
            //             {
            //                 _id: '1',
            //                 content: 'lorem ipsum',
            //                 user: '61c211f4f6d8f52b0cdd143f',
            //                 replies: [],
            //                 date: '11/04/2019',
            //                 likes: [],
            //             },
            //             {
            //                 _id: '2',
            //                 content: 'lorem ipsum',
            //                 user: '61c211f4f6d8f52b0cdd143f',
            //                 replies: [],
            //                 date: '11/04/2019',
            //                 likes: [],
            //             }       
            //         ],
            //         date: '11/04/2019',
            //         likes: [],
            //     }
            // ]
        }
    },
    methods: {
        async fetchQuestionDetails () {
            const id = this.$route.params.question;

            await this.$store.dispatch('fetchcommunityquestion', id)
            .then(async (questionInfo)=> {

                this.question = questionInfo[0];
                this.likes = this.question.likes;
                this.comments = this.question.comments.reverse();
                
                await this.$store.dispatch('fetchuser', this.question.user)
                .then((userdata)=> this.userData = userdata )
                .catch((error)=> console.log(error));
            })
            .catch((error)=> console.log(error));
        },
        submitComment() {
            const payload = {
                questionid: this.$route.params.question,
                comment: this.newCommentModel.value,
            }
            this.$store.dispatch('submitcomment', payload)
            .then((response)=> console.log(response))
            .catch((error)=> console.log(error.response));
        },
        capitalize(text) {
            return text[0].toUpperCase() + text.substr(1, text.length)
        },
        calcTimeLapse(date) {
            return duration.timeLapse(date);
        }
    },
    async mounted () {
        this.fetchQuestionDetails();
    }
})
</script>

<style scoped>
    .community_question {
        display: flex;
        justify-content: space-between;
    }

    .main {
        box-shadow: var(--shadow-100);
        border-radius: 10px;
        width: 70%;
        padding: 3%;
    }
    .related {
        box-shadow: var(--shadow-100);
        width: 22%;
        height: max-content;
        border-radius: 5px;
    }
    .related .head {
        padding: 4%;
        font-size: 110%;
        font-weight: 700;
        border-bottom: 1px solid var(--paper-grey-200);
    }
    .related_list {
        padding: 2% 0;
    }
    .related_question {
        border-bottom: 1px solid var(--paper-grey-200);
        padding: 4% 2%;
        overflow: hidden;
        width: 90%;
        margin: 0 auto;
    }
    .related_question:last-child {
        border: none;
    }
    .related_question .title {
        font-weight: 600;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .related_question .desc {
        font-weight: 400;
        font-size: 90%;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .question_title {
        font-size: 200%;
        font-weight: 600;
        color: var(--paper-grey-800);
        display: flex;
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
        font-size: 100%;
        text-transform: capitalize;
    }
    .date {
        font-size: 90%;
        color: var(--paper-grey-600);
    }

    .language {
        margin-left: auto;
        text-transform: capitalize;
        padding: 5px 25px;
        background: var(--burgundy-faded);
        color: var(--burgundy-100);
        border-radius: 5px;
        font-weight: 600;
    }

    .desc {
        margin-top: 2%;
        color: var(--paper-grey-800);
        font-size: 120%;
        overflow: hidden;
    }

    .others {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .others > div {
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 4px;
        margin-right: 1%;
        font-weight: 400;
        color: var(--paper-grey-700);
        font-size: 110%;
    }
    .number {
        padding: 0 5px;
    }

    .community_question .main .section {
        margin-left: auto;
        width: calc(100% - 2%);
    }
    .community_question .main .section:first-of-type {
        margin-left: auto;
        width: 100%;
    }

    .comments.section {
        
    }
    .new_comment_box {
        display: flex;
    }
    .new_comment_box textarea {
        width: 90%;
        min-height: 50px;
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
    .comments_list {
        /* border-top: 1px solid var(--paper-grey-400); */
    }
    .comments.empty {
        font-weight: 600;
    }
</style>



