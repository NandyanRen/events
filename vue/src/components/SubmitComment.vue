<template>
    <div class="flex my-8">
        <form @submit.prevent="saveComment" ref="commentForm" class="w-1/2">
                <h1 class="mb-2 font-medium">Leave a comment</h1>
                <h1 class="mb-2 font-medium" v-if="replyingUsername"> - Replying to {{ replyingUsername }}</h1>
            <div class="flex flex-col">
                <input ref="usernameForm" type="type" name="username" id="username" v-model="username" autocomplete="username" required="" placeholder="Username"
                    class="border border-1 px-2 mb-2"/>
                <textarea name="body" id="body" v-model="body" required="" placeholder="Write your comment here..."
                class="border border-1 px-2 mb-2"/>
            </div>
            <button type="submit" class=" mr-10 mt-5 w-1/6 content-end group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                Submit
            </button>
        </form>
    </div>
</template>

<script>

export default{
    props: ['replyingUsername', 'parent_comment_id'],
    data(){
        return {
            username:null,
            body:null,
        }
    },
    methods:{
        saveComment(){
                let model = {
                    parent_comment_id: this.parent_comment_id,
                    username: this.username,
                    body: this.body,
                    post_id: this.$route.params.id,
                }
                this.$store.dispatch("saveComment", model).then(this.$refs.commentForm.reset());

            },
    },
}
</script>
