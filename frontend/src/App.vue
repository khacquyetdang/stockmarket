<template>
  <div id="app">
    <v-app light>
      <v-content>
        <v-container fluid="fluid">
          <router-view/>
        </v-container>
      </v-content>

    </v-app>
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
    fetchStockMonthly(symbol) {
      Api.fetchStockMonthly(symbol);
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
