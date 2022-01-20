<template>
    <div class="nested_comment_card">
        <CommentCard 
            v-for="comments in replies"
            :key="comments._id"
            :id="comments._id"
            :user="comments.user"
            :date="comments.date"
            :content="comments.content"
            :replies="comments.replies"
            :likes="comments.likes"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import CommentCard from "./CommentCard.vue";

export default defineComponent({
    name: 'nested-comment-card',
    components: { CommentCard },
    props: ['replies'],
});
</script>

<style scoped>
    .nested_comment_card {
        
    }
</style>