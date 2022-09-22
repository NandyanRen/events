<template>
    <div class='flex h-screen justify-center items-center'>
        <div class=' h-full m-auto border border-1 p-8'>
            <div class="flex justify-between">
                <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center mb-5">Back</router-link>
            </div>

            <div class="absolute top-0 left-0 right-0 bottom-0 z-40 bg-opacity-80" v-if="showModal"></div>
            <div class="absolute top-14 left-1/3 z-50 w-1/3 bg-gray-200 border-1 p-6" v-if="showModal">
                <h1>{{  this.responseData }}</h1>
                <div class="flex justify-end px-2">
                    <button class="rounded-md py-1 px-4 content-end border border-transparent text-white bg-red-500 mt-5" @click="toDashboard(success)">Close</button>
                </div>
            </div>

            <form @submit.prevent="saveEvent">
                    <div class="flex flex-col">
                        <input type="type" name="name" id="name" v-model="name" required="" maxlength="25" placeholder="Title"
                            class="border border-1 px-2 mb-2"/>
                            <div class="space-y-2 ">
                                <date-picker class="mr-2" v-model="date" :default-value="new Date()" :disabled-date="disabledBeforeTodayAndAfterAWeek"></date-picker>
                                <date-picker class="mr-2" v-model="start_time" type="time" format="hh:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                                <date-picker v-model="end_time" type="time" format="hh:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                            </div>
                    </div>
                <div class="flex mb-8 justify-end px-2">
                    <button type="submit" class="mt-5 w-1/4 content-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                        Submit
                    </button>
                </div>
            </form>
                {{ filteredUsers }}
                <input type="text" class="bg-gray-100 px-4 py-2" autocomplete="off" v-model="selectedUser" @input="filterUsers">
                <div v-if=filteredUsers>
                    <ul>
                        <li v-for="filteredUser in filteredUsers">{{  filteredUser }}</li>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
        components: { DatePicker },
        computed: {
            users(){
                return this.$store.getters.allUsers;
            },
            
        },
        data(){
            return {
                name:null,
                dateToday: new Date(),
                date: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                showModal: false,
                responseData: null,
                success: false,
                usersArr: Object.values(this.$store.getters.allUsers.users),
                selectedUser: '',
                filteredUsers: [],
            }
        },
        methods:{
            fetchUsers(){
                this.$store.dispatch("getUsers");
            },
            saveEvent(){
                let model = {
                    name: this.name,
                    start_date: this.date + " " + this.start_time.getHours() + ":" + this.start_time.getMinutes() + ":" + "00",
                    end_date: this.date + " " + this.end_time.getHours() + ":" + this.end_time.getMinutes() + ":" + "00",
                }
                this.$store.dispatch("saveEvent", model)
                .then(response => {
                    if(response.status === 201) {
                        this.responseData = "Creating Event Successful!"
                        this.success = true
                        return this.showModal = true
                    }
                })
                .catch((response) => {
                    if(response.status != 201){
                        this.responseData = "Creating Event Failed!"
                        return this.showModal = true
                    }
                    return
                })
            },
            disabledBeforeTodayAndAfterAWeek(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
            },
            notBeforeEightOClock(date) {
                // if(this.date < this.dateToday)
                return date.getHours() < 8 || date.getHours() > 19;
                // return date.getHours() < this.dateToday.getHours || date.getHours() > 19;
            },
            toDashboard(success) {
                if(success)
                    setTimeout(() => this.$router.push({name: "Dashboard"}), 500)

                this.showModal = false
            },
            filterUsers(){
                console.log(this.usersArr)
                // this.filteredUsers = this.usersArr.filter(selectedUser => {
                //     return selectedUser.name.toLowerCase().startsWith(this.selectedUser.toLowerCase())
                // })
            },
        },
        beforeMount() {
            this.fetchUsers();
        },
    }
</script>