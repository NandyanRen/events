<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 h-full m-auto border border-1 p-8'>
        <div class="flex justify-between">
            <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center">Back</router-link>
        </div>
            <div>
                <div class="font-medium text-2xl my-8">
                    Have a story to tell?
                </div>
            </div>

            <form @submit.prevent="savePost">
                <div class="mb-2 font-medium">Write your story below:</div>
                    <div class="flex flex-col">
                        <input type="type" name="title" id="title" v-model="title" required="" maxlength="50" placeholder="Title..."
                            class="border border-1 px-2 mb-2"/>
                        <textarea rows="7" name="body" id="body" v-model="body" required="" minlength="180" placeholder="Write your story here..."
                        class="border border-1 px-2 mb-2"/>
                    </div>
            
                <div class="flex mb-8 justify-end px-2">
                    <button type="submit" class="mt-5 w-1/4 content-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
        data(){
            return {
                title:null,
                body:null,
            }
        },
        methods:{
            savePost(){
                let model = {
                    title: this.title,
                    body: this.body,
                }
                this.$store.dispatch("savePost", model)
                .then(setTimeout(() => this.$router.push({name: "Dashboard"}), 500));
            }
        },
    }
</script>