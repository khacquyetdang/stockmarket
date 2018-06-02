import Vue from 'vue';
import Vuex from 'vuex';
import * as constants from '../constants';
import randomColor from 'randomcolor';
import {
  version
} from '../../package.json';
Vue.use(Vuex);

let colorPanel = ['red', 'pink', 'purple', '#673AB7', '#3F51B5', '#2196F3', '#4CAF50', '#CDDC39', '#FFC107', '#795548'];
const options = {
  strict: true,
  state: {
    version: '',
    apikey: process.env.apikey,
    stockmonthly: {},
    stockmonthlyvalues: {},
    stockmonthlabels: [],
    newsymbols: null,
    stockcolors: {},
    stocktimefilter: 'open',
    stockdaily: new Map(),
    stockweekly: new Map()
  },

  getters: {
    getstocktimefilter(state) {
      return state.stocktimefilter || '1. open';
    },
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
    },
    getStockcolors(state) {
      return state.stockcolors;
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

      let stockcolors = {};
      Object.keys(state.stockmonthlyvalues).forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;
    },
    setStockMonth: function(state, params) {
      let newStockMonthly = Object.assign({}, state.stockmonthly);
      newStockMonthly[params.symbol] = params.stockmonth;
      state.stockmonthly = newStockMonthly;
    },
    setStocktimeFilter: function(state, activefilter) {
      state.stocktimefilter = activefilter;
    }
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
    setStocktimeFilter: function({
      commit
    }, activefilter) {
      commit('setStocktimeFilter', activefilter);
    }
  },
};

export default new Vuex.Store(options);
export {
  options
};
