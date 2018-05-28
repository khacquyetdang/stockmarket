<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Api from './services/alphavantageApi';
export default {
  name: 'App',
  mounted() {
    console.log('app mounted');
    this.fetchStockMonthly('MSFT');
  },
  methods: {
    async fetchStockMonthly(symbol) {
      try {
        const response = await Api.getStockValueMonthly(symbol);
        let labels = Object.keys(response.data['Monthly Time Series']);
        let values = Object.values(response.data['Monthly Time Series']);
        this.$store.dispatch('setStockMonthLabel', labels);
        this.$store.dispatch('setStockMonthValues', {
          symbol,
          values,
        });
        this.$store.dispatch('setStockMonth', {
          symbol,
          stockmonth: response.data['Monthly Time Series'],
        });
        console.log('store', this.$store);
        this.$forceUpdate();
        console.log('response', response);
      } catch (exception) {
        console.error('error:', exception);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
