import axios from 'axios';
import store from '@/store/store';

function alphavantageApi() {
  return axios.create({
    baseURL: "https://www.alphavantage.co/query",
    params: {
      apikey: `${store.getters.getApiKey}`,
    },
  });
};

export default {
  async fetchStockMonthly(symbol) {
    try {
      const response = await this.getStockValueMonthly(symbol);
      let labels = Object.keys(response.data['Monthly Time Series']);
      let values = Object.values(response.data['Monthly Time Series']);
      store.dispatch('setStockMonthLabel', labels);
      store.dispatch('setStockMonthValues', {
        symbol,
        values,
      });
      store.dispatch('setStockMonth', {
        symbol,
        stockmonth: response.data['Monthly Time Series'],
      });
      return true;
    } catch (error) {
      console.error('error:', error);
    }
    return false;
  },
  getStockValueMonthly: function(stocksymbol) {
    return alphavantageApi().get('', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol: stocksymbol
      }
    });
  },
  getStockValueWeekly: function(stocksymbol) {
    return alphavantageApi().get('', {
      params: {
        function: 'TIME_SERIES_WEEKLY',
        symbol: stocksymbol
      }
    });
  },
  getStockValueDaily: function(stocksymbol) {
    return alphavantageApi().get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: stocksymbol
      }
    });
  },
};
