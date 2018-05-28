import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const options = {
  strict: true,
  state: {
    apikey: process.env.apikey,
    stockmonthly: new Map(),
    stockdaily: new Map(),
    stockweekly: new Map()
  },

  getters: {
    getPolls(state) {
      return state.polls;
    },
    getMyPolls(state) {
      return state.mypolls;
    },
    getApiKey(state) {
      return state.apikey;
    },
    getIdUser(state) {
      return state.user.id_user;
    },

  },
  mutations: {
    setUser: function(state, user) {
      if (user) {
        state.user.token = user.access_token;
        state.user.id_user = user.id_user;
        state.isUserLoggedIn = true;
      } else {
        state.user.token = null;
        state.user.id_user = null;
        state.isUserLoggedIn = false;
      }
    },
    setPolls: function(state, polls) {
      state.polls = polls;
      polls.forEach(poll => {
        state.pollsbyId.set(poll._id, poll);
      });
    },
    setMyPolls: function(state, polls) {
      state.mypolls = polls;
    },
    toggleDrawer: function(state, drawer) {
      state.drawer = drawer;
    },
  },
  actions: {
    setMyPolls: function({
      commit
    }, polls) {
      commit('setMyPolls', polls);
    },
    setPolls: function({
      commit
    }, polls) {
      commit('setPolls', polls);
    },
    setUser: function({
      commit
    }, user) {
      commit('setUser', user);
    },
    toggleDrawer: function({
      commit
    }, drawer) {
      commit('toggleDrawer', drawer);
    },
  },
};

export default new Vuex.Store(options);
export {
  options
};
