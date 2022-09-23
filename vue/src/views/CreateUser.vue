<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 h-full m-auto border border-1 p-8'>
        <!-- Back action button -->
        <div class="flex justify-between">
            <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center mb-2">Back</router-link>
        </div>
        <!-- Pop up Modal -->
        <div class="absolute top-0 left-0 right-0 bottom-0 z-40 bg-opacity-80" v-if="showModal"></div>
            <div class="absolute top-14 left-1/3 z-50 w-1/3 bg-gray-200 border-1 p-6" v-if="showModal">
                <h1>{{  this.responseData }}</h1>
                <div class="flex justify-end px-2">
                    <button class="rounded-md py-1 px-4 content-end border border-transparent text-white bg-red-500 mt-5" @click="toDashboard(success)">Close</button>
                </div>
        </div>
        <!-- User name form -->
            <form @submit.prevent="saveUser">
                <div class="flex flex-col">
                    <input type="type" name="name" id="name" v-model="name" required="" maxlength="50" placeholder="Name..."
                        class="border border-1 px-2 mb-2"/>
                </div>
            
                <div class="flex mb-8 justify-end px-2">
                    <button type="submit" class="mt-5 lg:w-1/4 content-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                        Submit
                    </button>
                </div>
            </form>
            
            <h1 class="font-bold">Current Users</h1>
                    <ul class="space-y-1">
                        <li class="bg-green-100 w-1/2 rounded p-1" v-for="user in users">
                            {{ user.name }}
                        </li>
                    </ul>

                    {{ users }}
        </div>
    </div>
</template>

<script>
export default {
        computed: {
            users(){
                return this.$store.getters.allUsers;
            },
        },
        data(){
            return {
                name:null,
                showModal: false,
            }
        },
        methods:{
            fetchUsers(){
            this.$store.dispatch("getUsers");
            },
            saveUser(){
                let model = {
                    name: this.name,
                }
                this.$store.dispatch("saveUser", model)
                    .then(response => {
                        if(response.status === 201) {
                            this.responseData = "Creating User Successful!"
                            this.success = true
                            return this.showModal = true
                        }
                    })
                    .catch((response) => {
                        if(response.status != 201){
                            this.responseData = "Creating User Failed!"
                            return this.showModal = true
                        }
                        return
                    })
            },
            toDashboard(success) {
                if(success)
                    setTimeout(() => this.$router.push({name: "Dashboard"}), 500)
                this.showModal = false
            },
        },
        beforeMount() {
            this.fetchUsers();
        },
    }
</script>