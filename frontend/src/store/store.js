import Vue from 'vue';
import Vuex from 'vuex';
import * as constants from '../constants';
import {
  version
} from '../../package.json';
Vue.use(Vuex);

const options = {
  strict: true,
  state: {
    version: '',
    apikey: process.env.apikey,
    stockmonthly: {},
    stockmonthlyvalues: {},
    stockmonthlabels: [],
    newsymbols: null,
    stockdaily: new Map(),
    stockweekly: new Map()
  },

  getters: {
    getnewsymbols(state) {
      return state.newsymbols;
    },
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
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem(constants.stockMarketStoreKey)) {
        let store = JSON.parse(localStorage.getItem(constants.stockMarketStoreKey));

        // Replace the state object with the stored item
        if (store.version === version) {
          this.replaceState(
            Object.assign(state, store)
          );
        } else {
          state.version = version;
        }
      }
    },
    setStockMonthLabel: function(state, labels) {
      if (state.stockmonthlabels && state.stockmonthlabels.length < labels.length) {
        state.stockmonthlabels = labels;
      }
    },
    setStockMonthValues: function(state, params) {
      let newsymbols = params.symbol;
      let newvalues = params.values;
      let newStockMonthValues = Object.assign({}, state.stockmonthlyvalues);
      newStockMonthValues[newsymbols] = newvalues;
      state.stockmonthlyvalues = newStockMonthValues;
    },
    setStockMonth: function(state, params) {
      let newStockMonthly = Object.assign({}, state.stockmonthly);
      newStockMonthly[params.symbol] = params.stockmonth;
      state.stockmonthly = newStockMonthly;
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
