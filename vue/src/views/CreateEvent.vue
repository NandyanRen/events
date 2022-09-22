<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 h-full m-auto border border-1 p-8'>
        <div class="flex justify-between">
            <router-link :to="{ name: 'Dashboard' }" class="pb-1 bg-gray-500 text-white rounded-md px-3 text-center">Back</router-link>
        </div>


            <form @submit.prevent="saveEvent">
                    <div class="flex flex-col">
                        <input type="type" name="name" id="name" v-model="name" required="" maxlength="25" placeholder="Title"
                            class="border border-1 px-2 mb-2"/>
                            <div>
                                <date-picker v-model="date" valueType="format" :default-value="new Date()" :disabled-date="disabledBeforeTodayAndAfterAWeek"></date-picker>
                                <date-picker v-model="start_time" type="time" format="HH:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                                <date-picker v-model="end_time" type="time" format="HH:mm a" :default-value="new Date().getHours" :disabled-time="notBeforeEightOClock" :minute-step="5"></date-picker>
                            </div>
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

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
        components: { DatePicker },
        data(){
            return {
                name:null,
                dateToday: new Date(),
                date: new Date(),
                start_time: null,
                end_time: null,
            }
        },
        methods:{
            saveEvent(){
                let model = {
                    name: this.name,
                    start_date: this.date + " " + this.start_time.getHours() + ":" + this.start_time.getMinutes() + ":" + "00",
                    end_date: this.date + " " + this.end_time.getHours() + ":" + this.end_time.getMinutes() + ":" + "00",
                }
                console.log(model)
                this.$store.dispatch("saveEvent", model)
                .then(setTimeout(() => this.$router.push({name: "Dashboard"}), 500));
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
        },
    }
</script>