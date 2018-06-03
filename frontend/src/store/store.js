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
    stockmonthlylabels: [],
    stockweekly: {},
    stockweeklyvalues: {},
    stockweeklylabels: [],
    stockdaily: {},
    stockdailyvalues: {},
    stockdailylabels: [],
    newsymbols: null,
    stockcolors: {},
    symbols: [],
    stockpricefilter: constants.marketOpen,
    stockperiodfilter: constants.monthly,
  },

  getters: {
    getstockperiodfilter(state) {
      return state.stockperiodfilter || constants.monthly;
    },
    getstockpricefilter(state) {
      return state.stockpricefilter || constants.marketOpen;
    },
    getnewsymbols(state) {
      return state.newsymbols;
    },
    getApiKey(state) {
      return state.apikey;
    },
    getStockMonthlyLabels(state) {
      return state.stockmonthlylabels;
    },

    getStockMonthlyValues(state) {
      return state.stockmonthlyvalues;
    },
    getStockMonthly(state) {
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
    setStockMonthlyLabel: function(state, labels) {
      if (state.stockmonthlylabels && state.stockmonthlylabels.length < labels.length) {
        state.stockmonthlylabels = labels;
      }
    },
    setStockMonthlyValues: function(state, params) {
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
    setStockMonthly: function(state, params) {
      let newStockMonthly = Object.assign({}, state.stockmonthly);
      newStockMonthly[params.symbol] = params.stockmonthly;
      state.stockmonthly = newStockMonthly;
    },


    setStockWeeklyLabel: function(state, labels) {
      if (state.stockweeklylabels && state.stockweeklylabels.length < labels.length) {
        state.stockweeklylabels = labels;
      }
    },
    setStockWeeklyValues: function(state, params) {
      let newsymbols = params.symbol;
      let newvalues = params.values;
      let newStockWeeklyValues = Object.assign({}, state.stockweeklyvalues);
      newStockWeeklyValues[newsymbols] = newvalues;
      state.stockweeklyvalues = newStockWeeklyValues;

      let stockcolors = {};
      Object.keys(state.stockweeklyvalues).forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;
    },
    setStockWeekly: function(state, params) {
      let newStockWeekly = Object.assign({}, state.stockweekly);
      newStockWeekly[params.symbol] = params.stockweekly;
      state.stockweekly = newStockWeekly;
    },


    setStockDailyLabel: function(state, labels) {
      if (state.stockdailylabels && state.stockdailylabels.length < labels.length) {
        state.stockdailylabels = labels;
      }
    },
    setStockDailyValues: function(state, params) {
      let newsymbols = params.symbol;
      let newvalues = params.values;
      let newStockDailyValues = Object.assign({}, state.stockdailyvalues);
      newStockDailyValues[newsymbols] = newvalues;
      state.stockdailyvalues = newStockDailyValues;

      let stockcolors = {};
      Object.keys(state.stockdailyvalues).forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;
    },
    setStockDaily: function(state, params) {
      let newStockDaily = Object.assign({}, state.stockdaily);
      newStockDaily[params.symbol] = params.stockdaily;
      state.stockdaily = newStockDaily;
    },


    setPeriodFilter: function(state, activefilter) {
      state.stockperiodfilter = activefilter;
    },
    setPriceFilter: function(state, activefilter) {
      state.stockpricefilter = activefilter;
    },
    addSymbol: function(state, newsymbol) {
      if (!state.symbols) {
        state.symbol = [];
      }
      state.symbols.push(newsymbol);
    }
  },
  actions: {
    setStockMonthlyLabel: function({
      commit
    }, labels) {
      commit('setStockMonthlyLabel', labels);
    },
    setStockMonthlyValues: function({
        commit
      },
      params
    ) {
      commit('setStockMonthlyValues', params);
    },
    setStockMonthly: function({
      commit
    }, params) {
      commit('setStockMonthly', params);
    },

    setStockWeeklyLabel: function({
      commit
    }, labels) {
      commit('setStockWeeklyLabel', labels);
    },
    setStockWeeklyValues: function({
        commit
      },
      params
    ) {
      commit('setStockWeeklyValues', params);
    },
    setStockWeekly: function({
      commit
    }, params) {
      commit('setStockWeekly', params);
    },

    setStockDailyLabel: function({
      commit
    }, labels) {
      commit('setStockDailyLabel', labels);
    },
    setStockDailyValues: function({
        commit
      },
      params
    ) {
      commit('setStockDailyValues', params);
    },
    setStockDaily: function({
      commit
    }, params) {
      commit('setStockDaily', params);
    },


    setPeriodFilter: function({
      commit
    }, activefilter) {
      commit('setPeriodFilter', activefilter);
    },
    setPriceFilter: function({
      commit
    }, activefilter) {
      commit('setPriceFilter', activefilter);
    },
    addSymbol: function({
      commit
    }, newsymbol) {
      commit('addSymbol', newsymbol);
    }
  },
};

export default new Vuex.Store(options);
export {
  options
};
