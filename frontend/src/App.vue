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
import CompanyApi from './services/companyApi';
import Api from './services/alphavantageApi';
export default {
  name: 'App',
  computed: {
    symbols() {
      return this.$store.getters.getSymbols;
    },
  },
  mounted() {
    console.log('app mounted');
    CompanyApi.fetchCompany();
  },
  watch: {
    symbols(vals) {
      console.log('symbols changed', vals);
      vals.forEach(symbol => {
        if (!this.$store.getters.getStockMonthly[symbol]) {
          Api.fetchStockMonthly(symbol);
        }
      });
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
