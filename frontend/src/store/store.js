import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const options = {
  strict: true,
  state: {
    apikey: process.env.apikey,
    stockmonthly: {},
    stockmonthlyvalues: {},
    stockmonthlabels: [],

    stockdaily: new Map(),
    stockweekly: new Map()
  },

  getters: {
    getApiKey(state) {
      return state.apikey;
    },
    getStockMonthLabels(state) {
      return state.stockmonthlabels;
    },

    getStockMonthValues(state) {
      return state.stockmonthlyvalues;
    },
    getStockMonth(state) {
      return state.stockmonthly;
    }

  },
  mutations: {
    setStockMonthLabel: function(state, labels) {
      state.stockmonthlabels = labels;
    },
    setStockMonthValues: function(state, params) {
      state.stockmonthlyvalues[params.symbol] = params.values;
    },
    setStockMonth: function(state, params) {
      state.stockmonthly[params.symbol] = params.stockmonth;
    },
  },
  actions: {
    setStockMonthLabel: function({
      commit
    }, labels) {
      commit('setStockMonthLabel', labels);
    },
    setStockMonthValues: function({
        commit
      },
      params
    ) {
      commit('setStockMonthValues', params);
    },
    setStockMonth: function({
      commit
    }, params) {
      commit('setStockMonth', params);
    },
  },
};

export default new Vuex.Store(options);
export {
  options
};
