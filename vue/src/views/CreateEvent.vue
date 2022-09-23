<template>
    <div class='flex h-screen justify-center items-center'>
        <div class=' h-full m-auto border border-1 p-8'>
            <div class="flex justify-between">
                <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center mb-5">Back</router-link>
                <button @click="deleteEvent" class="pb-1 bg-red-500 text-white rounded-md px-3 text-center mb-5">Delete</button>
            </div>

            <div class="absolute top-0 left-0 right-0 bottom-0 z-40 bg-opacity-80" v-if="showModal"></div>
                <div class="absolute top-14 left-1/3 z-50 w-1/3 bg-gray-200 border-1 p-6" v-if="showModal">
                    <h1>{{  this.responseData }}</h1>
                    <div class="flex justify-end px-2">
                        <button class="rounded-md py-1 px-4 content-end border border-transparent text-white bg-red-500 mt-5" @click="toDashboard(success)">Close</button>
                    </div>
                </div>

                <div class="flex flex-col space-y-2 ">
                    <input type="type" name="title" id="title" v-model="title" required="" maxlength="25" placeholder="Title"
                        class="border border-1 px-2 lg:w-full w-2/3"/>
                    <div class="space-y-2">
                        <date-picker class="mr-2" v-model="date" valueType="format" :default-value="new Date()" :disabled-date="disabledBeforeTodayAndAfterAWeek"></date-picker>
                        <date-picker class="mr-2" v-model="start_time" type="time" format="hh:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                        <date-picker v-model="end_time" type="time" format="hh:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                    </div>

                    <input type="type" name="userName" id="userName" v-model="userName" required="" maxlength="25" placeholder="Name"
                    class="border border-1 px-2 mb-2 lg:w-full w-2/3"/>
                    <button @click="searchUser" type="button"
                    class="mt-5 w-1/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                            Search
                    </button>

                    <h1 class="font-bold">Guests</h1>
                    <ul class="space-y-1">
                        <li class="bg-green-100 w-1/2 rounded p-1" v-for="(guest, index) in guests">
                            <button class="cursor-pointer p-1" @click="removeTask(index)">x</button>
                            {{ guest.name }}
                        </li>
                    </ul>

                </div>
                <div class="flex mb-8 justify-end px-2">
                    <button type="submit" @click="saveEvent" class="mt-5 w-1/4 content-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700">
                        Submit
                    </button>
                </div>
            <div>
                
            </div>
        </div>
    </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
        components: { DatePicker },
        data(){
            return {
                title:null,
                // dateToday: new Date(),
                date: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                showModal: false,
                responseData: null,
                success: false,
                userName: '',
                userResult: '',
                guests: [],
            }
        },
        methods:{
            fetchEvent(){
                if(this.$route.params.id != 0){
                    this.$store.dispatch("getEventId", this.$route.params.id).then(response => {
                        console.log(response.data.event)
                        let newDate = new Date(response.data.event.start_date)
                        let newDateMonth = newDate.getMonth() + 1
                        let newDateDay = newDate.getDate()
                        if(newDateMonth.toString().length == 1)
                            newDateMonth = "0" + newDateMonth.toString()
                        if(newDateDay.toString().length == 1)
                            newDateDay = "0" + newDateDay.toString()

                        this.title = response.data.event.name
                        this.date = newDate.getFullYear().toString() + "-" + newDateMonth + "-" + newDateDay
                        this.start_date = newDate.getHours()
                        this.end_date = newDate.setHours(9,0,0,0)
                    })
                }
            },
            saveEvent(){
                let model = {
                    id: this.$route.params.id,
                    name: this.title,
                    start_date: this.date + " " + this.start_time.getHours() + ":" + this.start_time.getMinutes() + ":" + "00",
                    end_date: this.date + " " + this.end_time.getHours() + ":" + this.end_time.getMinutes() + ":" + "00",
                }
                if(this.validateForm()){
                    if(this.$route.params.id == 0){
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
                    } else {
                        this.$store.dispatch("updateEvent", model)
                        .then(response => {
                            if(response.status === 200) {
                                this.responseData = "Updating Event Successful!"
                                this.success = true
                                return this.showModal = true
                            }
                        })
                        .catch((response) => {
                            if(response.status != 201){
                                this.responseData = "Updating Event Failed!"
                                return this.showModal = true
                            }
                            return
                        })
                    }
                }
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
            searchUser(){
                let model = {
                    name: this.userName
                }
                this.$store.dispatch("getUserByName", model)
                .then(response => {
                    if(response.user){
                        this.guests.push(response.user)
                        this.userName = ""
                    } else {
                        this.responseData = "User Not Found!"
                        return this.showModal = true
                    }
                })
            },
            removeTask(index){
                this.guests.splice(index, 1)
            },
            validateForm(){
                if(this.title && this.guests.length != 0 )
                    return true
                return false
            },
            deleteEvent(){
                if(confirm(`Are you sure you want to delete this Event?`)){
                    this.$store.dispatch("deleteEvent", this.$route.params.id)
                    .then(this.$router.push({name: "Dashboard"}));
                }
            },
        },
        beforeMount() {
            this.fetchEvent();
        },
    }
</script>