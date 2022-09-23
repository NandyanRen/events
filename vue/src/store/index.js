import Vue from 'vue'
import Vuex from 'vuex'
import axiosClient from "../axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    users: {},
    currentUser: {},
    events: {},
    currentUserEvent:{},
},
mutations:{
    setUsersData: (state, data) => {
        state.users = data;
    },
    setCurrentUser: (state, data) => {
        state.currentUser = data;
      },
    setEventsData: (state, data) => {
        state.events = data;
    },
    setCurrentEvent: (state, data) => {
        state.event = data;
    },
},
actions:{
    getUsers({commit}){
      return axiosClient.get('/users').then((res) => {
          commit("setUsersData", res.data);
          return res;
      });
    },
    getUserByName({ commit }, name) {
      return axiosClient
        .post(`users/find`, name)
        .then((res) => {
          commit("setCurrentUser", res.data);
          return res.data;
        });
    },
    saveUser({ commit }, user){
      return axiosClient.post("/users", user);
    },
    getEvents({ commit }) {
        return axiosClient.get(`events`).then((res) => {
            commit("setEventsData", res.data.events);
            return res;
          });
    },
    getEventId({ commit }, id) {
      return axiosClient
        .get(`events/${id}`)
        .then((res) => {
          commit("setCurrentEvent", res.data);
          return res;
        });
    },
    saveEvent({ commit }, event){
      return axiosClient.post("/events", event);
    },
    updateEvent({ commit }, event){
      console.log(event.id)
      return axiosClient.post(`events/${event.id}`, event);
    },
    deleteEvent({ commit }, id){
      return axiosClient.delete(`events/${id}`);
    },
},
getters:{
  allUsers(state) {
    return state.users;
  },
  allEvents(state) {
    return state.events;
  },
  getUser(state){
    return state.currentUser
  },
  getEvent(state){
    return state.currentEvent
  },
},
modules:{},
})
