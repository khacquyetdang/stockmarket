import axios from 'axios';
import store from '@/store/store';
import {
  handlerCompanyData
} from '../utils';

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
      const responseMonthly = await this.getStockValueMonthly(symbol);
      console.log("symbols monthly", responseMonthly);
      let monthlykey = 'Monthly Time Series';

      const responseWeekly = await this.getStockValueWeekly(symbol);
      const weeklykey = "Weekly Time Series";


      const responseDaily = await this.getStockValueDaily(symbol);
      const dailykey = "Time Series (Daily)";

      let company = {
        symbol: symbol,
        stockmonthly: responseMonthly.data[monthlykey],
        stockweekly: responseWeekly.data[weeklykey],
        stockdaily: responseDaily.data[dailykey]
      };
      handlerCompanyData(company);
      store.dispatch('addSymbol', symbol);

      return {
        symbol: symbol,
        stockdaily: responseDaily.data[dailykey],
        stockmonthly: responseMonthly.data[monthlykey],
        stockweekly: responseWeekly.data[weeklykey]
      };
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
