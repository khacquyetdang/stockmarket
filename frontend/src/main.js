// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import store from '@/store/store';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import * as constants from './constants';

Vue.use(VeeValidate);
Vue.use(Vuetify);

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  localStorage.setItem(constants.stockMarketStoreKey, JSON.stringify(state));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  components: {
    App
  },
  template: '<App/>'
});
