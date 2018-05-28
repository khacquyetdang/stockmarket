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
    this.fetchStockMonthly();
  },
  methods: {
    async fetchStockMonthly() {
      try {
        const response = await Api.getStockValueMonthly('MSFT');
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
