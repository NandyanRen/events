<template>
    <div class='flex h-screen justify-center items-center'>
        <div class='w-1/2 m-auto border border-1 p-8'>
            <!-- Title and Nav -->
            <div class="flex lg:flex-row flex-col justify-between mb-10">
                <h1 class='font-medium text-2xl'>All Events</h1>
                <div class="lg:space-x-3 lg:space-y-0 space-y-2 flex lg:flex-row flex-col">
                    <router-link to="/user" class="lg:text-xl text-sm bg-gray-500 text-white rounded-md px-3 text-center">Add User</router-link>
                    <router-link :to="{ name: 'CreateEvent', params: { id: 0 } }" class="lg:text-xl text-sm bg-gray-500 text-white rounded-md px-3 text-center">Add Event</router-link>
                </div>
            </div>
            <!-- List of Events -->
            <div>
                <article v-for="event in events" v-bind:key="event.id">
                    <div class="font-medium text-xl my-5 ">
                        <router-link :to="{ name: 'CreateEvent', params: { id: event.id } }">{{ event.name }}</router-link>
                    </div>
                    <div>{{ event.start_date }}</div>
                    <div>{{ event.end_date }}</div>
                </article>
            </div>

        </div>
    </div>

</template>

<script>
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
        
    },
    beforeMount() {
        this.fetchEvents();
    },
}
</script>