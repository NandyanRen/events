import Vue from 'vue'
import Vuex from 'vuex'
import axiosClient from "../axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    users: {},
    currentUser: {},
    events: {},
    currentEvent:{},
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
            console.log(res.data);
            commit("setUsersData", res.data);
            return res;
        });
    },
    getUserId({ commit }, id) {
        return axiosClient
          .get(`user/${id}`)
          .then((res) => {
            commit("setCurrentUser", res.data);
            return res;
          });
    },
    saveUser({ commit }, user){
      return axiosClient.post("/user", user);
    },
    getEvents({ commit }) {
        return axiosClient.get(`events`).then((res) => {
            commit("setEventsData", res.data);
            return res;
          });
    },
    getEventId({ commit }, id) {
      return axiosClient
        .get(`event/${id}`)
        .then((res) => {
          commit("setCurrentEvent", res.data);
          return res;
        });
    },
    saveEvent({ commit }, event){
      return axiosClient.post("/event", event);
    },
    updateEvent({ commit }, id){
      return axiosClient.update(`event/${id}`);
    },
    deleteEvent({ commit }, id){
      return axiosClient.delete(`event/${id}`);
    },
},
getters:{
  allUsers(state) {
    return state.users;
  },
  allEvents(state) {
    console.log("events: " + state.events)
    return state.events;
  },
  getEvent(state){
    return state.event
  },
},
modules:{},
})