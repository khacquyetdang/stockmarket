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
      console.log("symbols monthly", response);
      let monthlykeys = 'Monthly Time Series';
      let labels = Object.keys(response.data[monthlykeys]);
      let values = Object.values(response.data[monthlykeys]);



      const responseWeekly = await this.getStockValueWeekly(symbol);
      const weeklykeys = "Weekly Time Series";
      let labelsWeekly = Object.keys(responseWeekly.data[weeklykeys]);
      let valuesWeekly = Object.values(responseWeekly.data[weeklykeys]);


      const responseDaily = await this.getStockValueDaily(symbol);
      const dailykey = "Time Series (Daily)";
      let labelsDaily = Object.keys(responseDaily.data[dailykey]);
      let valuesDaily = Object.values(responseDaily.data[dailykey]);

      store.dispatch('setStockMonthlyLabel', labels);
      store.dispatch('setStockMonthlyValues', {
        symbol,
        values,
      });
      store.dispatch('setStockMonthly', {
        symbol,
        stockmonthly: response.data[monthlykeys],
      });

      store.dispatch('setStockWeeklyLabel', labelsWeekly);
      store.dispatch('setStockWeeklyValues', {
        symbol,
        values: valuesWeekly,
      });
      store.dispatch('setStockWeekly', {
        symbol,
        stockweekly: responseWeekly.data[weeklykeys],
      });


      store.dispatch('setStockDailyLabel', labelsDaily);
      store.dispatch('setStockDailyValues', {
        symbol,
        values: valuesDaily,
      });
      store.dispatch('setStockDaily', {
        symbol,
        stockdaily: responseDaily.data[dailykey],
      });

      store.dispatch('addSymbol', symbol);

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
