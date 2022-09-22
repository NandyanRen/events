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
            commit("setUsersData", res.data);
            return res;
        });
    },
    getUserId({ commit }, id) {
        return axiosClient
          .get(`users/${id}`)
          .then((res) => {
            commit("setCurrentUser", res.data);
            return res;
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
        .get(`event/${id}`)
        .then((res) => {
          commit("setCurrentEvent", res.data);
          return res;
        });
    },
    saveEvent({ commit }, event){
      return axiosClient.post("/events", event);
      // return new Promise((resolve, reject) => {
      //   axiosClient.post("/events", event)
      //     .then((response) => {
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
    },
    updateEvent({ commit }, id){
      return axiosClient.post(`events/${id}`);
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
  getEvent(state){
    return state.event
  },
},
modules:{},
})
