<template>
    <div ref="replyFocus" class="flex flex-col my-8 space-y-8">

        <!-- Parent Comment -->
        <div class="w-1/2" v-for="comment in allComments.comments" v-bind:key="comment.id">
            <div class="font-medium">{{ comment.username }}</div>
            <div class="">{{ comment.body }}</div>
            <button class="font-medium text-sm mt-2 rounded-md bg-gray-200 px-1" for="username" @click="reply(comment.username, comment.id)">Reply</button>
            
            <!-- 1st replies -->
            <div v-for="nestedComment in allComments.nestedComments" v-bind:key="nestedComment.id" class="ml-8">
                <div v-if="nestedComment.parent_comment_id === comment.id">
                    <div class="font-medium mt-2">^ {{ nestedComment.username }}</div>
                    <div class="ml-4">{{ nestedComment.body }}</div>
                    <button class="font-medium text-sm mt-2 rounded-md bg-gray-200 px-1" @click="reply(nestedComment.username, nestedComment.id)">Reply</button>
                
                </div>
                
                <!-- 2nd layer replies -->
                <div v-for="anotherNestedComment in allComments.nestedComments" v-bind:key="anotherNestedComment.id" class="ml-8">
                    <div v-if="anotherNestedComment.parent_comment_id === nestedComment.id && nestedComment.parent_comment_id === comment.id">
                        <div class="font-medium mt-2">^ {{ anotherNestedComment.username }}</div>
                        <div class="ml-4">{{ anotherNestedComment.body }}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default{
    props: ['comment_id', 'replyingToUser'],
    data(){
        return {
            comment_id:null,
            replyingToUser:null,
            username:null,
            body:null,
        }
    },
    computed: {
        allComments(){
            return this.$store.getters.getComments;
        },
    },
    methods:{
        fetchComments(){
            this.$store.dispatch("getComments", this.$route.params.id);
        },
        reply(username, user_comment_id){
            this.comment_id = user_comment_id;
            this.replyingToUser = username;
            document.getElementById("username").focus();
        },
    },
    beforeMount() {
        this.fetchComments();
    },
}
</script>
