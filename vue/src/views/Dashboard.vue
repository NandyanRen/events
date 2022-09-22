<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 m-auto border border-1 p-8'>
            <div class="flex justify-between">
                <h1 class='font-medium text-2xl'>All Events</h1>
                <router-link to="/event" class="text-xl bg-gray-500 text-white rounded-md px-3 text-center">Add Event</router-link>
            </div>
            <div>
                <article v-for="event in events" v-bind:key="event.id">
                    <div class="font-medium text-xl my-8 ">
                        <router-link :to="{ name: 'UserEvent', params: { id: event.id } }">{{ event.name }}</router-link>
                    </div>
                    <div v-html="event.name" class="truncate">{{ event.name }}</div>

                    <div @click="deleteEvent(event.id)">Delete</div>
                </article>
            </div>
        </div>
    </div>

</template>

<script>
import VModal from 'vue-js-modal'
export default {
    computed: {
        events(){
            return this.$store.getters.allEvents;
        },
    },
    methods:{
        fetchEvents(){
            this.$store.dispatch("getEvents");
        },
        deleteEvent(id){
            this.$store.dispatch("deleteEvent", id);
        },
    },
    beforeMount() {
        this.fetchEvents();
    },
}
</script>