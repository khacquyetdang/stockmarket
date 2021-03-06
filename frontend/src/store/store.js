import Vue from 'vue';
import Vuex from 'vuex';
import * as constants from '../constants';
import randomColor from 'randomcolor';
Vue.use(Vuex);

let colorPanel = ['#673AB7', '#795548', '#3F51B5', '#2196F3', '#FFC107', '#4CAF50', '#CDDC39'];
const options = {
  strict: true,
  state: {
    version: '',
    apikey: process.env.apikey,
    fetchingAllCompanyData: false,
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
    getFetchingAllCompanyData(state) {
      return state.fetchingAllCompanyData;
    },
    getSymbols(state) {
      return state.symbols;
    },
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
    },
    getActiveDatasets(state) {
      let stockvalues = state.stockmonthlyvalues;
      switch (state.stockperiodfilter) {
        case constants.daily:
          {
            stockvalues = state.stockdailyvalues;
            break;
          }
        case constants.weekly:
          {
            stockvalues = state.stockweeklyvalues;
            break;
          }
      }
      let datasets = Object.keys(stockvalues).map((value, index) => {
        let colorDataset = state.stockcolors[value];
        return {
          label: value,
          data: stockvalues[value].map(function(element) {
            return element[state.stockpricefilter];
          }),
          borderColor: colorDataset,
          tooltipcolor: colorDataset,
          type: 'line',
          pointRadius: 2,
          fill: true,
          lineTension: 0,
          borderWidth: 2,
        };
      });
      return datasets;
    },
    getActiveLabels(state) {
      let stocklabels = state.stockmonthlylabels;
      switch (state.stockperiodfilter) {
        case constants.daily:
          {
            stocklabels = state.stockdailylabels;
            break;
          }
        case constants.weekly:
          {
            stocklabels = state.stockweeklylabels;
            break;
          }
      }
      return stocklabels;
    }
  },
  mutations: {
    setFetchingAllCompanyData(state, isFetching) {
      state.fetchingAllCompanyData = isFetching;
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
      if (state.symbols.indexOf(newsymbol) === -1) {
        state.symbols.push(newsymbol);
      }
      let stockcolors = {};

      state.symbols.forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;
    },
    removeSymbol: function(state, symbol) {
      if (!state.symbols) {
        state.symbols = [];
      }
      let indexSymbol = state.symbols.indexOf(symbol);
      if (indexSymbol !== -1) {
        state.symbols.splice(indexSymbol, 1);
      }
      let stockcolors = {};

      state.symbols.forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;

      let newStockDaily = Object.assign({}, state.stockdaily);
      delete state.stockdaily[symbol];
      state.stockdaily = newStockDaily;

      let newStockDailyValues = Object.assign({}, state.stockdailyvalues);
      delete newStockDailyValues[symbol];
      state.stockdailyvalues = newStockDailyValues;


      let newStockWeekly = Object.assign({}, state.stockweekly);
      delete state.stockweekly[symbol];
      state.stockweekly = newStockWeekly;

      let newStockWeeklyValues = Object.assign({}, state.stockweeklyvalues);
      delete newStockWeeklyValues[symbol];
      state.stockweeklyvalues = newStockWeeklyValues;


      let newStockMonthly = Object.assign({}, state.stockmonthly);
      delete newStockMonthly[symbol];
      state.stockmonthly = newStockMonthly;

      let newStockMonthValues = Object.assign({}, state.stockmonthlyvalues);
      delete newStockMonthValues[symbol];
      state.stockmonthlyvalues = newStockMonthValues;


      delete state.stockmonthlyvalues[symbol];
      delete state.stockdailyvalues[symbol];

      delete state.stockmonthly[symbol];
      delete state.stockdaily[symbol];

    },
    setSymbols: function(state, symbols) {
      state.symbols = symbols;
      let stockcolors = {};

      state.symbols.forEach((value, index) => {
        if (index < colorPanel.length) {
          stockcolors[value] = colorPanel[index];
        } else {
          stockcolors[value] = randomColor();
        }
      });
      state.stockcolors = stockcolors;
    }
  },
  actions: {
    setFetchingAllCompanyData: function({
      commit
    }, isFetching) {
      commit('setFetchingAllCompanyData', isFetching);
    },
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
    },
    removeSymbol: function({
      commit
    }, symbol) {
      commit('removeSymbol', symbol);
    },

    setSymbols: function({
      commit
    }, symbols) {
      commit('setSymbols', symbols);
    }
  },
};

export default new Vuex.Store(options);
export {
  options
};
