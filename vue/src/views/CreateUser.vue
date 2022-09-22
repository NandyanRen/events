<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 h-full m-auto border border-1 p-8'>
        <div class="flex justify-between">
            <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center">Back</router-link>
        </div>

            <form @submit.prevent="savePost">
                    <div class="flex flex-col">
                        <input type="type" name="name" id="name" v-model="name" required="" maxlength="50" placeholder="Name..."
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
                name:null,
            }
        },
        methods:{
            savePost(){
                let model = {
                    name: this.name,
                }
                this.$store.dispatch("saveUser", model)
                .then(setTimeout(() => this.$router.push({name: "Dashboard"}), 500));
            }
        },
    }
</script>