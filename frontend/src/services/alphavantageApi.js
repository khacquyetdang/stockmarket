import axios from 'axios';
import store from '@/store/store';

function alphavantageApi() {
  return axios.create({
    baseURL: process.env.baseURL,
    headers: {
      Authorization: `Bearer ${store.getters.getToken}`,
    },
  });
};

export default {
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
