<template>
    <div class='flex justify-center items-center'>
        <div class='w-1/2 h-full m-auto border border-1 p-8'>
            <div class="flex justify-between">
                <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center">Back</router-link>
                <button v-on:click="deletePost()" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center">Delete</button>
            </div>
            <article class="mb-8">
                <div class="font-medium text-2xl my-8">
                    {{ post.title }}
                </div>
                <div v-html="post.body" class="truncate">
                    {{ post.body }}
                </div>
            </article>

            <hr/>
            <SubmitComment :replyingUsername="replyingToUser" :parent_comment_id="comment_id"></SubmitComment>
            <Comments/>

            <!-- <div ref="replyFocus" class="flex flex-col my-8 space-y-8">
                <div class="w-1/2" v-for="comment in allComments.comments" v-bind:key="comment.id">
                    <div class="font-medium">{{ comment.username }}</div>
                    <div class="">{{ comment.body }}</div>
                    <button class="font-medium text-sm mt-2 rounded-md bg-gray-200 px-1" for="username" @click="reply(comment.username, comment.id)">Reply</button>
                    <div v-for="nestedComment in allComments.nestedComments" v-bind:key="nestedComment.id" class="ml-8">
                        <div v-if="nestedComment.parent_comment_id === comment.id">
                            <div class="font-medium mt-2">^ {{ nestedComment.username }}</div>
                            <div class="ml-4">{{ nestedComment.body }}</div>
                            <button class="font-medium text-sm mt-2 rounded-md bg-gray-200 px-1" @click="reply(nestedComment.username, nestedComment.id)">Reply</button>
                        </div>
                        <div v-for="anotherNestedComment in allComments.nestedComments" v-bind:key="anotherNestedComment.id" class="ml-8">
                            <div v-if="anotherNestedComment.parent_comment_id === nestedComment.id && nestedComment.parent_comment_id === comment.id">
                                <div class="font-medium mt-2">^ {{ anotherNestedComment.username }}</div>
                                <div class="ml-4">{{ anotherNestedComment.body }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            
        </div>
    </div>
</template>

<script>
import SubmitComment from '../components/SubmitComment.vue';
import Comments from '../components/Comments.vue';

export default {
    components: {
        SubmitComment: SubmitComment,
        Comments: Comments,
    },
    data(){
        return {
            comment_id:null,
            replyingToUser:null,
            username:null,
            body:null,
        }
    },
    computed: {
        post(){
            return this.$store.getters.getPost;
        },
        // allComments(){
        //     return this.$store.getters.getComments;
        // },
    },
    methods:{
        fetchPost(){
            this.$store.dispatch("getPostId", this.$route.params.id);
        },
        // fetchComments(){
        //     this.$store.dispatch("getComments", this.$route.params.id);
        // },
        deletePost(){
            this.$store.dispatch("deletePost", this.$route.params.id)
            .then(this.$router.push({name: "Dashboard"}));
        },
        // reply(username, user_comment_id){
        //     this.comment_id = user_comment_id;
        //     this.replyingToUser = username;
        //     document.getElementById("username").focus();
        // },
    },
    beforeMount() {
        this.fetchPost();
        // this.fetchComments();
    },
}
</script>